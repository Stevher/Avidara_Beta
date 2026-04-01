# Evidara Worker - Celery with WeasyPrint for PDF generation
FROM python:3.12-slim

WORKDIR /app

# Install system dependencies for WeasyPrint
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libcairo2 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libgdk-pixbuf2.0-0 \
    libffi-dev \
    shared-mime-info \
    fonts-liberation \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create non-root user
RUN useradd -m -u 1000 evidara && chown -R evidara:evidara /app
USER evidara

# Run Celery worker
# concurrency=1 is intentional - one PDF renders at a time
CMD ["celery", "-A", "tasks", "worker", "--concurrency=1", "--loglevel=info"]
