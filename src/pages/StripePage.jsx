import React, { useState } from 'react';
import Page from '../components/layouts/Page';
import { Row, Col } from 'react-bootstrap';
import Content from '../components/layouts/Content';
import Header from '../components/general/Header';
import StripeContainer from '../components/stripe/StripeContainer';
import bugatti from '../img/bugatti-chiron.png';

function StripePage() {
  const [showItem, setShowItem] = useState(false);

  return (
    <Page wide={true} pageTitle="Sample Page">
      {/* <Header /> */}
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light mt-2">
            <h3>Stripe Page</h3>
          </Content>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light mt-2">
            <div className="App">
              <h1>The Bugatti Store</h1>
              {showItem ? (
                <StripeContainer />
              ) : (
                <div className="w-100">
                  <h3 className="mb-4 alert alert-info font-weight-bold w-100">
                    $49.99
                  </h3>
                  <img src={bugatti} alt="bugatti" className="" />
                  <button onClick={() => setShowItem(true)}>
                    Purchase Bugatti
                  </button>
                </div>
              )}
            </div>
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default StripePage;
