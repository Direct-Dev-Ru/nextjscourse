import HtmlHead from '../../components/layout/HtmlHead';
import HtmlFooter from '../../components/layout/HtmlFooter';
import EventList from '../../components/events/EventList';
import { getFeaturedEvents } from '../api/dummy-data';

const AllEventPage = () => {
  const featuredEvents = getFeaturedEvents();
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <HtmlHead />

      <main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
        <h1 className='text-6xl font-bold'>All Events</h1>
      </main>

      <EventList items={featuredEvents} />

      <HtmlFooter />
    </div>
  );
};

export default AllEventPage;
