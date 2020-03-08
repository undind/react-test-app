import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import _ from "lodash";
import qs from "qs";

const PaginationComponent = ({
  postsPerPage,
  totalPosts,
  paginate,
  forPosts,
  numberPage,
  totalPages,
  onClickFunc,
  pagesLimit
}) => {
  let location = useLocation();
  let history = useHistory();

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const onClickFuncComponent = n => {
    if (onClickFunc !== undefined) {
      return onClickFunc(n);
    }

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

  const getPager = (totalPages, numberPage, pagesLimit) => {
    let startPage = 0;
    let endPage = 0;
    let limit = pagesLimit || 10;

    if (totalPages <= limit) {
      startPage = 1;
      endPage = limit;
    } else {
      if (numberPage + 2 < limit) {
        startPage = 1;
        endPage = limit;
      } else if (numberPage + 4 >= totalPages) {
        startPage = totalPages - limit + 1;
        endPage = totalPages;
      } else {
        startPage = numberPage - limit / 2;
        endPage = numberPage + (limit / 2 - 1);
      }
    }

    const pages = [...Array(endPage + 1 - startPage).keys()].map(i => startPage + i);

    return pages;
  };

  if (forPosts) {
    return (
      <nav className="d-flex align-items-center justify-content-center">
        <ul className="pagination mt-2">
          {pageNumbers.length === 1
            ? ""
            : pageNumbers.map(number => (
                <li
                  key={number}
                  className={numberPage === number ? "page-item active" : "page-item"}
                >
                  <Link
                    to={{ pathname: "/home", search: `?page=${number}` }}
                    onClick={() => paginate(number)}
                    className="page-link"
                  >
                    {number}
                  </Link>
                </li>
              ))}
        </ul>
      </nav>
    );
  }

  return (
    <Pagination className="mt-3 mb-3 d-flex justify-content-center">
      {totalPages > 1 ? (
        <>
          <PaginationItem
            onClick={() => (numberPage === 1 ? null : onClickFuncComponent(numberPage - 1))}
            disabled={numberPage === 1}
          >
            <PaginationLink tag="button" first />
          </PaginationItem>
          {getPager(totalPages, numberPage, pagesLimit)?.map(number => {
            return (
              <PaginationItem key={number} active={numberPage === number}>
                <PaginationLink onClick={() => onClickFuncComponent(number)} tag="button">
                  {number}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem
            onClick={() =>
              numberPage === totalPages ? null : onClickFuncComponent(numberPage + 1)
            }
            disabled={numberPage === totalPages}
          >
            <PaginationLink tag="button" last />
          </PaginationItem>
        </>
      ) : null}
    </Pagination>
  );
};

PaginationComponent.propTypes = {
  numberPage: PropTypes.number,
  totalPages: PropTypes.number,
  pagesLimit: PropTypes.number,
  postsPerPage: PropTypes.number,
  totalPosts: PropTypes.number,
  forPosts: PropTypes.bool,
  paginate: PropTypes.func,
  onClickFunc: PropTypes.func
};

export default PaginationComponent;
