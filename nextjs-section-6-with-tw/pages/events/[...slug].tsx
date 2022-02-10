import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { getFilteredEvents } from '../api/dummy-data';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/Button/Button';
import ErrorAlert from '../../components/error-alert/error-alert';
import { useGetEvents } from '../../hooks/useRequests';
import apiConfig from '../api/config';
import { EventType } from '../api/types';

const FilteredEventsPage = () => {
  const router = useRouter();

  const filterData = router.query.slug;

  if (!filterData) {
    return <p className='text-center text-4xl'>Loading ... </p>;
  }

  const [filteredYear, filteredMonth] = filterData;

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;
  const date = new Date(numYear, numMonth - 1);

  if (isNaN(numYear) || isNaN(numMonth) || numYear < 2000 || numYear > 2030 || numMonth < 1 || numMonth > 12) {
    return (
      <Fragment>
        <ErrorAlert>
          <p className='text-center text-2xl'>Invalid filter. Please adjust your values!!!</p>
        </ErrorAlert>
        <div className='text-center my-5'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  function filterEvents(event: EventType) {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
  }

  const { events, loading, error } = useGetEvents(`events.json`, filterEvents);

  console.log(events, loading, error);

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

  if (filteredEvents.length === 0 || !filteredEvents) {
    return (
      <Fragment>
        <ErrorAlert>
          <p className='text-center text-2xl text-white-300'>No Events. Please change filter values !</p>
        </ErrorAlert>
        <div className='text-center my-5'>
          <Button style={{ padding: '0px 40px' }} link='/events'>
            Show All Events
          </Button>
        </div>
      </Fragment>
    );
  }
  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

export default FilteredEventsPage;
