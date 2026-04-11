import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readTime: string;
}

export interface Post {
  meta: PostMeta;
  content: string; // raw markdown
}

const POSTS_DIR = path.join(process.cwd(), "src/content/blog/posts");

function slugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, "");
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
      const { data } = matter(raw);
      return {
        slug: (data.slug as string | undefined) ?? slugFromFilename(filename),
        title: data.title as string,
        date: data.date as string,
        excerpt: data.excerpt as string,
        category: data.category as string,
        readTime: data.readTime as string,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  if (!fs.existsSync(POSTS_DIR)) return null;

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  for (const filename of files) {
    const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
    const { data, content } = matter(raw);
    const postSlug = (data.slug as string | undefined) ?? slugFromFilename(filename);
    if (postSlug === slug) {
      return {
        meta: {
          slug: postSlug,
          title: data.title as string,
          date: data.date as string,
          excerpt: data.excerpt as string,
          category: data.category as string,
          readTime: data.readTime as string,
        },
        content,
      };
    }
  }
  return null;
}
