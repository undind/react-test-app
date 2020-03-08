import { combineReducers } from "redux";

import posts from './posts';
import users from './users'
import tickets from './tickets'

export default combineReducers({
  posts,
  users,
  tickets
});