import React from 'react';
import Page from '../components/layouts/Page';
import { Row, Col } from 'react-bootstrap';
import Content from '../components/layouts/Content';
import Header from '../components/general/Header';
import WooCom from '../components/woocom/WooCom';

function WooComPage() {
  return (
    <Page wide={true} pageTitle="Sample Page">
      {/* <Header /> */}
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light mt-2 clearfix">
            <h3>WooCom Test Page</h3>
          </Content>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light mt-2 clearfix">
            <WooCom />
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default WooComPage;
