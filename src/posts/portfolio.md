---
title: "Another Portfolio"
date: "2025-07-17"
---

I've done it again: another, new, minimalistic portfolio. It's my fourth portfolio, and for sure not the last one. I could surf for hours online, searching for a new trend, and implementing it (a trend, which I probably never finish 💀).

This time, I've tried to be as minimalistic as possible – not only with the design, but also with the code. I used [bun](https://bun.com) as a kind of replacement for nodejs and express. I just need to import the `serve` function from bun, and whoosh, I have a completed web-server, with routing, replacing a framework like nextjs.

```tsx
import { serve } from 'bun';
import { renderToReadableStream } from 'react-dom/server';

function Home() {
    return (
        <p>Hello World</p>
    )
}

const server = serve({
  port: 3000,
  routes: {
    '/': async () => {
      const stream = await renderToReadableStream(<Home />);
      return new Response(stream, {
        headers: { 'Content-Type': 'text/html' },
      });
    },
  },
});
```

This is an example of an basic webserver, made with bun, which serves an React Component.