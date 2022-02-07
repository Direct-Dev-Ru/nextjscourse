import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { getEventById } from '../api/dummy-data';
import EventSummary from '../../components/event-detail/EventSummary';
import EventLogistics from '../../components/event-detail/EventLogistics';
import EventContent from '../../components/event-detail/EventContent';
import { useGetEvents } from '../../hooks/useRequests';
import apiConfig from '../api/config';
import { EventType } from '../api/types';

const EventDetailedPage = () => {
  const router = useRouter();
  const eventId: any = router.query.eventId;

  const filterEvents = function (event: EventType) {
    const currentEventId = event?.id ?? -20_000;
    return currentEventId === eventId;
  };

  const { events, loading, error } = useGetEvents(
    `events.json?orderBy="$key"&startAt="${eventId}"&endAt="${eventId}"`,
    filterEvents
  );
  //   console.log(events, loading, error);

  if (error) {
    return <h1>Failed to load ...</h1>;
  }

  if (loading) {
    return <h1 className='m-10 font-bold text-pink-600 text-2xl'>Loading ...</h1>;
  }

  const event = events[0];

  if (!event) {
    return <EventSummary title={`No Event Fount with id ${eventId}`} />;
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export default EventDetailedPage;
