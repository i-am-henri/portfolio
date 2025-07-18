import { Glob } from 'bun';
import matter from 'gray-matter';
import { z } from 'zod/v4';
import { renderMDX } from './mdx';

export const blogFileSchema = z.object({
  title: z.string(),
  date: z.string(),
  content: z.string(),
});

export type BlogFile = z.infer<typeof blogFileSchema> & {
  Component: React.ComponentType;
  slug: string;
};

export async function loadBlog() {
  const glob = new Glob('*.{md,mdx}');
  const scannedFiles = await Array.fromAsync(glob.scan({ cwd: './src/posts' }));

  const files = new Map<
    string,
    Omit<BlogFile, 'slug'> & { Component: React.ComponentType }
  >();

  for await (const file of scannedFiles) {
    const content = await globalThis.Bun.file(
      `${process.cwd()}/src/posts/${file}`
    ).text();

    const parsed = matter(content);

    const { Component } = await renderMDX(parsed.content, parsed.data);

    const frontmatterParse = blogFileSchema.safeParse({
      title: parsed.data.title,
      date: parsed.data.date,
      content: parsed.content,
    });

    if (!frontmatterParse.success) {
      console.error(
        `Error parsing frontmatter for file ${file}:`,
        z.prettifyError(frontmatterParse.error)
      );
      continue;
    }

    files.set(file.split('.')[0], {
      ...frontmatterParse.data,
      Component,
    });
  }

  return files;
}
