import React from 'react';
import PropTypes from 'prop-types';

import { Container, Spinner } from 'reactstrap';

const Posts = ({ posts, isLoading, isError }) => {
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
            <ul className="mt-2 p-0">
              {posts.map(post => (
                <li key={post.id}>
                  <h2 className="text-center">{post.title}</h2>
                  <p>{post.text}</p>
                </li>
              ))}
            </ul>
          )}    
      </Container>
    </div>
  );
}

Posts.defaultProps = {
  posts: [],
}

Posts.propTypes = {
  posts: PropTypes.array,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool
};

export default Posts;
