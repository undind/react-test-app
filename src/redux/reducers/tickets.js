import { GET_TICKETS, GET_TICKETS_SUCCESS, GET_TICKETS_ERROR } from "../types";

const initialState = {
  tickets: [],
  isFething: false,
  isError: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TICKETS:
      return {
        isFething: true
      };

    case GET_TICKETS_SUCCESS:
      return {
        ...state,
        tickets: payload,
        isFething: false
      };

    case GET_TICKETS_ERROR:
      return {
        ...state,
        isFething: false,
        isError: true
      };

    default:
      return state;
  }
};
