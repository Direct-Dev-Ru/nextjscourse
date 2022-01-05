import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import FavoritiesContext from '../store/favorities-context';
import MeetupList from '../components/meetups/MeetupList';

function FavoritiesPage() {
  const favoriteCtx = useContext(FavoritiesContext);

  let content;

  let colorH1 = 'darkgrey';
  let colorH3 = 'lightgrey';

  let Header1 = styled.h1`
    color: ${colorH1};
  `;
  let Header3 = styled.h3`
    color: ${colorH3};
  `;

  if (favoriteCtx.totalFavorities === 0) {
    content = (
      <Header3>
        You got no favorities yet. <Link to='/'>Start adding some?</Link>
      </Header3>
    );
  } else {
    colorH1 = 'black';
    colorH3 = 'black';

    Header1 = styled.h1`
      color: ${colorH1};
    `;
    Header3 = styled.h3`
      color: ${colorH3};
    `;
    content = <MeetupList meetups={favoriteCtx.favorities} />;
  }

  return (
    <section>
      <Header1> My Favorities Meetups</Header1>
      {content}
    </section>
  );
}

export default FavoritiesPage;
