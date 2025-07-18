import { compile, run } from '@mdx-js/mdx';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';

export async function renderMDX(
  content: string,
  frontmatter: Record<string, unknown> = {}
) {
  try {
    // Compile MDX to JavaScript
    const compiled = await compile(content, {
      outputFormat: 'function-body',
      development: false,
      // Enable syntax highlighting for code blocks
      remarkPlugins: [],
      rehypePlugins: [],
    });

    // Run the compiled MDX
    const { default: MDXComponent } = await run(String(compiled), {
      Fragment,
      jsx,
      jsxs,
    });

    return {
      Component: MDXComponent,
      frontmatter,
    };
  } catch (error) {
    console.error('Error compiling MDX:', error);
    throw error;
  }
}

export { mdxComponents } from '../components/md';
