import { SET_IS_REGIST, SET_USER_DATA, SET_IS_AUTH } from "../types";

const initialState = {
  userData: {},
  isRegistr: false,
  isAuth: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_DATA:
      return {
        userData: payload
      };

    case SET_IS_REGIST:
      return {
        ...state,
        isRegistr: payload
      };

    case SET_IS_AUTH:
      return {
        ...state,
        isAuth: payload
      };

    default:
      return state;
  }
};
