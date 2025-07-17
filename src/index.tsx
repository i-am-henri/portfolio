import { serve } from 'bun';
import { renderToReadableStream } from 'react-dom/server';
import { loadBlog } from './lib/load';
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
      const blog = await loadBlog();

      // tranforming the map of the blog entries into an array
      const blogArray = Array.from(blog.values()).map(
        ({ title, date }, index) => ({
          slug: Array.from(blog.keys())[index],
          title,
          date,
        })
      );
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
    // `src/posts`. After that, we'll render the content with React.a
    '/blog/*': async (req) => {
      const params = new URL(req.url).pathname;
      const blogUrl = params.split('/').reverse()[0];

      const blog = await loadBlog();

      const article = blog.get(blogUrl);

      if (!article) {
        return new Response('Not Found', { status: 404 });
      }

      const stream = await renderToReadableStream(
        <Blog article={{ ...article, slug: blogUrl }} />
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
