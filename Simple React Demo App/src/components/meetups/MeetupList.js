import React from 'react';
import MeetupItem from './Meetup Item';

import classes from './MeetupList.module.css';

function MeetupList({ meetups }) {
  return (
    <ul className={classes.list}>
      {meetups.map((meetup) => {
        return <MeetupItem key={meetup.id} {...meetup} />;
      })}
    </ul>
  );
}

export default MeetupList;
