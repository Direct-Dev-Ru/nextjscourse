/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import FavoritiesContext from '../../store/favorities-context';

import classes from './MainNavigation.module.css';

function MainNavigation() {
  const favoriteCtx = useContext(FavoritiesContext);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Amazing MeetUp React App</div>
      <nav>
        <ul>
          <li>
            <Link to='/'>All Meetups</Link>
          </li>
          <li>
            <Link to='/new-meetup'>New Meetup</Link>
          </li>
          <li>
            <Link to='/favorities'>
              My Favorities <span className={classes.badge}>{favoriteCtx.totalFavorities}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
