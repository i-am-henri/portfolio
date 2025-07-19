export default function Link({ href, children, ...props }) {
  return (
    <a
      className={`text-neutral-500 underline hover:text-neutral-700 ${props.className || ''}`}
      href={href}
      {...props}
    >
      {children}
    </a>
  );
}
