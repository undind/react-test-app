import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="d-flex align-items-center justify-content-center">
      <ul className='pagination mt-2'>
        {pageNumbers.length === 1 ? '' : pageNumbers.map(number => (
          <li key={number} className={currentPage === number ? 'page-item active' : 'page-item'}>
            <Link to={{ pathname: '/home', search: `?page=${number}` }} onClick={() => paginate(number)} className='page-link'>
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  postsPerPage: PropTypes.number,
  totalPosts: PropTypes.number,
  paginate: PropTypes.func
};

export default Pagination;