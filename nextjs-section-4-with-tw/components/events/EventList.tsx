import React from 'react';
import EventItem from './EventItem';
import classes from './EventList.module.css';

export default function EventList(props: any) {
  const { items } = props;
  return (
    // <section className='pt-20 lg:pt-[0px] pb-10 lg:pb-20 bg-[#F3F4F6]'>
    <section className={classes.list}>
      {items.map((event: any) => (
        <EventItem key={event.id} event={event} />
      ))}
    </section>
  );
}
