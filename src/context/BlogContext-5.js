import React, { createContext, useState, useEffect, useReducer } from 'react';
import { fetchPosts, conf, deletePost } from '../services/HttpService';
import { loadMorePosts } from '../components/general/LoadMorePagination';
import { confirmAlert } from 'react-confirm-alert';
import { BlogReducer } from '../reducer/BlogReducer';

export const BlogContext = createContext();

function BlogContextProvider(props) {
  // const [posts, setPosts] = useState([]);
  const [isPending, setIsPending] = useState(false);
  // const [pageNumber, setPageNumber] = useState(2);
  // const [totalPages, setTotalPages] = useState(0);
  // const [perPage] = useState(conf.perPage);

  // SETTING UP REDUCER
  const initialState = {
    posts: [],
    isPending: true,
    pageNumber: 2,
    totalPages: 0,
    perPage: conf.perPage,
  };
  const [state, dispatch] = useReducer(BlogReducer, initialState);

  useEffect(() => {
    // Loading Spinner Starts
    // setIsPending(true);

    // Collecting Data from Http Service
    const getPosts = async () => {
      const gotPosts = await fetchPosts();
      // REDUCER STATE ON FETCH POSTS
      dispatch({
        type: 'FETCH_POSTS',
        payload: {
          posts: gotPosts,
          isPending: false,
          pageNumber: 2,
          totalPages: gotPosts._paging.totalPages,
          perPage: conf.perPage,
        },
      });
      // Updating Total Pages
      // setTotalPages(gotPosts._paging.totalPages);

      // Loading Spinner Ends
      // setIsPending(false);
    };

    getPosts();
  }, []);

  const handleDelete = (postId) => {
    confirmAlert({
      title: 'Deleting the Post',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            const deletedPost = await deletePost(postId);
            console.log('DELETED POST IN BLOG CONTEXT', deletedPost);
            dispatch({ type: 'REMOVE_POST', payload: postId });
          },
        },
        {
          label: 'No',
          onClick: () => console.log('nothing'),
        },
      ],
    });
  };

  const handleLoadMore = async () => {
    // console.log('load more button clicked');
    // Loading Spinner Starts
    setIsPending(true);
    // console.log('Handling Load More');
    const snapShot = await loadMorePosts(
      state.pageNumber,
      state.perPage,
      state.totalPages
    );

    // REDUCER STATE ON FETCH POSTS
    dispatch({
      type: 'LOAD_MORE',
      payload: {
        posts: [...state.posts, ...snapShot.newPosts],
        // isPending: true,
        pageNumber: snapShot.newPageNumber,
        totalPages: state.totalPages,
        perPage: conf.perPage,
      },
    });
    // setPosts([...posts, ...snapShot.newPosts]);
    // setPageNumber(snapShot.newPageNumber);
    // Loading Spinner Starts
    setIsPending(false);
  };

  return (
    <BlogContext.Provider
      value={{
        // posts,
        // setPosts,
        handleDelete,
        handleLoadMore,
        // totalPages,
        // pageNumber,
        isPending,
        setIsPending,
        state,
        dispatch,
      }}
    >
      {props.children}
    </BlogContext.Provider>
  );
}

export default BlogContextProvider;
