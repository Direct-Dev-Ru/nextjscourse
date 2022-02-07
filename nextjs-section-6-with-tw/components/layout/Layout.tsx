import { Fragment } from 'react';
import { useRouter } from 'next/router';
import HtmlHead from './HtmlHead';
import HtmlFooter from './HtmlFooter';
import MainHeader from './MainHeader';

export default function Layout(props: any) {
  const router = useRouter();
  //   console.log(router);
  if (router.route === '/tailwind') {
    return <Fragment> {props.children} </Fragment>;
  }
  return (
    <Fragment>
      <HtmlHead />
      <MainHeader />
      <main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
        {props.children}
      </main>

      <HtmlFooter />
    </Fragment>
  );
}
