import React from 'react';
import Page from '../components/layouts/Page';
import { Row, Col } from 'react-bootstrap';
import Content from '../components/layouts/Content';
import Header from '../components/general/Header';
import FormJoi from '../components/general/FormJoi';

function FormJoiPage() {
  return (
    <Page wide={true} pageTitle="Sample Page">
      {/* <Header /> */}
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light mt-2 clearfix">
            <h3>
              Moose Form <small>(Joi Validation)</small>
            </h3>
          </Content>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light mt-2 clearfix">
            <FormJoi />
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default FormJoiPage;
