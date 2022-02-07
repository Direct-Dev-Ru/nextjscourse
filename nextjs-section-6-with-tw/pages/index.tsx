import { useEffect, useState } from 'react';
import Link from 'next/link';
import EventList from '../components/events/EventList';
import { useGetEvents } from '../hooks/useRequests';
import apiConfig from './api/config';
import { EventType } from './api/types';

const { URL, fetcher } = apiConfig;

function filterFeaturedEvents(event: EventType) {
  return event?.isFeatured ?? false;
}

export default function HomePage() {
  const [allEvents, setAllEvents] = useState<EventType[]>([]);

  const { events, error } = useGetEvents('events.json', filterFeaturedEvents);

  if (error) {
    return <h2>Failed to load ...</h2>;
  }

  if (!events || events.length === 0) {
    return <h2>No data yet ...</h2>;
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <Link href='/events'>
        <h1 className='text-6xl font-bold hover:text-blue-600 focus:text-blue-600 cursor-pointer'>
          Demo Events NextJs App
        </h1>
      </Link>
      <div className='m-5'>
        <h2 className='text-3xl font-bold m-3'>Featured Events: </h2>
        <EventList items={events} />
      </div>
    </div>
  );
}
