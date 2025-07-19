import React from 'react';
import { codeToHtml } from 'shiki';

function findCodeText(node: React.ReactNode): string | null {
  if (React.isValidElement(node) && node.type === 'pre') {
    const preElement = node as React.ReactElement<{
      children?: React.ReactNode;
    }>;
    const preChildren = preElement.props.children;
    if (React.isValidElement(preChildren) && preChildren.type === 'code') {
      const codeChild = preChildren as React.ReactElement<{
        children?: React.ReactNode;
      }>;
      return typeof codeChild.props.children === 'string'
        ? codeChild.props.children
        : null;
    }
  }

  // Optional: falls <pre><code> verschachtelt ist oder mehrere Nodes
  if (Array.isArray(node)) {
    for (const child of node) {
      const result = findCodeText(child);
      if (result !== null) {
        return result;
      }
    }
  }

  return null;
}

export default async function CodeBlock({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {
  const text = findCodeText(children);

  if (!text) {
    return null;
  }

  const html = await codeToHtml(text, {
    lang,
    theme: 'one-light',
  });
  return (
    <div
      className="code overflow-x-scroll rounded-md bg-[#FAFAFA] p-4 ring-1 ring-neutral-200 md:w-[450px] lg:w-[500px]"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: We need to set the rendered code block as html into a div
      dangerouslySetInnerHTML={{ __html: html }}
      style={{ marginBottom: '1rem' }}
    />
  );
}
