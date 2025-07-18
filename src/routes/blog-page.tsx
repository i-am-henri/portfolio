import { MDXProvider } from '@mdx-js/react';
import RootLayout from '../layouts/root';
import type { BlogFile } from '../lib/load';
import { mdxComponents } from '../lib/mdx';

export default function Blog({ article }: { article: BlogFile }) {
  return (
    <RootLayout>
      <style>
        {`
          h1, h2, h3 {
            color: #111;
            font-weight: 600;
          }
          a {
            text-decoration: underline;
            color: #666;
          }
          a:hover {
            color: #111;
          }
        `}
      </style>
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className="mb-4 font-bold text-3xl">{article.title}</h1>
        <p className="mb-4 text-neutral-700 text-sm">{article.date}</p>
      </div>
      <div className="flex flex-col space-y-3">
        <MDXProvider components={mdxComponents}>
          <article.Component />
        </MDXProvider>
      </div>
    </RootLayout>
  );
}
