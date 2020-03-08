import React, { useState } from "react";
// import PropTypes from "prop-types";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PaginationComponent = ({ numberPage, totalPages, onClickFunc }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      {totalPages > 0 ? (
        <>
          <PaginationItem
            onClick={() => (numberPage === 1 ? null : onClickFunc(numberPage - 1))}
            disabled={numberPage === 1}
          >
            <PaginationLink tag="button" first />
          </PaginationItem>
          {pageNumbers?.map(number => {
            return (
              <PaginationItem key={number} active={numberPage === number}>
                <PaginationLink onClick={() => onClickFunc(number)} tag="button">
                  {number}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem
            onClick={() => (numberPage === totalPages ? null : onClickFunc(numberPage + 1))}
            disabled={numberPage === totalPages}
          >
            <PaginationLink tag="button" last />
          </PaginationItem>
        </>
      ) : null}
    </Pagination>
  );
};

// PaginationComponent.propTypes = {
//   postsPerPage: PropTypes.number,
//   totalPosts: PropTypes.number,
//   paginate: PropTypes.func
// };

export default PaginationComponent;
