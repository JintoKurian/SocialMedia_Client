// 5. rootReducer.js
import { combineReducers } from 'redux';
import commentReducer from './commentReducer';

const rootReducer = combineReducers({
  comments: commentReducer,
  // Add other reducers as needed
});

export default rootReducer;
