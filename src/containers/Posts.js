import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { postsAction } from "redux/actions";

import PostsUI from "components/Posts/index.jsx";
import { useLocation } from "react-router-dom";

const Posts = ({ fetchPosts, posts, isError, isLoading }) => {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let numberPage = params.get('page') || "1";
  
  const [currentPage, setCurrentPage] = useState(Number(numberPage));
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
        .includes(searchValue.replace(/\s/gi, "").toLowerCase()) ||
      post.text
        .replace(/\s/g, "")
        .toLowerCase()
        .includes(searchValue.replace(/\s/gi, "").toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <PostsUI
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
};

export default connect(({ posts }) => posts, postsAction)(Posts);
