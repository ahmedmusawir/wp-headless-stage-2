import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { Row, Col } from 'react-bootstrap';
import Content from '../components/layouts/Content';
import { fetchSinglePost } from '../services/HttpService';

function BlogSingle({ postId }) {
  const [post, setPost] = useState('');
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    // Loading Spinner Starts
    setIsPending(true);

    // Collecting Data from Http Service
    const getSinglePost = async () => {
      const gotSinglePost = await fetchSinglePost(postId);
      // Setting Single Post State
      setPost(gotSinglePost);
    };

    getSinglePost();
    // Loading Spinner Ends
    setIsPending(false);
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
