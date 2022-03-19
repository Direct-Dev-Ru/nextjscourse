import { useRef, useState, useEffect } from 'react';
import { appConfig } from '../../config/config';
import { useRouter } from 'next/router';
import { EventType } from '../../types/types';
import { getEvents, getEventById } from '../../helper/api-utils';
import HtmlHead from '../../components/layout/HtmlHead';

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
const FeedbackPage = (props: any) => {
  const router = useRouter();
  const eventId: any = (router?.query?.eventId ?? '0') === 'default' ? '0' : router?.query?.eventId ?? '0';
  const [event, setEvent] = useState<EventType | undefined>();

  useEffect(() => {
    let isApiSubscribed = true;
    const controller: AbortController = new AbortController();
    const signal: AbortSignal = controller.signal;

    const returnFunction = () => {
      isApiSubscribed = false;
      controller.abort();
    };

    if (eventId === '0') {
      setEvent({ ...dummyEvent, title: 'our site' });
      return returnFunction;
    }
    getEventById(eventId, signal).then((event) => {
      if (isApiSubscribed) {
        setEvent(event);
      }
    });
    return returnFunction;
  }, [eventId]);

  const head = <HtmlHead title={`Your Feedback for ${event?.title ?? 'hbz'}`} />;
  const mapSrc = `https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=%C4%B0zmir+(My%20Business%20Name)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed`;
  return (
    <>
      {head}
      <section className='text-gray-600 body-font relative w-full'>
        <div className='absolute inset-0 bg-gray-300'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d293026.2204507333!2d73.07527064879928!3d54.985946464649025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x43aafde2f601090b%3A0x5eefc33861a69b1a!2sOmsk%2C%20Omsk%20Oblast!5e0!3m2!1sen!2sru!4v1645330663477!5m2!1sen!2sru'
            width='100%'
            height='100%'
            title='map'
            scrolling='no'
            style={{ filter: 'grayscale(1) contrast(1.2) opacity(0.4)', borderWidth: '1px' }}
            loading='lazy'
          ></iframe>
        </div>
        <div className='container px-5 py-24 mx-auto flex'>
          <div className='lg:w-1/2 md:w-2/3 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md'>
            <h2 className='text-gray-900 text-lg mb-1 font-medium title-font'>Feedback</h2>
            <p className='leading-relaxed mb-5 text-gray-600'>Please give feedback about {event?.title ?? ''}</p>
            <div className='relative mb-4'>
              <label htmlFor='email' className='leading-7 text-sm text-gray-600'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
              />
            </div>
            <div className='relative mb-4'>
              <label htmlFor='message' className='leading-7 text-sm text-gray-600'>
                Message
              </label>
              <textarea
                id='message'
                name='message'
                className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out'
              />
            </div>
            <button className='text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'>
              Send feedback
            </button>
            <p className='text-xs text-gray-500 mt-3'>
              Your feedbacks very important for us. Its help make things better.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
// export const getStaticProps: GetStaticProps = async (context) => {
//   const { params } = context;
//   const fetchResult = await getEvents(defaultFilterEventsFunction);
//   //   console.log('req-headers', req.headers);
//   //   console.log('res-headers', res);
//   return {
//     props: {
//       allServerSideEvents: fetchResult,
//     },
//     revalidate: 30,
//   };
// };

export default FeedbackPage;
