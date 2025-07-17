export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link href="/global.css" rel="stylesheet" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>Henri</title>
        <link href="avatar.ico" rel="icon" />
        <meta
          content="Hey, my name is Henri. I'm a 15 year old student from Germany, interested in tech, design and programming."
          name="description"
        />
        <meta content="index, follow" name="robots" />
        <link href="https://henri.is" rel="canonical" />
        <meta
          content="Henri, programming, tech, design, student, Germany, Selfmail, trash.company, GitHub"
          name="keywords"
        />
        <meta content="Henri" name="author" />
        <meta content="Henri" property="og:title" />
        <meta
          content="Hey, my name is Henri. I'm a 15 year old student from Germany, interested in tech, design and programming."
          property="og:description"
        />
        <meta content="https://henri.is/avatar.ico" property="og:image" />
        <meta content="https://henri.is" property="og:url" />
        <meta content="website" property="og:type" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="Henri" name="twitter:title" />
        <meta
          content="Hey, my name is Henri. I'm a 15 year old student from Germany, interested in tech, design and programming."
          name="twitter:description"
        />
        <meta content="avatar.ico" name="twitter:image" />
        <meta content="https://henri.is" name="twitter:url" />
        <meta content="@createdbyhenri" name="twitter:site" />
      </head>
      <body className="flex min-h-screen w-full justify-center bg-white">
        <div className="mx-5 flex w-full flex-col items-start pt-10 text-neutral-800 sm:pt-12 md:mx-0 md:w-[450px] lg:w-[500px] lg:pt-24">
          {children}
        </div>
      </body>
    </html>
  );
}
