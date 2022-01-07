import { combineReducers } from 'redux';

import counterReducer from './counterReducer/counterReducer';
import postsReducer from './postsReducer/postsReducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  posts: postsReducer,
});

export default rootReducer;
