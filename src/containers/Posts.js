import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { postsAction } from 'redux/actions';

import { Posts as BasePosts } from 'components';

const Posts = ({ fetchPosts, posts, isError, isLoading }) => {

  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage ] = useState(5);

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts]);
  
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
    <BasePosts 
      posts={posts}
      isLoading={isLoading}
      isError={isError}
      searchValue={searchValue}
      handleSearchInputChanges={handleSearchInputChanges}
      currentPosts={currentPosts}
      filteredPosts={filteredPosts}
      paginate={paginate}
      postsPerPage={postsPerPage}
    />
  );
}

export default connect(({ posts }) => posts, postsAction)(Posts);