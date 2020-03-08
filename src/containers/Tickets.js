import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import qs from 'qs';

import ticketsAction from "redux/actions/tickets";

import TicketsUI from "components/Tickets";
import { useLocation } from "react-router-dom";

const Tickets = ({ getTicketsData, posts, isError, isLoading }) => {
  let location = useLocation();

  // const [currentPage, setCurrentPage] = useState(Number(numberPage) || 1);
  // const [postsPerPage] = useState(5);

  const queryString = qs.parse(location.search.slice(1))

  useEffect(() => {
    getTicketsData(queryString);
  }, [getTicketsData, location.search]);



  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // const paginate = pageNumber => setCurrentPage(pageNumber);

  return <TicketsUI />;
};

export default connect(({ tickets }) => tickets, ticketsAction)(Tickets);
