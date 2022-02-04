import React, { createContext, useState, useEffect, useReducer } from 'react';
import { fetchPosts, conf, deletePost } from '../services/HttpService';
import { loadMorePosts } from '../components/general/LoadMorePagination';
import { confirmAlert } from 'react-confirm-alert';
import { BlogReducer } from '../reducer/BlogReducer';

export const BlogContext = createContext();

function BlogContextProvider(props) {
  // SETTING UP REDUCER
  const initialState = {
    posts: [],
    isPending: true,
    pageNumber: 2,
    totalPages: 0,
    perPage: conf.perPage,
    isLoadMorePending: false,
  };
  const [state, dispatch] = useReducer(BlogReducer, initialState);

  useEffect(() => {
    // Collecting Data from Http Service
    const getPosts = async () => {
      const gotPosts = await fetchPosts();
      // REDUCER STATE ON FETCH POSTS
      dispatch({
        type: 'FETCH_POSTS',
        payload: {
          posts: gotPosts,
          isPending: false,
          totalPages: gotPosts._paging.totalPages,
          perPage: conf.perPage,
        },
      });
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
    // REDUCER STATE UPDATE FOR LOAD MORE SPINNER
    dispatch({
      type: 'LOAD_MORE',
      payload: {
        posts: state.posts,
        pageNumber: state.newPageNumber,
        perPage: conf.perPage,
        isLoadMorePending: true,
      },
    });
    // LOADING NEW PAGE
    const snapShot = await loadMorePosts(
      state.pageNumber,
      state.perPage,
      state.totalPages
    );

    // REDUCER STATE UPDATE FOR LOAD MORE
    dispatch({
      type: 'LOAD_MORE',
      payload: {
        posts: [...state.posts, ...snapShot.newPosts],
        pageNumber: snapShot.newPageNumber,
        perPage: conf.perPage,
        isLoadMorePending: false,
      },
    });
  };

  return (
    <BlogContext.Provider
      value={{
        handleDelete,
        handleLoadMore,
        state,
        dispatch,
      }}
    >
      {props.children}
    </BlogContext.Provider>
  );
}

export default BlogContextProvider;
