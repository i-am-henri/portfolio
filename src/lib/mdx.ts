import { readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import z from 'zod/v4';

// Regex for matching import statements - defined at top level for performance
const IMPORT_REGEX = /^import\s+.*?from\s+['"](.+?)['"];?/gm;
const RELATIVE_PATH_REGEX = /^\.\/*/;

/**
 * Extracts and resolves relative imports from MDX content
 * @param mdxContent - The MDX file content as a string
 * @returns Record of import paths to their resolved file contents
 */
async function extractImports(
  mdxContent: string
): Promise<Record<string, string>> {
  const imports: Record<string, string> = {};

  // Use Array.from with matchAll for better performance
  const matches = Array.from(mdxContent.matchAll(IMPORT_REGEX));

  await Promise.all(
    matches.map(async (match) => {
      const importPath = match[1];

      // Only handle relative imports
      if (!importPath.startsWith('.')) {
        return;
      }

      const resolvedPath = resolve(
        process.cwd(),
        'src/posts',
        importPath.replace(RELATIVE_PATH_REGEX, '')
      );

      try {
        const content = await Bun.file(resolvedPath).text();
        imports[importPath] = content;
      } catch {
        // File not found or unreadable, skip silently
      }
    })
  );

  return imports;
}

export const frontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),

  tags: z.array(z.string()),
  author: z.string(),
  image: z.string().optional(),
});

/**
 * Search for the corresponding mdx file, compiles it and returns
 * it as a React component. The component can be passed to the
 * props of the page.
 *
 * @param slug URL Slug of the blog post
 * @returns Compiled MDX with code and frontmatter, or undefined if file not found
 */
export async function compileMDX(slug: string) {
  const mdxFilePath = resolve(process.cwd(), 'src/posts', `${slug}.mdx`);

  try {
    const mdxFile = await Bun.file(mdxFilePath).text();

    if (!mdxFile) {
      return;
    }

    const imports = await extractImports(mdxFile);

    const { code, frontmatter } = await bundleMDX({
      source: mdxFile,
      files: imports,
    });

    // parse frontmatter with zod
    const parse = await frontmatterSchema.safeParseAsync({
      ...frontmatter,
      date: new Date(frontmatter.date),
    });

    if (!parse.success) {
      console.error(
        `Invalid frontmatter in MDX file "${slug}":`,
        z.prettifyError(parse.error)
      );
      return;
    }

    return { code, frontmatter: parse.data };
  } catch (error) {
    console.error(`Failed to compile MDX for slug "${slug}":`, error);
    return;
  }
}

export async function findMDXFiles() {
  const postsDir = resolve(process.cwd(), 'src/posts');

  const dirFiles = await readdir(postsDir);
  console.log(dirFiles);
  const files: (z.infer<typeof frontmatterSchema> & { slug: string })[] = [];

  for await (const file of dirFiles) {
    if (file.endsWith('.mdx')) {
      const { data } = matter(await Bun.file(resolve(postsDir, file)).text());

      const parse = await frontmatterSchema.safeParseAsync({
        ...data,
        date: new Date(data.date),
      } as z.infer<typeof frontmatterSchema>);

      if (!(parse.success && parse.data)) {
        console.warn(
          `Invalid frontmatter in file "${file}":`,
          z.prettifyError(parse.error)
        );

        return [];
      }

      files.push({
        ...parse.data,
        slug: file.replace('.mdx', ''),
      });
    }
  }

  return files;
}
