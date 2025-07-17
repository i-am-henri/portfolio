import RootLayout from '../layouts/root';
import type { BlogFile } from '../lib/load';

export default function Blog({ article }: { article: BlogFile }) {
  return (
    <RootLayout>
      <div
        className="flex flex-col space-y-3"
        /* biome-ignore lint/security/noDangerouslySetInnerHtml: we need to render the Markdown as html */
        dangerouslySetInnerHTML={{ __html: article.html }}
      />
    </RootLayout>
  );
}
