import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import postsAction from "redux/actions/posts";

import PostsUI from "components/Posts";
import { useLocation } from "react-router-dom";

const Posts = ({ fetchPosts, posts, isError, isLoading }) => {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let numberPage = params.get('page');

  const [currentPage, setCurrentPage] = useState(Number(numberPage) || 1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const [searchValue, setSearchValue] = useState("");
  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value);
  };

  const filteredPosts = posts.filter(
    post =>
      post.title
        .replace(/\s/g, "")
        .toLowerCase()
        .includes(searchValue.replace(/\s/g, "").toLowerCase()) ||
      post.text
        .replace(/\s/g, "")
        .toLowerCase()
        .includes(searchValue.replace(/\s/g, "").toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <PostsUI
      posts={posts}
      isLoading={isLoading}
      isError={isError}
      searchValue={searchValue}
      handleSearchInputChanges={handleSearchInputChanges}
      currentPosts={currentPosts}
      filteredPosts={filteredPosts}
      postsPerPage={postsPerPage}
      currentPage={currentPage}
    />
  );
};

export default connect(({ posts }) => posts, postsAction)(Posts);
