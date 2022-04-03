import { useEffect, useState } from 'react';
import EventList from '../../components/events/EventList';
import apiConfig from '../../config/config';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import EventsSearch from '../../components/events/EventsSearch';
import { EventType } from '../../types/types';
import { GetServerSideProps, GetStaticProps } from 'next/types';
import { getEvents } from '../../helper/api-utils';
import HtmlHead from '../../components/layout/HtmlHead';

const { URL, fetcher, defaultPath, defaultFilterEventsFunction } = apiConfig;

const AllEventPage = (props: any) => {
  const allServerSideEvents: EventType[] = props.allServerSideEvents;

  //   props.logga('[allServerSideEvents]:', allServerSideEvents);

  const [allEvents, setAllEvents] = useState<EventType[] | undefined>(allServerSideEvents);
  const router = useRouter();

  const findEventsHandler = (year: any, month: any): void => {
    console.log(year);
    router.push(`/events/${year}/${month}/`);
  };

  return (
    <>
      <HtmlHead title='All Events' />
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className='text-slate-300 text-6xl font-bold'>All Events</h1>
        <EventsSearch onSearch={findEventsHandler} />
        <EventList items={allEvents} />
      </div>
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const fetchResult = await getEvents(defaultFilterEventsFunction);
  //   console.log('req-headers', req.headers);
  //   console.log('res-headers', res);
  return {
    props: {
      allServerSideEvents: fetchResult,
    },
    revalidate: 30,
  };
};

export default AllEventPage;
