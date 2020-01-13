import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { postsAction } from 'redux/actions';

import { Posts as BasePosts } from 'components';

const Posts = ({ fetchPosts, posts, isError, isLoading }) => {
  
  useEffect(() => {
    fetchPosts()
  }, [fetchPosts]);

  return (
    <BasePosts 
      posts={posts}
      isLoading={isLoading}
      isError={isError}
    />
  );
}

export default connect(({ posts }) => posts, postsAction)(Posts);