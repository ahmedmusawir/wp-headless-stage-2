import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import WPAPI from 'wpapi';
import parse from 'html-react-parser';
import PostPagination from './general/PostPagination';
import NextPrevPagination from './general/NextPrevPagination';

function BlogIndex() {
  // Create WPAPI instance and add endpoint to /wp-json
  const wp = new WPAPI({
    endpoint: 'http://localhost:10004/wp-json',
    username: 'cgteam',
    password: '8gLw rmzE hQhZ av4L 1ljg x119',
  });

  const [posts, setPosts] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [pageNumber, setPageNumber] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage] = useState(5);

  const fetchPosts = async () => {
    try {
      // Loading Spinner Starts
      setIsPending(true);
      // Fetch posts
      console.log('Current Page:', pageNumber);
      const fetchedPosts = await wp.posts().perPage(perPage).page(1).get();
      console.log('First Page:', fetchedPosts);

      setTotalPages(fetchedPosts._paging.totalPages);
      setPosts(fetchedPosts);

      // Loading Spinner Ends
      setIsPending(false);
    } catch (e) {
      // print error
      console.log(e);
      return [];
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const deletePost = async (id) => {
    setIsPending(true);

    await wp
      .posts()
      .id(id)
      .delete()
      .then((res) => {
        console.log(res);
        setPosts(posts.filter((post) => post.id !== res.id));
        setIsPending(false);
      });
  };

  const loadMorePosts = async (pageNumber) => {
    // Loading Spinner Starts
    setIsPending(true);

    const request = wp.posts();
    // console.log('Request - loadMorePosts:', request);
    console.log('Current Pg - loadMorePosts:', pageNumber);

    if (pageNumber > 1) {
      request.perPage(perPage).page(pageNumber);
    }

    const newPosts = await request.get();
    console.log('New Posts - loadMorePosts:', newPosts);

    // Loading Spinner Starts
    setIsPending(false);

    return {
      newPosts,
      newPageNumber: totalPages > pageNumber ? pageNumber + 1 : null,
    };
  };
  const handleLoadmore = async () => {
    console.log('Handling Load More');
    const snapShot = await loadMorePosts(pageNumber);

    setPosts([...posts, ...snapShot.newPosts]);

    setPageNumber(snapShot.newPageNumber);
  };

  return (
    <div>
      <section className="list-group">
        {isPending && (
          <div className="text-center">
            {/* <Loader type="ThreeDots" color="red" height={100} width={100} /> */}
            {/* <Loader type="Watch" color="red" height={100} width={100} /> */}
            {/* <Loader type="RevolvingDot" color="red" height={100} width={100} /> */}
            {/* <Loader type="Puff" color="red" height={100} width={100} /> */}
            {/* <Loader type="Circles" color="red" height={100} width={100} /> */}
            {/* <Loader type="BallTriangle" color="red" height={100} width={100} /> */}
          </div>
        )}
        {posts &&
          posts.map((post) => (
            <article key={post.id} className="list-group-item">
              <div className="mb-2 row">
                <div className="col-sm-10">
                  <Link to={`/single-post/${post.id}`}>
                    <li className="list-group-item">
                      {parse(post.title.rendered)}{' '}
                      <span className="badge badge-primary">
                        Post ID: {post.id}
                      </span>
                    </li>
                  </Link>
                </div>
                <div className="col-sm-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => deletePost(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
      </section>
      {isPending && (
        <div className="text-center">
          <Loader type="ThreeDots" color="red" height={100} width={100} />
          {/* <Loader type="Watch" color="red" height={100} width={100} /> */}
          {/* <Loader type="Puff" color="red" height={50} width={50} /> */}
        </div>
      )}
      {totalPages > 1 && pageNumber && (
        <section className="loadmore text-center">
          <button className="btn btn-info mt-3" onClick={handleLoadmore}>
            Load More...
          </button>
        </section>
      )}
    </div>
  );
}

export default BlogIndex;
