import { GET_TICKETS, ADD_TICKET, GET_TICKETS_SUCCESS, ADD_TICKET_SUCCESS, GET_TICKETS_ERROR, ADD_TICKET_ERROR } from "../types";

const initialState = {
  tickets: [],
  isFething: false,
  isError: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TICKETS:
      return {
        ...state,
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
    case ADD_TICKET:
      return {
        ...state,
        isFething: true
      };

    case ADD_TICKET_SUCCESS:
      return {
        ...state,
        isFething: false
      };

    case ADD_TICKET_ERROR:
      return {
        ...state,
        isFething: false,
        isError: true
      };

    default:
      return state;
  }
};
