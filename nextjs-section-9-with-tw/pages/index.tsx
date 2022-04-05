import Link from 'next/link';
import { useState, useEffect } from 'react';
import EventList from '../components/events/EventList';
import { appConfig } from '../config/config';
import { EventType } from '../types/types';
import { GetServerSideProps, GetStaticProps } from 'next/types';
import { getEvents } from '../helper/api-utils';
import HtmlHead from '../components/layout/HtmlHead';
import Image from 'next/image';
import backPic from '../public/images/back-1.png';
import NewsletterRegistration from '../components/input/newsletter-registration';
import ErrorAlert from '../components/ui/Alert/ErrorAlert';
const { URL, fetcher } = appConfig;

function filterFeaturedEvents(event: EventType) {
  return event?.isFeatured ?? false;
}

const emptyErrorObject = { isError: false, errorTitle: 'Error Is Empty', errorMessage: '' };
const delay = 10;
export default function HomePage(props: any) {
  const staticEvents: EventType[] = props.featuredEvents;

  const events: EventType[] = [];

  //   error visualization
  const [error, setError] = useState(emptyErrorObject);
  const { isError, errorTitle, errorMessage } = error;

  useEffect(() => {
    if (isError) {
      let timer1 = setTimeout(() => setError(emptyErrorObject), delay * 1000);
      return () => {
        clearTimeout(timer1);
      };
    }
  }, [isError]);

  const errorArea = isError && (
    <div style={{ minWidth: '70%' }}>
      <ErrorAlert
        title={errorTitle}
        error={errorMessage}
        onClickHandler={() => setError((prevState) => ({ ...prevState, isError: false }))}
      />
    </div>
  );

  // end of error processing

  if ((!staticEvents || staticEvents.length === 0) && (!events || events.length === 0)) {
    return <h2>No data yet ...</h2>;
  }

  const eventsToRender = events.length === 0 ? staticEvents : events;

  return (
    <>
      <HtmlHead title='NextJs Events - Featured Events' />
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <Link href='/events'>
          <h1 className='text-slate-300 text-6xl font-bold hover:text-blue-600 focus:text-blue-600 cursor-pointer'>
            Demo Events NextJs App
          </h1>
        </Link>
        <div className='m-5'>
          {/* <Image width={840} height={540} src={'/images/back-1.png'} /> */}
          {/* <Image width={840} height={540} src={backPic} /> */}
        </div>
        {errorArea}
        <div>
          <NewsletterRegistration setError={setError} />
        </div>
        <div className='m-1'>
          <h2 className='text-slate-300 text-3xl font-bold m-3'>Featured Events: </h2>
          <EventList items={eventsToRender} />
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const fetchResult = await getEvents(filterFeaturedEvents, undefined);
  return {
    props: {
      featuredEvents: fetchResult,
    },
    revalidate: 30,
  };
};
