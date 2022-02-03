import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import WPAPI from 'wpapi';
import parse from 'html-react-parser';
import { Row, Col } from 'react-bootstrap';
import Content from './layouts/Content';

function BlogSingle({ postId }) {
  // Create WPAPI instance and add endpoint to /wp-json
  const wp = new WPAPI({
    endpoint: 'http://localhost:10004/wp-json',
    username: 'cgteam',
    password: '8gLw rmzE hQhZ av4L 1ljg x119',
  });

  const [post, setPost] = useState('');
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        // Loading Spinner Starts
        setIsPending(true);
        // Fetch Single Post
        const singlePost = await wp.posts().id(postId).get();
        console.log('Single Post: ', singlePost);
        setPost(singlePost);

        // Loading Spinner Ends
        setIsPending(false);
      } catch (e) {
        // print error
        console.log(e);
        return [];
      }
    };
    fetchSinglePost();
  }, []);

  return (
    <div>
      {isPending && (
        <div className="text-center">
          <Loader type="ThreeDots" color="red" height={100} width={100} />
        </div>
      )}
      <section className="list-group">
        {post && (
          <>
            <Row className="justify-content-center">
              <Col sm={12}>
                <Content
                  width="w-100"
                  cssClassNames="bg-light mt-2 d-flex justify-content-between"
                >
                  {/* THE FOLLOWING DIVS ARE FOR FLEX LAYOUT */}
                  <div className="text-block">
                    <h3>Single Post Page</h3>
                    <h5>And Cards from React Bootstrap 5 ...</h5>
                  </div>
                  <div className="button-block">
                    <Link
                      to={'/update-post-page/' + postId}
                      className="btn btn-info btn-lg px-5 py-4"
                    >
                      Edit Post
                    </Link>
                  </div>
                </Content>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12} lg={6}>
                {post.featured_full ? (
                  <figure>
                    <img
                      src={post.featured_full}
                      className="w-100 animate__animated animate__zoomIn"
                      alt=""
                    />
                  </figure>
                ) : (
                  <figure>
                    <img
                      src="https://picsum.photos/id/272/600/400"
                      className="w-100 animate__animated animate__zoomIn"
                      alt=""
                    />
                  </figure>
                )}
              </Col>
              <Col sm={12} md={12} lg={6}>
                <h1 className="">{parse(post.title.rendered)} </h1>
                <span className="badge badge-primary">Post ID: {post.id}</span>
                <hr className="bg-primary" />
                <span className="mt-3 clearfix">
                  {parse(post.content.rendered)}{' '}
                </span>
              </Col>
            </Row>
          </>
        )}
      </section>
    </div>
  );
}

export default BlogSingle;
