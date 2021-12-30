import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AllMeetupsPage from './pages/AllMeetups';
import FavoritiesPage from './pages/Favorities';
import NewMeetupPage from './pages/NewMeetup';

function App() {
  return (
    <>
      <div style={{ borderWidth: '1px', borderStyle: 'solid' }}>
        <span style={{ fontWeight: 'bold', color: 'red', margin: '10px' }}>Hello Dude !!!</span>
      </div>
      <Switch>
        <Route path='/' exact>
          <AllMeetupsPage />
        </Route>
        <Route path='/new-meetup'>
          <NewMeetupPage />
        </Route>
        <Route path='/favorities'>
          <FavoritiesPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
