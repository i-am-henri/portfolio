import type { MDXContentProps } from 'mdx-bundler/client';
import * as React from 'react';
import * as _jsx_runtime from 'react/jsx-runtime';
import * as ReactDOM from 'react-dom';

// Attention: THIS CODE WAS COPIED FROM content-collections.dev
// Huge thanks to the author for this amazing code/project ❤️
// See More: https://github.com/sdorra/content-collections/blob/main/packages/mdx/src/react/server.tsx

export function useMDXComponent(
  code: string
): React.FunctionComponent<MDXContentProps> {
  const scope = { React, ReactDOM, _jsx_runtime };
  const fn = new Function(...Object.keys(scope), code);
  return fn(...Object.values(scope)).default;
}

type Props = MDXContentProps & {
  code: string;
};

export function MDXContent({ code, ...props }: Props) {
  const Component = useMDXComponent(code);
  return <Component {...props} />;
}
