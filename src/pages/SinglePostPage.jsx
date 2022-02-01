import React, { useState } from 'react';
import Page from '../components/layouts/Page';
import { Row, Col } from 'react-bootstrap';
import Content from '../components/layouts/Content';
import { useParams } from 'react-router-dom';
import BlogSingle from '../components/BlogSingle';
import 'animate.css';
import Header from '../components/general/Header';

function SinglePostPage() {
  const { id } = useParams();
  // const [isPending, setIsPending] = useState(false);

  return (
    <Page wide={true} pageTitle="Single Post">
      <Header />
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100 mx-auto" cssClassNames="bg-light">
            <BlogSingle postId={id} />
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default SinglePostPage;
