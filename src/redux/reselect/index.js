import { createSelector } from 'reselect';

const getTickets = (state) => state.tickets;

const selecTickets = createSelector(
  getTickets,
  (ticketsState) => {
    console.log(ticketsState)
    const { tickets } = ticketsState;
    const { data } = tickets;
    const { pagination } = data;
    console.log(pagination)
    return pagination;
  }
);

export default selecTickets;