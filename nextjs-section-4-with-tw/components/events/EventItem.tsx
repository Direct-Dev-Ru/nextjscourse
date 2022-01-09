import React from 'react';
import Button from '../ui/Button/Button';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';

import dayjs from 'dayjs';
import classes from './EventItem.module.css';

function EventItem(props: any) {
  const { title, image, date, location, id } = props.event;

  const humanReadableDate = dayjs(date).format('DD.MM.YYYY');
  const formattedAddress = location.replace(', ', '\n');

  const exploreLink = `/events/${id}`;

  return (
    <li key={id} className={classes.item}>
      <img src={'/' + image} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span> Explore This Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>

    // style by tailwind
    // <div className='flex justify-center m-5'>
    //   <div className='rounded-lg shadow-lg bg-white w-screen sm:w-5/6'>
    //     <div className='h-96 overflow-hidden'>
    //       <Link href={exploreLink}>
    //         <img className='rounded-t-lg cursor-pointer h-200 w-full' src={'/' + image} alt={title} />
    //       </Link>
    //     </div>
    //     <div className='p-6'>
    //       <h5 className='text-gray-900 text-xl font-medium mb-2'>{title}</h5>
    //       <p className='text-gray-700 text-base mb-1'>
    //         <time>{humanReadableDate}</time>
    //       </p>
    //       <p className='text-gray-700 text-base mb-4'>
    //         <address>{formattedAddress}</address>
    //       </p>
    //       <Link href={exploreLink}>
    //         <button
    //           type='button'
    //           className=' inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
    //         >
    //           Expore Event
    //         </button>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
  );
}

export default EventItem;
