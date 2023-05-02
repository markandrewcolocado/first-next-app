import Document, { Head, Html, Main, NextScript } from "next/document";

// special nextjs file that allows to set application-wide settings
// Reasons for overwriting the default document:
//  If you want to the lang attribute
//  If you want to add additional
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <body>
            <div id="overlays" />
            <Main />
            <NextScript />
          </body>
        </Head>
      </Html>
    );
  }
}

export default MyDocument;
