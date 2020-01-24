import {
  SET_IS_REGIST,
  SET_USER_DATA
} from "../types";

const initialState = {
  userData: {},
  isRegistr: false
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

    default:
      return state;
  }
};
