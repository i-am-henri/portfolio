import RootLayout from '../layouts/root';

export default function BlogList({
  list,
}: {
  list: { title: string; date: string; slug: string }[];
}) {
  return (
    <RootLayout>
      <a className="mb-4 font-semibold text-md" href="/">
        Henri
      </a>
      {list.map((item, index) => (
        <a
          className="group mb-4 flex w-full cursor-pointer flex-row items-center justify-between no-underline"
          href={`/blog/${item.slug}`}
          key={index.toString()}
        >
          <h2 className="font-medium text-black text-lg no-underline transition-colors group-hover:text-neutral-700">
            {item.title}
          </h2>
          <p className="text-neutral-700 text-sm no-underline">{item.date}</p>
        </a>
      ))}
    </RootLayout>
  );
}
