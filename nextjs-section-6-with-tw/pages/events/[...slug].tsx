import { useRouter } from 'next/router';
import { Fragment, ReactElement } from 'react';
import { getFilteredEvents } from '../api/dummy-data';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/Button/Button';
import ErrorAlert from '../../components/error-alert/error-alert';
import { useGetEvents } from '../../hooks/useRequests';
import { EventType } from '../api/types';
import { GetServerSideProps } from 'next/types';
import { getEvents } from '../api/helper/api-utils';
import HtmlHead from '../../components/layout/HtmlHead';

// client-side data fetching
const FilteredEventsPageClientSide = (props: any) => {
  const router = useRouter();
  const filterData = router.query.slug;

  let pageHeadData: ReactElement<any, any>;

  if (!filterData) {
    pageHeadData = <HtmlHead title={`Loading filtering events `} />;
    return (
      <>
        {pageHeadData} <p className='text-center text-4xl'>Loading ... </p>
      </>
    );
  }

  const [filteredYear, filteredMonth] = filterData;

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;
  const date = new Date(numYear, numMonth - 1);

  if (isNaN(numYear) || isNaN(numMonth) || numYear < 2000 || numYear > 2030 || numMonth < 1 || numMonth > 12) {
    pageHeadData = <HtmlHead title={`Error filtering events for ${filteredYear} year ${filteredMonth} month`} />;
    return (
      <Fragment>
        {pageHeadData}
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
    pageHeadData = <HtmlHead title={`No events for ${filteredYear} year ${filteredMonth} month`} />;

    return (
      <Fragment>
        {pageHeadData}
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

  pageHeadData = <HtmlHead title={`Events for ${filteredYear} year ${filteredMonth} month`} />;

  return (
    <>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

// export default FilteredEventsPage;
export default FilteredEventsPageClientSide;

/**
// SSR data fetching
const FilteredEventsPage = (props: any) => {
    if (props.hasError) {
      return (
        <Fragment>
          <ErrorAlert>
            <p className='text-center text-2xl'>{props.errorMessage}</p>
          </ErrorAlert>
          <div className='text-center my-5'>
            <Button link='/events'>Show All Events</Button>
          </div>
        </Fragment>
      );
    }
    const filteredEvents = props.filteredEvents;
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
        <ResultsTitle date={JSON.parse(props.date)} />
        <EventList items={filteredEvents} />
      </>
    );
  };
  
  export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params, req } = context;
  
    const filterData: string | string[] = params?.slug ?? [];
    const [filteredYear, filteredMonth] = filterData;
  
    const numYear = +filteredYear;
    const numMonth = +filteredMonth;
    const date = new Date(numYear, numMonth - 1);
  
    if (isNaN(numYear) || isNaN(numMonth) || numYear < 2000 || numYear > 2030 || numMonth < 1 || numMonth > 12) {
      return {
        //   notFound: true,
        // redirect: {
        //     destination: /error
        // }
        props: {
          hasError: true,
          errorMessage: 'Invalid filter. Please adjust your values!!!',
          date: JSON.stringify(date),
        },
      };
    }
  
    function filterEvents(event: EventType) {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
    }
  
    return {
      props: { filteredEvents: await getEvents(filterEvents), date: JSON.stringify(date) },
    };
  };
*/
