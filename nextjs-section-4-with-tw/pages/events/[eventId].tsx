import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { getEventById } from '../api/dummy-data';
import EventSummary from '../../components/event-detail/EventSummary';
import EventLogistics from '../../components/event-detail/EventLogistics';
import EventContent from '../../components/event-detail/EventContent';

const EventDetailedPage = () => {
  const router = useRouter();
  const eventId: any = router.query.eventId;
  const event = getEventById(eventId);

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
