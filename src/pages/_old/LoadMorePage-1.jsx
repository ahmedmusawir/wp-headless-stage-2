import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import WPAPI from 'wpapi';
import parse from 'html-react-parser';
import Page from '../components/layouts/Page';

function LoadMorePage() {
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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Loading Spinner Starts
        setIsPending(true);
        // Fetch posts
        console.log('Current Page:', pageNumber);
        const fetchedPosts = await wp.posts().perPage(perPage).page(1).get();
        console.log('First Page:', fetchedPosts);

        setPosts(fetchedPosts);
        setTotalPages(fetchedPosts._paging.totalPages);

        // Loading Spinner Ends
        setIsPending(false);
      } catch (e) {
        // print error
        console.log(e);
        return [];
      }
    };
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
    console.log('Request - loadMorePosts:', request);
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
    <Page wide={false} pageTitle="LoadMore Page">
      <section className="list-group">
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
        </div>
      )}
      {totalPages > 1 && pageNumber && (
        <section className="loadmore text-center">
          <button className="btn btn-info mt-3 mb-5" onClick={handleLoadmore}>
            Load More...
          </button>
        </section>
      )}
    </Page>
  );
}

export default LoadMorePage;
