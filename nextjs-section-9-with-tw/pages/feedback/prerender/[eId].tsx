import { useRef, useState, useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { appConfig } from '../../../config/config';
import { useRouter } from 'next/router';
import { EventType, FeedbackType } from '../../../types/types';
import { getEvents, getEventById } from '../../../helper/api-utils';
import { dbPath, readFeedbackData } from '../../api/feedback';
import HtmlHead from '../../../components/layout/HtmlHead';

const dummyEvent = {
  id: 'undefined',
  title: '',
  description: '',
  location: '',
  date: '',
  image: '',
  isFeatured: false,
};

const { URL, fetcher, defaultPath, defaultFilterEventsFunction } = appConfig;

const PreFeedbackPage = (props: any) => {
  const router = useRouter();
  const eventId: any = (router?.query?.eId ?? '0') === 'default' ? '0' : router?.query?.eId ?? '0';
  const feedbackItems: FeedbackType[] = props.feedbackItems;
  const allEvents: EventType[] = props.allEvents;
  const event: EventType | undefined =
    eventId === '0' ? { ...dummyEvent, title: 'our site' } : allEvents.find((e) => e.id === eventId);
  const [feedbackData, setFeedBackData] = useState<FeedbackType | undefined>();

  function loadFeedbackHandler(id: any) {
    console.log('id is = ', id);
    if (id === 'hide') {
      setFeedBackData(undefined);
      return;
    }
    fetch(`/api/feedback/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.payload.data);
        setFeedBackData(data.payload.data);
      });
  }

  const feedbackListItems = (
    <ol type='1' style={{ listStyle: 'auto' }}>
      {feedbackItems?.map((item) => {
        return (
          <li key={item.id} className='text-left'>
            {feedbackData?.id === item.id && (
              <div>
                <p>email: {item.email}</p>
              </div>
            )}
            {feedbackData?.id === item.id && (
              <div>
                <p>feedback id: {item.id}</p>
              </div>
            )}
            {`${item.text}`}
            <div className='my-3 '>
              <button
                className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                onClick={loadFeedbackHandler.bind(null, feedbackData?.id !== item.id ? item.id : 'hide')}
              >
                {feedbackData?.id !== item.id ? 'Show Details About Feedback' : 'Hide Details About Feedback'}
              </button>
            </div>
          </li>
        );
      })}
    </ol>
  );

  const head = <HtmlHead title={`Feedback Records for ${event?.title ?? 'hbz'}`} />;

  return (
    <>
      {head}
      <section className='text-gray-600 body-font relative w-full'>
        <div className='absolute inset-0 bg-gray-300'></div>
        <div className='container px-5 py-24 mx-auto flex'>
          <div className='lg:w-1/2 md:w-2/3 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md'>
            <h1 className='text-gray-900 text-xl mb-1 font-medium title-font'>Feedback Records About:</h1>
            <h2 className='text-gray-900 text-lg mb-1 font-medium title-font'>"{event?.title ?? ''}"</h2>
            <div className='mt-4'>{feedbackListItems}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allEvents: EventType[] = await getEvents(defaultFilterEventsFunction, undefined);

  const paths = allEvents.map((event) => ({ params: { eId: event.id } }));
  const fallback = 'blocking';

  return {
    paths,
    fallback,
  };
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const allEvents: EventType[] = await getEvents(defaultFilterEventsFunction, undefined);
  const allFeedbackItems: FeedbackType[] = readFeedbackData(dbPath);

  const feedbackItems: FeedbackType[] = allFeedbackItems.filter((e) => e.eventId === params?.eId);

  return {
    props: {
      allEvents: allEvents,
      feedbackItems: feedbackItems,
    },
    revalidate: 30,
  };
};

export default PreFeedbackPage;
