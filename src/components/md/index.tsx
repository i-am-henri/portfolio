// Headings
export { H1, H2, H3, H4, H5, H6 } from './heading';
// Lists
export { Li, Ol, Ul } from './lists';
// Media
export { A, Img } from './media';

// Tables
export { Table, Tbody, Td, Th, Thead, Tr } from './table';
// Text formatting
export { Blockquote, Code, Em, Hr, P, Strong } from './text';

import { H1, H2, H3, H4, H5, H6 } from './heading';
import { Li, Ol, Ul } from './lists';
import { A, Img } from './media';
import { Table, Tbody, Td, Th, Thead, Tr } from './table';
import { Blockquote, Code, Em, Hr, P, Strong } from './text';

// MDX components mapping
export const mdxComponents = {
  // Headings
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,

  // Text
  p: P,
  strong: Strong,
  em: Em,
  code: Code,
  blockquote: Blockquote,
  hr: Hr,

  // Media
  a: A,
  img: Img,

  // Lists
  ul: Ul,
  ol: Ol,
  li: Li,

  // Tables
  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: Tr,
  th: Th,
  td: Td,
};
