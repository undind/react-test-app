const initialState = {
  posts: [],
  isError: false
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

    default:
      return state;
  }
}
