import { Fragment, FunctionComponent, useState } from 'react';
import { useRouter } from 'next/router';
import HtmlHead from './HtmlHead';
import HtmlFooter from './HtmlFooter';
import MainHeader from './MainHeader';
import React from 'react';
import apiConfig from '../../config/config';

import { isDev, logga } from 'helper/loging/logga';

const ParentLayout: FunctionComponent<any> = ({ children }) => {
  const routerMain = useRouter();
  apiConfig.URL = 'http://localhost:3000/api/';
  const [render, setRender] = useState(false);
  const childrenWithProps = React.Children.map(children, (child, index) =>
    React.cloneElement(child, {
      reRenderFromLayout: () => {
        setRender(!render);
      },
      render,
      isDev,
      logga,
      router: routerMain,
    })
  );
  const router = useRouter();

  return (
    <Fragment>
      <MainHeader />
      <main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
        {childrenWithProps}
      </main>
      <HtmlFooter />
    </Fragment>
  );
};

export default ParentLayout;

function Layout(props: any) {
  const router = useRouter();
  //   console.log(router);
  if (router.route === '/tailwind') {
    return <Fragment> {props.children} </Fragment>;
  }

  return (
    <Fragment>
      <MainHeader />
      <main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
        {props.children}
      </main>
      <HtmlFooter />
    </Fragment>
  );
}
