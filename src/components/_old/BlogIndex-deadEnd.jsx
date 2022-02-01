import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import WPAPI from 'wpapi';
import parse from 'html-react-parser';
import PostPagination from './general/PostPagination';

function BlogIndex() {
  // Create WPAPI instance and add endpoint to /wp-json
  const wp = new WPAPI({
    endpoint: 'http://localhost:10004/wp-json',
    username: 'cgteam',
    password: '8gLw rmzE hQhZ av4L 1ljg x119',
  });

  const [posts, setPosts] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [currentPage, setCurrentPage] = useState(() => 1);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage] = useState(5);

  const fetchPosts = async () => {
    console.log('Current Page in Fetch:', currentPage);
    try {
      // Loading Spinner Starts
      setIsPending(true);
      // Fetch posts
      console.log('Current Page:', currentPage);
      const fetchedPosts = await wp.posts().perPage(perPage).get();
      console.log('First Page:', fetchedPosts);
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

  const handleNextPage = async () => {
    const posts = await wp.posts().perPage(perPage).get();
    const nextPage = await posts._paging.next.get();
    console.log('Next Page Data in handleNext Event', nextPage);
    setPosts(nextPage);
  };

  const handlePrevPage = async () => {};

  return (
    <div>
      <section className="list-group">
        {isPending && (
          <div className="text-center">
            <Loader type="Puff" color="red" height={100} width={100} />
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
      <section className="pagination d-flex justify-content-between mt-3">
        <button className="btn btn-info" onClick={handlePrevPage}>
          Previous
        </button>
        <button className="btn btn-info" onClick={handleNextPage}>
          Next
        </button>
      </section>
    </div>
  );
}

export default BlogIndex;
