import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import _ from "lodash";
import qs from "qs";

const PaginationComponent = ({ numberPage, totalPages, onClickFunc, pagesLimit }) => {
  let location = useLocation();
  let history = useHistory();

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
      if (numberPage < limit) {
        startPage = 1;
        endPage = limit;
      } else if (numberPage + 4 >= totalPages) {
        startPage = totalPages - limit + 1;
        endPage = totalPages;
      } else {
        startPage = numberPage - (limit / 2 - 1);
        endPage = numberPage + (limit / 2 - 1);
      }
    }

    const pages = [...Array(endPage + 1 - startPage).keys()].map(i => startPage + i);

    return pages;
  };

  return (
    <Pagination>
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
  onClickFunc: PropTypes.func
};

export default PaginationComponent;
