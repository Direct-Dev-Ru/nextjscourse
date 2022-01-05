/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { NavLink as Link } from 'react-router-dom';
import FavoritiesContext from '../../store/favorities-context';
import { useLocation } from 'react-router-dom';

import classes from './MainNavigation.module.css';

function MainNavigation(props) {
  const favoriteCtx = useContext(FavoritiesContext);
  const activeLinkStyle = {
    fontWeight: 'bold',
    color: 'white',
  };
  const location = useLocation();

  const routes = [
    { path: '/', title: 'All Meetups' },
    { path: '/new-meetup', title: 'New Meetup' },
    { path: '/favorities', title: 'My Favorities' },
  ].map((route, idx) => {
    return (
      <li key={idx}>
        <Link to={route.path} style={location.pathname === route.path ? activeLinkStyle : undefined}>
          {route.title}
        </Link>
      </li>
    );
  });

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Amazing MeetUp React App</div>
      <nav>
        <ul>
          {/* <li>
            <Link to='/'>All Meetups</Link>
          </li>
          <li>
            <Link to='/new-meetup'>New Meetup</Link>
          </li>
          <li>
            <Link to='/favorities'>
              My Favorities <span className={classes.badge}>{favoriteCtx.totalFavorities}</span>
            </Link>
          </li> */}
          {routes}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
