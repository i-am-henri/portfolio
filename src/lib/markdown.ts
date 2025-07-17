import { marked } from 'marked';
import { codeToHtml } from 'shiki';

export async function renderMarkdownWithSyntaxHighlighting(
  content: string
): Promise<string> {
  const html = await marked(content, {
    breaks: true,
    gfm: true,
  });

  const codeBlockRegex =
    /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g;

  let processedHtml = html;
  const matches = Array.from(html.matchAll(codeBlockRegex));

  const processedBlocks = await Promise.allSettled(
    matches.map(async (match) => {
      const [fullMatch, language, code] = match;
      const decodedCode = code
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");

      const highlightedHtml = await codeToHtml(decodedCode, {
        lang: language,
        theme: 'one-light',
      });

      return {
        original: fullMatch,
        highlighted: `<div class="code" style="margin-bottom: 1rem;">${highlightedHtml}</div>`,
      };
    })
  );

  for (const result of processedBlocks) {
    if (result.status === 'fulfilled') {
      processedHtml = processedHtml.replace(
        result.value.original,
        result.value.highlighted
      );
    }
  }

  return processedHtml;
}
