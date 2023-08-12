import { combineReducers } from 'redux';

import profile from './profile';
import auth from './auth';
import settings from './settings';

export default combineReducers({
  profile,
  auth,
  settings
});
