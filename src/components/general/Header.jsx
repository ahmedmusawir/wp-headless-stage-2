import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Content from '../layouts/Content';

function Header() {
  return (
    <Row className="justify-content-center">
      <Col sm={12}>
        <Content width="w-100" cssClassNames="bg-light mt-2">
          <h1>React CRUD w/ HeadLess WP </h1>
        </Content>
      </Col>
    </Row>
  );
}

export default Header;
