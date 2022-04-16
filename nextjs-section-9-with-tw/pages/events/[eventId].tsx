import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next/types';
import EventSummary from '../../components/event-detail/EventSummary';
import EventLogistics from '../../components/event-detail/EventLogistics';
import EventContent from '../../components/event-detail/EventContent';
import { useGetEvents } from '../../hooks/useRequests';
import apiConfig from '../../config/config';
import Comments from '../../components/input/comments';
import { getEventById, getEvents } from '../../helper/api-utils';
import HtmlHead from '../../components/layout/HtmlHead';
import { logga } from '../../helper/loging/logga';

const { defaultFilterEventsFunction } = apiConfig;

const EventDetailedPage = (props: any) => {
  const router = useRouter();
  const eventId: any = router.query.eventId;

  const staticEvent = props.event;

  const { events, loading, error } = useGetEvents(`events`, defaultFilterEventsFunction);

  if (error) {
    return <h1>Failed to load event...</h1>;
  }

  if (!staticEvent && loading) {
    return <p className='text-center text-4xl'>Loading ... </p>;
  }

  const fetchedEvent = events.find((event) => event.id === eventId);

  if (!fetchedEvent && !staticEvent) {
    return <EventSummary title={`No Event Fount with id ${eventId}`} />;
  }

  const event = fetchedEvent ? fetchedEvent : staticEvent;
  return (
    <Fragment>
      <HtmlHead title={event.title} />
      <EventSummary title={event.title} />
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getEvents(undefined, undefined);

  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  const fallback = 'blocking';

  return {
    paths,
    fallback,
  };
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const eventId = context.params.eventId;
  return {
    props: { event: await getEventById(eventId, undefined) },
    revalidate: 30,
  };
};

export default EventDetailedPage;
