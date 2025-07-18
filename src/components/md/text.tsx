import type { ComponentProps } from 'react';

export function P(props: ComponentProps<'p'>) {
  return <p {...props} className="mb-4 text-neutral-700 leading-relaxed" />;
}

export function Strong(props: ComponentProps<'strong'>) {
  return <strong {...props} className="font-semibold text-neutral-900" />;
}

export function Em(props: ComponentProps<'em'>) {
  return <em {...props} className="text-neutral-700 italic" />;
}

export function Code(props: ComponentProps<'code'>) {
  return (
    <code
      {...props}
      className="rounded bg-neutral-100 px-1 py-0.5 font-mono text-neutral-800 text-sm"
    />
  );
}

export function Blockquote(props: ComponentProps<'blockquote'>) {
  return (
    <blockquote
      {...props}
      className="my-6 border-neutral-300 border-l-4 pl-4 text-neutral-600 italic"
    />
  );
}

export function Hr(props: ComponentProps<'hr'>) {
  return (
    <hr {...props} className="my-8 border-0 border-neutral-200 border-t" />
  );
}
