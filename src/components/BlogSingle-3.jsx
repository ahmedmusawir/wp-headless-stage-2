import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import parse from 'html-react-parser';
import { Row, Col } from 'react-bootstrap';
import Content from '../components/layouts/Content';
import { useParams } from 'react-router-dom';
import { fetchSinglePost } from '../services/HttpService';

function BlogSingle({ postId, post, setPost, isPending }) {
  const { id } = useParams();

  // console.log('BLOG SINGLE POST', post);

  useEffect(() => {
    // Collecting Data from Http Service when the single post page
    // is refreshed. Otherwize the page crashes since post or
    // singlePost becomes empty
    if (post === undefined) {
      const getSinglePost = async () => {
        const gotSinglePost = await fetchSinglePost(id);
        setPost(gotSinglePost);
        // console.log('SINGLE POST (useEffect)', post);
      };
      getSinglePost();
    }
  }, [post]);

  return (
    <>
      {isPending && (
        <div className="text-center">
          <Loader type="ThreeDots" color="red" height={100} width={100} />
        </div>
      )}
      <section className="list-group">
        {post && (
          <>
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
    </>
  );
}

export default BlogSingle;
