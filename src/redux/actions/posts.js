import { postsAPI } from "utils/api";

const Actions = {
  setPosts: posts => ({
    type: "POSTS:SET_POSTS",
    payload: posts
  }),

  setIsError: bool => ({
    type: "POSTS:IS_ERROR",
    payload: bool
  }),

  setIsLoading: bool => ({
    type: "POSTS:IS_LOADING",
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
      })
      .catch(() => {
        dispatch(Actions.setIsLoading(false));
        dispatch(Actions.setIsError(true));
      });
  }
};

export default Actions;
