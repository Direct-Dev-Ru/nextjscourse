import { useEffect, useState } from 'react';
import EventList from '../../components/events/EventList';
import apiConfig from '../api/config';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import EventsSearch from '../../components/events/EventsSearch';

const { URL, fetcher, defaultPath } = apiConfig;

const AllEventPage = () => {
  const [allEvents, setAllEvents] = useState<object[] | undefined>([]);
  const router = useRouter();

  const findEventsHandler = (year: any, month: any): void => {
    console.log(year);
    router.push(`/events/${year}/${month}/`);
  };

  const { data, error } = useSWR(URL + defaultPath, fetcher);
  useEffect(() => {
    if (data) {
      const aEvents: any[] = [];
      for (const key in data) {
        const element = data[key];
        aEvents.push({ id: key, ...element });
      }
      //   console.log('fire useEffect', aEvents);

      setAllEvents(aEvents);
    }
  }, [data]);

  //   // TODO: Refactor to standalone file
  //   useEffect(() => {
  //     fetch('/api/eventsdata')
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setAllEvents(data);
  //         console.log(data);
  //       });
  //   }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-6xl font-bold'>All Events</h1>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={allEvents} />
    </div>
  );
};

export default AllEventPage;
