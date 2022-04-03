import Head from 'next/head';
import { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';

type SwitchHead = {
  [url: string]: ReactElement<any, any>;
};

export default function HtmlHead(props: any) {
  const [render, setRender] = useState(true);
  const router = useRouter();
  //   console.log(router);
  if (props.renderHead) {
    setRender(!render);
  }

  const title = props.title;

  const defaultHead = (
    <Head>
      {title ? <title>{title}</title> : null}
      <meta name='description' content='You can find a lot of amazing events here ...' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );

  return defaultHead;
}
