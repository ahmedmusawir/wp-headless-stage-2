import React, { useState, useContext, useEffect } from 'react';
import Page from '../components/layouts/Page';
import { Row, Col } from 'react-bootstrap';
import Content from '../components/layouts/Content';
import { useParams } from 'react-router-dom';
import BlogSingle from '../components/BlogSingle';
import { BlogContext } from '../context/BlogContext';
import { Link } from 'react-router-dom';

import 'animate.css';
import _ from 'lodash';

function SinglePostPage() {
  const { id } = useParams();
  const [post, setPost] = useState('');
  const { posts, isPending } = useContext(BlogContext);
  const postId = Number(id);

  useEffect(() => {
    const singlePost = _.find(posts, (post) => post.id === Number(id));
    setPost(singlePost);
  }, []);

  console.log('SINGLE POST PAGE:', post);
  return (
    <Page wide={true} pageTitle="Single Post">
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
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100 mx-auto" cssClassNames="bg-light">
            <BlogSingle
              postId={postId}
              post={post}
              setPost={setPost}
              isPending={isPending}
            />
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default SinglePostPage;
