import type { ComponentProps } from 'react';

export function H1(props: ComponentProps<'h1'>) {
  return (
    <h1
      {...props}
      className="mb-6 font-bold text-3xl text-neutral-900 leading-tight"
    />
  );
}

export function H2(props: ComponentProps<'h2'>) {
  return (
    <h2
      {...props}
      className="mt-8 mb-4 font-semibold text-2xl text-neutral-800 leading-snug"
    />
  );
}

export function H3(props: ComponentProps<'h3'>) {
  return (
    <h3
      {...props}
      className="mt-6 mb-3 font-semibold text-neutral-800 text-xl leading-snug"
    />
  );
}

export function H4(props: ComponentProps<'h4'>) {
  return (
    <h4
      {...props}
      className="mt-4 mb-2 font-medium text-lg text-neutral-800 leading-snug"
    />
  );
}

export function H5(props: ComponentProps<'h5'>) {
  return (
    <h5
      {...props}
      className="mt-3 mb-2 font-medium text-base text-neutral-800 leading-snug"
    />
  );
}

export function H6(props: ComponentProps<'h6'>) {
  return (
    <h6
      {...props}
      className="mt-3 mb-2 font-medium text-neutral-800 text-sm leading-snug"
    />
  );
}
