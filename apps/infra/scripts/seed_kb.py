#!/usr/bin/env python3
"""
Evidara Platform - Knowledge Base Seeder
Uploads initial documents to pgvector knowledge base

Usage:
    python seed_kb.py --doc path/to/document.pdf --type pi --product fibranix
"""
import os
import sys
import argparse
import boto3
from sqlalchemy import create_engine, text

DATABASE_URL = os.environ.get(
    "DATABASE_URL",
    "postgresql://evidara:password@localhost:5432/evidara"
)
BEDROCK_REGION = "us-east-1"
EMBEDDING_MODEL = "amazon.titan-embed-text-v1"
CHUNK_SIZE = 1000  # characters per chunk
CHUNK_OVERLAP = 200


def get_embedding(text: str) -> list[float]:
    """Get embedding from Titan Embeddings v1."""
    import json
    bedrock = boto3.client("bedrock-runtime", region_name=BEDROCK_REGION)
    response = bedrock.invoke_model(
        modelId=EMBEDDING_MODEL,
        body=json.dumps({"inputText": text}),
    )
    body = json.loads(response["body"].read())
    return body["embedding"]


def chunk_text(text: str) -> list[str]:
    """Split text into overlapping chunks."""
    chunks = []
    start = 0
    while start < len(text):
        end = start + CHUNK_SIZE
        chunk = text[start:end]
        chunks.append(chunk)
        start = end - CHUNK_OVERLAP
    return chunks


def extract_text_from_pdf(pdf_path: str) -> str:
    """Extract text from PDF using pdfplumber."""
    import pdfplumber
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
            text += "\n"
    return text


def seed_document(
    doc_path: str,
    doc_type: str,
    product_id: str | None = None
):
    """Seed a document into the knowledge base."""
    print(f"Processing: {doc_path}")

    # Extract text
    if doc_path.endswith(".pdf"):
        text = extract_text_from_pdf(doc_path)
    else:
        with open(doc_path, "r") as f:
            text = f.read()

    # Chunk text
    chunks = chunk_text(text)
    print(f"Created {len(chunks)} chunks")

    # Get embeddings and insert
    engine = create_engine(DATABASE_URL)
    source_doc = os.path.basename(doc_path)

    with engine.connect() as conn:
        for i, chunk in enumerate(chunks):
            print(f"  Embedding chunk {i + 1}/{len(chunks)}...")
            embedding = get_embedding(chunk)

            conn.execute(
                text("""
                    INSERT INTO knowledge_chunks
                    (source_doc, doc_type, product_id, chunk_index, content, embedding)
                    VALUES (:source_doc, :doc_type, :product_id, :chunk_index, :content, :embedding)
                """),
                {
                    "source_doc": source_doc,
                    "doc_type": doc_type,
                    "product_id": product_id,
                    "chunk_index": i,
                    "content": chunk,
                    "embedding": embedding,
                }
            )
        conn.commit()

    print(f"Inserted {len(chunks)} chunks for {source_doc}")


def main():
    parser = argparse.ArgumentParser(description="Seed knowledge base")
    parser.add_argument("--doc", required=True, help="Path to document")
    parser.add_argument(
        "--type",
        required=True,
        choices=["pi", "pil", "sahpra_guideline", "ich"],
        help="Document type"
    )
    parser.add_argument("--product", help="Product ID (optional)")
    args = parser.parse_args()

    if not os.path.exists(args.doc):
        print(f"ERROR: File not found: {args.doc}")
        sys.exit(1)

    seed_document(args.doc, args.type, args.product)
    print("Done!")


if __name__ == "__main__":
    main()
