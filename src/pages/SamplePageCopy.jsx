import React from 'react';
import Page from '../components/layouts/Page';
import { Row, Col } from 'react-bootstrap';
import Content from '../components/layouts/Content';
import Header from '../components/general/Header';

function SamplePage() {
  return (
    <Page wide={true} pageTitle="Sample Page">
      <Header />
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light mt-2 clearfix">
            <h3>Moose Form</h3>
            <h5>JOI Validation</h5>
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default SamplePage;
