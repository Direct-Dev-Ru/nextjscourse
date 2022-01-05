/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import Card from '../user-interface/Card';
import classes from './MeetupItem.module.css';
import FavoritiesContext from '../../store/favorities-context';

const MeetupItem = (props) => {
  const favoriteCtx = useContext(FavoritiesContext);

  const itemIsFavoritie = favoriteCtx.itemIsFavoritie(props.id);

  function toggleFavoritieStatusHandler() {
    if (itemIsFavoritie) {
      favoriteCtx.removeFavoritie(props.id);
    } else {
      favoriteCtx.addFavoritie({
        id: props.id,
        title: props.title,
        description: props.description,
        image: props.image,
        address: props.address,
      });
    }
  }

  return (
    <li key={props.id} className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={toggleFavoritieStatusHandler}>
            {itemIsFavoritie ? 'Remove from Favorities' : 'Add to Favorities'}
          </button>
        </div>
      </Card>
    </li>
  );
};
export default MeetupItem;
