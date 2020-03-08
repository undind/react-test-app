import React, { useEffect } from "react";
import { connect } from "react-redux";
import qs from "qs";

import ticketsAction from "redux/actions/tickets";

import TicketsUI from "components/Tickets";
import { useLocation } from "react-router-dom";

const Tickets = props => {
  let location = useLocation();
  const pagination = props.tickets?.data?.pagination;

  const queryString = qs.parse(location.search.slice(1));

  useEffect(() => {
    props.getTicketsData(queryString);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.getTicketsData, location.search]);

  return (
    <TicketsUI pagination={pagination} tickets={props.tickets?.data} />
  );
};

export default connect(({ tickets }) => tickets, ticketsAction)(Tickets);
