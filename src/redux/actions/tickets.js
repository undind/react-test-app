import ticketsAPI from "utils/api/tickets";
import {
  GET_TICKETS,
  ADD_TICKET,
  GET_TICKETS_SUCCESS,
  ADD_TICKET_SUCCESS,
  GET_TICKETS_ERROR,
  ADD_TICKET_ERROR
} from "../types";

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

  addTicket: () => ({
    type: ADD_TICKET_SUCCESS
  }),

  getTicket: () => ({
    type: ADD_TICKET
  }),

  setTicketError: () => ({
    type: ADD_TICKET_ERROR
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
  },

  addTicketData: payload => async dispatch => {
    dispatch(Actions.getTicket());

    try {
      await ticketsAPI.addTicketUrl(payload);

      dispatch(Actions.addTicket());
    } catch (error) {
      dispatch(Actions.setTicketError());
      throw error;
    }
  }
};

export default Actions;
