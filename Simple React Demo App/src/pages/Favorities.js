import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import FavoritiesContext from '../store/favorities-context';
import MeetupList from '../components/meetups/MeetupList';

function FavoritiesPage() {
  const favoriteCtx = useContext(FavoritiesContext);

  let content;

  if (favoriteCtx.totalFavorities === 0) {
    content = (
      <h3>
        You got no favorities yet. <Link to="/">Start adding some?</Link>
      </h3>
    );
  } else {
    content = <MeetupList meetups={favoriteCtx.favorities} />;
  }

  return (
    <section>
      <h1> My Favorities Meetups</h1>
      {content}
    </section>
  );
}

export default FavoritiesPage;
