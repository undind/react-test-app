import { createSelector } from 'reselect';

const getUser = (state) => state.userData;

const selectUser = createSelector(
  getUser,
  (userData) => userData
);

export default selectUser;