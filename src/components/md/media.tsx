import type { ComponentProps } from 'react';

export function A(props: ComponentProps<'a'>) {
  return (
    <a
      {...props}
      className="text-neutral-600 underline hover:text-neutral-900"
    />
  );
}

export function Img({ alt = '', ...props }: ComponentProps<'img'>) {
  return (
    <img
      {...props}
      alt={alt}
      className="my-6 max-w-full rounded-md shadow-sm"
      loading="lazy"
    />
  );
}
