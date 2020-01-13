import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Pagination } from 'components';
import { Container, Spinner } from 'reactstrap';

const Posts = ({ posts, isLoading, isError }) => {
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage ] = useState(5);
  
  const [ searchValue, setSearchValue ] = useState("");
  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  }

  const filteredPosts = posts.filter(post => post.title.replace(/\s/g,'').toLowerCase().includes(searchValue.replace(/\s/g, '').toLowerCase()) || 
                                              post.text.replace(/\s/g,'').toLowerCase().includes(searchValue.replace(/\s/g, '').toLowerCase()))

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  
  return (
    <div>
      <Container>
        { isError && <h2 className="mt-5 text-center text-info">Что-то пошло не так ...</h2> }
        { isLoading && !posts.length ? 
          (
            <div className="h-100 d-flex flex-column align-items-center justify-content-center mt-5">
              <Spinner style={{ width: '6rem', height: '6rem' }} type="grow" color="primary" />
              <p>Загрузка ...</p>
            </div>
          ) : (
            <div>
              <div className="mt-4">
                <input type="text" placeholder="Поиск" className="form-control" value={searchValue} onChange={handleSearchInputChanges} />
              </div>
              <Pagination 
                postsPerPage={postsPerPage}
                totalPosts={filteredPosts.length}
                paginate={paginate}
              />
              <ul className="mt-3 p-0">
                {!currentPosts.length && !filteredPosts.length ? ( 
                  <h2 className="text-center">Ничего не найдено</h2> 
                ) : !currentPosts.length ? (
                  filteredPosts.map(post => (
                    <li key={post.id}>
                      <h3 className="text-center">{post.title}</h3>
                      <p>{post.text}</p>
                    </li>
                  ))
                ) : (
                  currentPosts.map(post => (
                  <li key={post.id}>
                    <h3 className="text-center">{post.title}</h3>
                    <p>{post.text}</p>
                  </li>
                )))}
              </ul>
            </div>
          )}    
      </Container>
    </div>
  );
}

Posts.defaultProps = {
  filteredPosts: [],
}

Posts.propTypes = {
  filteredPosts: PropTypes.array,
  posts: PropTypes.array,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool
};

export default Posts;
