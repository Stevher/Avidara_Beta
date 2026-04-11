#!/usr/bin/env node
/**
 * Avidara auto-blog generator
 * Picks the next topic from topics.json, calls the Anthropic API,
 * writes a markdown post, and updates the topic queue.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, "../..");
const TOPICS_FILE = join(ROOT, "apps/frontend/src/content/blog/topics.json");
const POSTS_DIR = join(ROOT, "apps/frontend/src/content/blog/posts");

// ── Read topics ────────────────────────────────────────────────────────────
const topics = JSON.parse(readFileSync(TOPICS_FILE, "utf8"));
const topicOverride = process.env.TOPIC_OVERRIDE;

let topic;
if (topicOverride) {
  topic = { title: topicOverride, category: "Compliance", notes: topicOverride };
} else {
  topic = topics.queue[0];
}

if (!topic) {
  console.log("No topics in queue. Add more to topics.json.");
  process.exit(0);
}

console.log(`Generating article: "${topic.title}"`);

// ── Call Anthropic API ─────────────────────────────────────────────────────
const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set");

const systemPrompt = `You are a senior regulatory affairs expert and content writer for Avidara, a South African regulatory compliance intelligence platform. You write authoritative, accurate, practical blog articles for pharmaceutical, medical device, consumer health, veterinary, and transport regulatory professionals.

Writing style:
- Authoritative but accessible — write for RA managers and QA professionals, not academics
- Practical first — always ground abstract rules in concrete examples and consequences
- No fluff — every sentence earns its place
- South Africa-specific where relevant, but note international alignment (ICH, ISO, IMDRF)
- Never use phrases like "In conclusion", "In today's fast-paced world", or "leverage"
- British English spelling (colour, recognised, labelling)

Format:
- Return ONLY the markdown content (no frontmatter, no code fences)
- Start directly with the introductory paragraph — no title heading
- Use ## for section headings, ### for sub-headings
- Use bullet lists sparingly — prefer prose
- Article length: 700–900 words
- End with a short paragraph mentioning how Avidara's Document Review or Dossier Review addresses the topic, with a markdown link [book a review](/#book)`;

const userPrompt = `Write a blog article on the following topic for Avidara's regulatory insights blog.

Topic: ${topic.title}
Category: ${topic.category}
Editorial notes: ${topic.notes}

Remember: return only the markdown body (no frontmatter, no title heading, no code fences). Start with the first paragraph directly.`;

const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "x-api-key": apiKey,
    "anthropic-version": "2023-06-01",
  },
  body: JSON.stringify({
    model: "claude-opus-4-6",
    max_tokens: 2000,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  }),
});

if (!response.ok) {
  const err = await response.text();
  throw new Error(`Anthropic API error ${response.status}: ${err}`);
}

const data = await response.json();
const articleBody = data.content?.[0]?.text ?? "";

// ── Build slug and frontmatter ─────────────────────────────────────────────
const today = new Date().toISOString().split("T")[0];
const slug = topic.title
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, "")
  .trim()
  .replace(/\s+/g, "-")
  .slice(0, 80);

// Estimate read time (avg 200 words/min)
const wordCount = articleBody.split(/\s+/).length;
const readMins = Math.max(3, Math.round(wordCount / 200));

const frontmatter = `---
title: "${topic.title.replace(/"/g, '\\"')}"
date: "${today}"
excerpt: "${topic.notes.split(".")[0].replace(/"/g, '\\"').slice(0, 160)}"
category: "${topic.category}"
readTime: "${readMins} min"
---`;

const fullContent = `${frontmatter}\n\n${articleBody.trim()}\n`;

// ── Write the file ─────────────────────────────────────────────────────────
if (!existsSync(POSTS_DIR)) mkdirSync(POSTS_DIR, { recursive: true });
const filename = `${slug}.md`;
writeFileSync(join(POSTS_DIR, filename), fullContent, "utf8");
console.log(`Written: src/content/blog/posts/${filename}`);

// ── Update topics.json ─────────────────────────────────────────────────────
if (!topicOverride) {
  topics.queue = topics.queue.slice(1);
  topics.published = [
    ...(topics.published ?? []),
    { title: topic.title, category: topic.category, slug, publishedDate: today },
  ];
  writeFileSync(TOPICS_FILE, JSON.stringify(topics, null, 2) + "\n", "utf8");
  console.log("topics.json updated — topic moved to published.");
}

// Write title to a temp file for the PR title
writeFileSync("/tmp/article-title.txt", topic.title, "utf8");
console.log("Done.");
