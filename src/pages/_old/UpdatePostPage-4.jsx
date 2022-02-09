import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Page from '../components/layouts/Page';
import { Row, Col } from 'react-bootstrap';
import Content from '../components/layouts/Content';
import UpdatePost from '../components/UpdatePost';
import { BlogContext } from '../context/BlogContext';
import _ from 'lodash';

function UpdatePostPage() {
  const { id } = useParams();
  const { state, dispatch } = useContext(BlogContext);
  const postId = Number(id);

  const singlePost = _.find(state.posts, (post) => post.id === Number(id));

  console.log('state IN UPDATE POST PAGE', state);

  return (
    <Page wide={true} pageTitle="Sample Page">
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light mt-2 clearfix">
            <UpdatePost postId={postId} singlePost={singlePost} />
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default UpdatePostPage;
