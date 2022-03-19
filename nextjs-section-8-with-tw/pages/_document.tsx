import Document, { Html, Head, Main, NextScript } from 'next/document';

const customCss = `body {
    //background: url(/images/back-1.png) repeat-y;
    background: url(/images/waves.svg) repeat-y;    
    -moz-background-size: 100%; /* Firefox 3.6+ */
    -webkit-background-size: 100%; /* Safari 3.1+ и Chrome 4.0+ */
    -o-background-size: 100%; /* Opera 9.6+ */
    background-size: 100%; /* Современные браузеры */
   }`;

class MyDocument extends Document {
  render() {
    return (
      <Html lang='ru'>
        <Head>
          <style>{customCss}</style>
        </Head>
        <body>
          <div id='overlays' />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
