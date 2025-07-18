import { serve } from 'bun';
import { renderToReadableStream } from 'react-dom/server';
import { MDXContent } from './lib/component';
import { compileMDX, findMDXFiles } from './lib/mdx';
import Home from './routes';
import BlogList from './routes/blog';
import Blog from './routes/blog-page';

const server = serve({
  port: 3000,
  routes: {
    '/': async () => {
      const stream = await renderToReadableStream(<Home />);

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/html',
        },
      });
    },
    '/avatar.ico': () => new Response(Bun.file('src/avatar.ico')),
    '/global.css': () =>
      new Response(Bun.file('dist/out.css'), {
        headers: {
          'Content-Type': 'text/css',
        },
      }),

    '/blog': async () => {
      const blog = await findMDXFiles();

      // tranforming the map of the blog entries into an array
      const blogArray = blog.map((entry) => ({
        title: entry.title,
        date: new Date(entry.date).toLocaleDateString('en-US'),
        slug: entry.slug,
      }));
      console.log('Blog entries:', blogArray);
      const stream = await renderToReadableStream(
        <BlogList list={blogArray} />
      );
      return new Response(stream, {
        headers: {
          'Content-Type': 'text/html',
        },
      });
    },

    // We are getting the "slug" of the blog, that's also the filename of the corresponding markdown file in
    // `src/posts`. After that, we'll render the content with React.
    '/blog/*': async (req) => {
      const params = new URL(req.url).pathname;
      const blogUrl = params.split('/').reverse()[0];

      const mdx = await compileMDX(blogUrl);

      if (!mdx) {
        return new Response('Not Found', { status: 404 });
      }

      const stream = await renderToReadableStream(
        <Blog
          blog={<MDXContent code={mdx.code} />}
          frontmatter={mdx.frontmatter}
        />
      );

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/html',
        },
      });
    },
  },
});

console.log('Server listens to port 3000.');
