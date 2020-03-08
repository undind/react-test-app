import ticketsAPI from "utils/api/tickets";
import { GET_TICKETS, GET_TICKETS_SUCCESS, GET_TICKETS_ERROR } from "../types";

const Actions = {
  setTicketsData: data => ({
    type: GET_TICKETS_SUCCESS,
    payload: data
  }),

  getTickets: () => ({
    type: GET_TICKETS
  }),

  setIsError: () => ({
    type: GET_TICKETS_ERROR
  }),

  getTicketsData: payload => async dispatch => {
    dispatch(Actions.getTickets());

    try {
      const response = await ticketsAPI.getTickets(payload);
      const { data } = response;

      dispatch(Actions.setTicketsData(data));
    } catch (error) {
      dispatch(Actions.setIsError());
    }
  }
};

export default Actions;
