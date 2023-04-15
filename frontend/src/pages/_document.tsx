import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="">
      {/* <link
        rel="stylesheet"
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
      /> */}
      <script src="https://cdn.tailwindcss.com"></script>
      <meta charSet="UTF-8" />

      <Head />

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
