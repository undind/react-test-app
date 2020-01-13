import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { postsAction } from 'redux/actions';

import { Posts as BasePosts } from 'components';

const Posts = ({ fetchPosts, posts, isError }) => {
  const [ loading ] = useState(true);

  console.log(isError)
  
  useEffect(() => {
    fetchPosts()
  }, [fetchPosts]);

  return (
    <BasePosts 
      posts={posts}
      isLoading={loading}
      isError={isError}
    />
  );
}

export default connect(({ posts }) => posts, postsAction)(Posts);