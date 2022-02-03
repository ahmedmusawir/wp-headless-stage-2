import React, { createContext, useState, useEffect } from 'react';
import { fetchPosts, conf, deletePost, wp } from '../../services/HttpService';

export const BlogContext = createContext();

function BlogContextProvider(props) {
  // const [posts, setPosts] = useState([]);
  // const [pageNumber, setPageNumber] = useState(2);
  // const [totalPages, setTotalPages] = useState(1);
  // const [isPending, setIsPending] = useState(false);

  const [posts, setPosts] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [pageNumber, setPageNumber] = useState(2);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsPending(true);
        // FETCHING POSTS
        const fetchedPosts = await wp.posts().get();
        // console.log(fetchedPosts);

        // GETTING TOTAL PAGES
        const totalPages = fetchedPosts._paging.totalPages;
        setTotalPages(totalPages);

        setPosts(fetchedPosts);
        setIsPending(false);
      } catch (e) {
        // print error
        console.log(e);
        return [];
      }
    }

    fetchPosts();
  }, []);

  return (
    <BlogContext.Provider
      value={{
        posts,
        setPosts,
        deletePost,
        totalPages,
        pageNumber,
        isPending,
      }}
    >
      {props.children}
    </BlogContext.Provider>
  );
}

export default BlogContextProvider;
