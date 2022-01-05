/* eslint-disable no-useless-concat */
import React, { useState, useEffect } from 'react';

// import DUMMY_DATA from '../data/dummy-data';
import MeetupList from '../components/meetups/MeetupList';

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://react-getting-started-26f8a-default-rtdb.firebaseio.com/' + 'meetups.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        const meetups = [];

        for (const key in result) {
          if (Object.hasOwnProperty.call(result, key)) {
            const element = { id: key, ...result[key] };
            meetups.push(element);
          }
        }

        setIsLoading(false);
        setLoadedMeetups(meetups);
      })
      .catch((err) => {});
  }, []);

  if (isLoading) {
    return (
      <section>
        <h1>Loading ...</h1>
      </section>
    );
  }

  return (
    <section>
      <h1 style={{ textAlign: 'center' }}> All Meetups</h1>
      <MeetupList meetups={loadedMeetups} />
    </section>
  );
}

export default AllMeetupsPage;
