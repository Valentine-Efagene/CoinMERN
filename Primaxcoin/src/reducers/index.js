import { combineReducers } from 'redux';
import counterReducer from './counter';
import loggedReducer from './isLogged';
import emailReducer from './email';

const allReducers = combineReducers({
  counter: counterReducer,
  isLogged: loggedReducer,
  email: emailReducer,
});

export default allReducers;
