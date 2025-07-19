import type z from 'zod';
import type { frontmatterSchema } from '../lib/mdx';

export default function Blog({
  blog,
  frontmatter,
}: {
  blog: React.ReactNode;
  frontmatter: z.infer<typeof frontmatterSchema>;
}) {
  return (
    <html lang="en">
      <head>
        <title>{frontmatter.title}</title>
        <meta content={frontmatter.description} name="description" />
        <meta content={frontmatter.author} name="author" />
        <meta content={frontmatter.date.toISOString()} name="date" />
        <meta charSet="UTF-8" />
        <link href="/global.css" rel="stylesheet" />
        <meta content="https://henri.is/avatar.ico" property="og:image" />
        <meta content="avatar.ico" name="twitter:image" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <link href="avatar.ico" rel="icon" />
        <meta content="index, follow" name="robots" />
        {frontmatter.image && (
          <meta content={frontmatter.image} property="og:image" />
        )}
      </head>
      <body className="flex min-h-screen w-full justify-center bg-white">
        <div className="mx-5 flex w-full flex-col items-start space-y-4 pt-10 text-neutral-800 sm:pt-12 md:mx-0 md:w-[450px] lg:w-[500px] lg:pt-24">
          <header>
            <a className="font-bold" href="/">
              Henri
            </a>
          </header>
          <article className="space-y-4">
            <h1 className="font-medium">{frontmatter.title}</h1>
            <p className="!text-neutral-500">{frontmatter.description}</p>
            <div>{blog}</div>
          </article>
          <footer>
            <p>
              Written by {frontmatter.author} on{' '}
              {frontmatter.date.toLocaleDateString()}
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
