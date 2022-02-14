import { useEffect, useState } from 'react';
import Link from 'next/link';
import EventList from '../components/events/EventList';
import { useGetEvents } from '../hooks/useRequests';
import apiConfig from './api/config';
import { EventType } from './api/types';
import { GetServerSideProps, GetStaticProps } from 'next/types';
import { getEvents } from './api/helper/api-utils';
import HtmlHead from '../components/layout/HtmlHead';

const { URL, fetcher } = apiConfig;

function filterFeaturedEvents(event: EventType) {
  return event?.isFeatured ?? false;
}

export default function HomePage(props: any) {
  const staticEvents: EventType[] = props.featuredEvents;

  //   const { events, error } = useGetEvents('events.json', filterFeaturedEvents);
  const events: EventType[] = [];
  const error = undefined;

  if (error) {
    return <h2>Failed to load ...</h2>;
  }

  if ((!staticEvents || staticEvents.length === 0) && (!events || events.length === 0)) {
    return <h2>No data yet ...</h2>;
  }

  const eventsToRender = events.length === 0 ? staticEvents : events;

  return (
    <>
      <HtmlHead title='NextJs Events - Featured Events' />
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <Link href='/events'>
          <h1 className='text-6xl font-bold hover:text-blue-600 focus:text-blue-600 cursor-pointer'>
            Demo Events NextJs App
          </h1>
        </Link>
        <div className='m-5'>
          <h2 className='text-3xl font-bold m-3'>Featured Events: </h2>
          <EventList items={eventsToRender} />
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const fetchResult = await getEvents(filterFeaturedEvents);
  return {
    props: {
      featuredEvents: fetchResult,
    },
    revalidate: 30,
  };
};
