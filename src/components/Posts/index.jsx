import React from 'react';
import PropTypes from 'prop-types';

import Pagination from 'components/Pagination';
import { Container, Spinner } from 'reactstrap';

const PostsUI = ({ posts, isLoading, isError, searchValue, handleSearchInputChanges, currentPosts, filteredPosts, paginate, postsPerPage }) => {
  
  return (
    <div>
      <Container>
        
        { isError ? ( <h2 className="mt-5 text-center text-info">Что-то пошло не так ...</h2> ) : isLoading && !posts.length ? 
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

PostsUI.defaultProps = {
  filteredPosts: [],
}

PostsUI.propTypes = {
  filteredPosts: PropTypes.array,
  posts: PropTypes.array,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool
};

export default PostsUI;
