import React, { useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import qs from "qs";

import ticketsAction from "redux/actions/tickets";

import TicketsUI from "components/Tickets";
import { useLocation, useHistory } from "react-router-dom";

const Tickets = props => {
  let location = useLocation();
  let history = useHistory();
  const pagination = props.tickets?.data?.pagination;

  const queryString = qs.parse(location.search.slice(1));

  useEffect(() => {
    props.getTicketsData(queryString);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.getTicketsData, location.search]);

  const onClickFunc = n => {
    const detectQuery = _.isEmpty(_.pickBy(qs.parse(location.search.slice(1))));
    const pageSearch = detectQuery ? `?page=${n}` : `&page=${n}`;
    const hasQueryPage = _.has(qs.parse(location.search.slice(1)), "page");

    if (hasQueryPage) {
      return history.push(
        `${location.pathname}${location.search.replace(/page=\d+/, `page=${n}`)}`
      );
    }

    return history.push(`${location.pathname}${location.search}${pageSearch}`);
  };

  return (
    <TicketsUI pagination={pagination} tickets={props.tickets?.data} onClickFunc={onClickFunc} />
  );
};

export default connect(({ tickets }) => tickets, ticketsAction)(Tickets);
