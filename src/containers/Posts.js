import React, { useState, useEffect } from 'react';

import { Posts as BasePosts } from 'components';

const Posts = () => {
  const [ posts, setPosts ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ isErorr, setError ] = useState(false);
  
  useEffect(() => {
    fetch("http://www.mocky.io/v2/5d9dc38e3200004e00329939")
      .then(res => res.json())
      .then(data => {
        setPosts(data.data);
        setLoading(false);
      })
      .catch(e => {
        setError(true);
        setLoading(false);
      })
  }, [setPosts]);

  return (
    <BasePosts 
      posts={posts}
      isLoading={loading}
      isError={isErorr}
    />
  );
}

export default Posts;