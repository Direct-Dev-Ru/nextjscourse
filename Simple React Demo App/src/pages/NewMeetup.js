/* eslint-disable no-useless-concat */

import React from 'react';
import { useHistory } from 'react-router-dom';
import NewMeetupForm from '../components/meetups/NewMeetupForm';

function NewMeetupPage() {
  const history = useHistory();

  function addMeetupHandler(meetupData) {
    console.log('Trying to store data into database ...');
    fetch('https://react-getting-started-26f8a-default-rtdb.firebaseio.com/' + 'meetups.json', {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      console.log('Stored in database', meetupData);
      history.replace('/');
    });
  }

  return (
    <section>
      <h1>New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewMeetupPage;
