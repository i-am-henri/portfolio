import type { ComponentProps } from 'react';

export function Ul(props: ComponentProps<'ul'>) {
  return <ul {...props} className="my-4 list-disc space-y-2 pl-6" />;
}

export function Ol(props: ComponentProps<'ol'>) {
  return <ol {...props} className="my-4 list-decimal space-y-2 pl-6" />;
}

export function Li(props: ComponentProps<'li'>) {
  return <li {...props} className="text-neutral-700 leading-relaxed" />;
}
