import RootLayout from '../layouts/root';

export default function Home() {
  return (
    <RootLayout>
      <h1 className="mb-4 font-semibold text-md">Henri</h1>
      <p className="mb-4">
        Hey, my name is Henri. I'm a 15 year old student from Germany,
        interested in tech, design and programming. I run a small{' '}
        <a className="!text-neutral-500 underline" href="blog">
          Blog
        </a>{' '}
        about everything tech related which interests me.
      </p>
      <p className="mb-4">
        I used to have too many projects, but I'm now focusing on{' '}
        <a
          className="!text-neutral-500 underline"
          href="https://selfmail.app"
          rel="noopener"
          target="_blank"
        >
          Selfmail
        </a>
        . I've never found the perfect trash email service, so I thought it
        would be a great idea to build{' '}
        <a
          className="!text-neutral-500 underline"
          href="https://trash.company"
          rel="noopener"
          target="_blank"
        >
          trash.company
        </a>
        .
      </p>
      <p className="mb-4">
        Most of my projects are living on{' '}
        <a
          className="!text-neutral-500 underline"
          href="https://git.new/henri"
          rel="noopener noreferrer"
          target="_blank"
        >
          Github
        </a>
        , check it out if you want to see how it's build!
      </p>
      <div className="flex space-x-4">
        <p>Links:</p>
        <a
          className="!text-neutral-500 underline"
          href="https://x.com/@createdbyhenri"
        >
          X/Twitter
        </a>
        <a className="!text-neutral-500 underline" href="https://git.new/henri">
          Github
        </a>
        <a className="!text-neutral-500 underline" href="mailto:hi@henri.is">
          Email
        </a>
      </div>
    </RootLayout>
  );
}
