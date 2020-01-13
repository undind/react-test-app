const initialState = {
  posts: [],
  isError: false,
  isLoading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "POSTS:SET_POSTS":
      return {
        posts: payload
      }

    case 'POSTS:IS_ERROR':
      return {
        ...state,
        isError: payload,
      };
    case 'POSTS:IS_LOADING':
      return {
        ...state,
        isLoading: payload,
      };

    default:
      return state;
  }
}
