import Link from 'next/link';
import EventList from '../components/events/EventList';
import { getFeaturedEvents } from './api/dummy-data';

export default function HomePage() {
  const featuredEvents = getFeaturedEvents();
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <Link href='/events'>
        <h1 className='text-6xl font-bold hover:text-blue-600 focus:text-blue-600 cursor-pointer'>
          Demo Events NextJs App
        </h1>
      </Link>
      <div className="m-5">
        <h2 className='text-3xl font-bold m-3'>Featured Events: </h2>
        <EventList items={featuredEvents} />
      </div>
    </div>
  );
}
