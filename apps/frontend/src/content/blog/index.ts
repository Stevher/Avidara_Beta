import * as post1 from "./what-sahpra-looks-for-in-an-artwork-review";

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
  Content: () => React.JSX.Element;
}

// Registry — add new posts here in reverse chronological order
const registry: Post[] = [post1 as Post];

export function getAllPosts(): PostMeta[] {
  return registry.map((p) => p.meta).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  return registry.find((p) => p.meta.slug === slug) ?? null;
}
