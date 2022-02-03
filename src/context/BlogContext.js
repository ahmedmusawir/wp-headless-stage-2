import React, { createContext, useState, useEffect } from 'react';
import {
  fetchPosts,
  fetchSinglePost,
  conf,
  deletePost,
} from '../services/HttpService';
import { loadMorePosts } from '../components/general/LoadMorePagination';
import { confirmAlert } from 'react-confirm-alert';
import { ToastContainer, toast } from 'react-toastify';

export const BlogContext = createContext();

function BlogContextProvider(props) {
  const [posts, setPosts] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [oldImage, setOldImage] = useState('');
  const [pageNumber, setPageNumber] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage] = useState(conf.perPage);

  useEffect(() => {
    // Loading Spinner Starts
    setIsPending(true);

    // Collecting Data from Http Service
    const getPosts = async () => {
      const gotPosts = await fetchPosts();
      // Updating Posts
      setPosts(gotPosts);
      // Updating Total Pages
      setTotalPages(gotPosts._paging.totalPages);

      // Loading Spinner Ends
      setIsPending(false);
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
            // Loading Spinner Starts
            setIsPending(true);
            // Post being deleted
            const deletedPost = await deletePost(postId);
            console.log('DELETED POST IN BLOG CONTEXT', deletedPost);
            // toast.error(deletedPost); // CANNOT HANDLE VARIABLES ONLY TEXT
            // UPDATING CURRENT POSTS STATE
            setPosts(posts.filter((post) => post.id !== postId));

            // Loading Spinner Ends
            setIsPending(false);
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
    console.log('load more button clicked');
    // Loading Spinner Starts
    setIsPending(true);
    console.log('Handling Load More');
    const snapShot = await loadMorePosts(pageNumber, perPage, totalPages);
    setPosts([...posts, ...snapShot.newPosts]);
    setPageNumber(snapShot.newPageNumber);
    // Loading Spinner Starts
    setIsPending(false);
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        setPosts,
        handleDelete,
        handleLoadMore,
        totalPages,
        pageNumber,
        isPending,
        setIsPending,
        oldImage,
        setOldImage,
      }}
    >
      {props.children}
    </BlogContext.Provider>
  );
}

export default BlogContextProvider;
