import { useEffect, useState } from 'react';
import EventList from '../../components/events/EventList';
import { getAllEvents } from '../api/dummy-data';
import { useRouter } from 'next/router';
import EventsSearch from '../../components/events/EventsSearch';

const AllEventPage = () => {
  //   const allEvents = getAllEvents();
  const [allEvents, setAllEvents] = useState([]);
  const router = useRouter();

  const findEventsHandler = (year: any, month: any): void => {
    console.log(year);
    router.push(`/events/${year}/${month}/`);
  };
  // TODO: Refactot to standalone file
  useEffect(() => {
    fetch('/api/eventsdata')
      .then((res) => res.json())
      .then((data) => {
        setAllEvents(data);
        console.log(data);
      });
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-6xl font-bold'>All Events</h1>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={allEvents} />
    </div>
  );
};

export default AllEventPage;
