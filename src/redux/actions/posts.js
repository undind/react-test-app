import { postsAPI } from 'utils/api';

const Actions = {
  setPosts: posts => ({
    type: "POSTS:SET_POSTS",
    payload: posts
  }),

  setIsError: bool => ({
    type: "POSTS:IS_ERROR",
    payload: bool
  }),

  fetchPosts: () => dispatch => {
    postsAPI.getAll().then(({ data }) => {
      if (data.status === 'ok') {
        dispatch(Actions.setPosts(data.data))
        dispatch(Actions.setIsError(false))
      }
    }).catch(() => {
      dispatch(Actions.setIsError(true))
    })
  }
}

export default Actions;
