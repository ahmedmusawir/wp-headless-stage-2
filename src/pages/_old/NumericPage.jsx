import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import WPAPI from 'wpapi';
import parse from 'html-react-parser';
import Page from '../components/layouts/Page';
import NumericPagination from '../components/general/NumericPagination';

function NumericPage() {
  // Create WPAPI instance and add endpoint to /wp-json
  const wp = new WPAPI({
    endpoint: 'http://localhost:10004/wp-json',
    username: 'cgteam',
    password: '8gLw rmzE hQhZ av4L 1ljg x119',
  });

  const [posts, setPosts] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage] = useState(5);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsPending(true);
        // Fetch posts
        const fetchedPosts = await wp.posts().perPage(perPage).get();
        console.log(fetchedPosts);

        setPosts(fetchedPosts);
        setTotalPages(fetchedPosts._paging.totalPages);
        setIsPending(false);
      } catch (e) {
        // print error
        console.log(e);
        return [];
      }
    }

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

  const handlePageChange = async (page) => {
    setIsPending(true);
    setCurrentPage(page);
    console.log('Current Page', page);

    const nextPage = await wp.posts().perPage(perPage).page(page);

    setPosts(nextPage);
    setIsPending(false);
  };

  return (
    <Page wide={false} pageTitle="LoadMore Page">
      <section className="list-group">
        {isPending && (
          <div className="text-center">
            <Loader type="Puff" color="red" height={100} width={100} />
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
      <NumericPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Page>
  );
}

export default NumericPage;
