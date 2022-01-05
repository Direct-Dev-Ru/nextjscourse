/* eslint-disable no-unused-vars */
import React, { createContext, useState } from 'react';

const FavoritiesContext = createContext({
  favorities: [],
  totalFavorities: 0,
  addFavoritie: (favMeetup) => {},
  removeFavoritie: (favMeetupId) => {},
  itemIsFavoritie: (favMeetupId) => {},
});

export function FavoritiesContextProvider(props) {
  const [userFavorities, setUserFavorities] = useState([]);

  function addFavoritieHandler(favMeetup) {
    setUserFavorities((prevUserFavorities) => {
      return prevUserFavorities.concat(favMeetup);
    });
  }
  function removeFavoritieHandler(favMeetupId) {
    setUserFavorities((prevUserFavorities) => {
      return prevUserFavorities.filter((meetup) => meetup.id !== favMeetupId);
    });
  }
  function itemIsFavoritieHandler(favMeetupId) {
    return userFavorities.some((meetup) => meetup.id === favMeetupId);
  }

  const context = {
    favorities: userFavorities,
    totalFavorities: userFavorities.length,
    addFavoritie: addFavoritieHandler,
    removeFavoritie: removeFavoritieHandler,
    itemIsFavoritie: itemIsFavoritieHandler,
  };
  return <FavoritiesContext.Provider value={context}>{props.children}</FavoritiesContext.Provider>;
}

export default FavoritiesContext