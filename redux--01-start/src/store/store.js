import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer';
import { mw1, mw2 } from './middlewares/exampleMiddlewares';

const composedEnhancer = composeWithDevTools(
  // Add whatever middleware you actually want to use here
  applyMiddleware(mw1, mw2)
  // other store enhancers if any
);

const store = createStore(rootReducer, composedEnhancer);
export default store;
