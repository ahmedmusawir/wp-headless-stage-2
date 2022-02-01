import React from 'react';
import Page from '../components/layouts/Page';
import { Row, Col } from 'react-bootstrap';
import Content from '../components/layouts/Content';
import Header from '../components/general/Header';
import FormikTest from '../components/general/FormikTest';

function FormikPage() {
  return (
    <Page wide={true} pageTitle="Sample Page">
      <Header />
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light mt-2 clearfix">
            <h3>The Formik Component Page</h3>
            <h5>With Yup Validation</h5>
          </Content>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light mt-2 clearfix">
            <FormikTest />
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default FormikPage;
