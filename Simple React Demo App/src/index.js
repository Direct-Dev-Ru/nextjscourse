import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { FavoritiesContextProvider } from './store/favorities-context';

ReactDOM.render(
  <FavoritiesContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FavoritiesContextProvider>,
  document.getElementById('root')
);
