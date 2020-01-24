import postsAPI from "utils/api/posts";
import { SET_POSTS, SET_ERROR, SET_LOADING } from '../types';

const Actions = {
  setPosts: posts => ({
    type: SET_POSTS,
    payload: posts
  }),

  setIsError: bool => ({
    type: SET_ERROR,
    payload: bool
  }),

  setIsLoading: bool => ({
    type: SET_LOADING,
    payload: bool
  }),

  fetchPosts: () => dispatch => {
    dispatch(Actions.setIsLoading(true));
    postsAPI
      .getAll()
      .then(({ data }) => {
        if (data.status === "ok") {
          dispatch(Actions.setIsLoading(false));
          dispatch(Actions.setPosts(data.data));
        }

        return data
      })
      .catch(() => {
        dispatch(Actions.setIsLoading(false));
        dispatch(Actions.setIsError(true));
      });
  }
};

export default Actions;
