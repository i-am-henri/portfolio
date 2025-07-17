import { codeToHtml } from 'shiki';

export default async function Code({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: 'github-light',
  });
  return (
    <div
      className="code"
      dangerouslySetInnerHTML={{ __html: html }}
      style={{ marginBottom: '1rem' }}
    />
  );
}
