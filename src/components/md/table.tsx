import type { ComponentProps } from 'react';

export function Table(props: ComponentProps<'table'>) {
  return (
    <div className="my-6 overflow-x-auto">
      <table
        {...props}
        className="min-w-full border-collapse border border-neutral-200"
      />
    </div>
  );
}

export function Thead(props: ComponentProps<'thead'>) {
  return <thead {...props} className="bg-neutral-50" />;
}

export function Tbody(props: ComponentProps<'tbody'>) {
  return <tbody {...props} />;
}

export function Tr(props: ComponentProps<'tr'>) {
  return <tr {...props} className="border-neutral-200 border-b" />;
}

export function Th(props: ComponentProps<'th'>) {
  return (
    <th
      {...props}
      className="border border-neutral-200 bg-neutral-50 px-4 py-3 text-left font-medium text-neutral-900 text-sm"
    />
  );
}

export function Td(props: ComponentProps<'td'>) {
  return (
    <td
      {...props}
      className="border border-neutral-200 px-4 py-3 text-neutral-700 text-sm"
    />
  );
}
