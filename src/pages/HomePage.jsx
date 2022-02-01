import React from 'react';
import Page from '../components/layouts/Page';
import Content from '../components/layouts/Content';
import { Row, Col } from 'react-bootstrap';
import BlogIndex from '../components/BlogIndex';
import Header from '../components/general/Header';

function HomePage() {
  return (
    <Page wide={true} pageTitle="HeadLess WP">
      <Header />
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light">
            <BlogIndex />
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default HomePage;
