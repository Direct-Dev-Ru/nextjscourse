import Head from 'next/head';
import { ReactElement } from 'react';

type SwitchHead = {
  [url: string]: ReactElement<any, any>;
};

export default function HtmlHead(props: any) {
  const currentRoute = props.route;
  const title = props.title;

  const defaultHead = (
    <Head>
      <title>{title}</title>
      <meta name='description' content='You can find a lot of amazing events here ...' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );

  return defaultHead;
}
