import { SET_POSTS, SET_ERROR, SET_LOADING } from '../types';

const initialState = {
  posts: [],
  isError: false,
  isLoading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_POSTS:
      return {
        posts: payload
      }

    case SET_ERROR:
      return {
        ...state,
        isError: payload,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: payload,
      };

    default:
      return state;
  }
}
