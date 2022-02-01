import React from 'react';
import Page from '../components/layouts/Page';
import { Row, Col } from 'react-bootstrap';
import Content from '../components/layouts/Content';
import MooseFormContainer from '../components/general/MooseFormContainer';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function MooseFormPage() {
  const handleAlert = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => alert('Click Yes'),
        },
        {
          label: 'No',
          onClick: () => alert('Click No'),
        },
      ],
    });
  };
  // confirmAlert({
  //   customUI: ({ onClose }) => {
  //     return (
  //       <div className="custom-ui">
  //         <h1>Are you sure?</h1>
  //         <p>You want to delete this file?</p>
  //         <button onClick={onClose}>No</button>
  //         <button
  //           onClick={() => {
  //             this.handleClickDelete();
  //             onClose();
  //           }}
  //         >
  //           Yes, Delete it!
  //         </button>
  //       </div>
  //     );
  //   },
  // });
  return (
    <Page wide={true} pageTitle="Sample Page">
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light mt-2 clearfix">
            <h3>Moose Form Page</h3>
            <h5>JOI Validation Coming soon...</h5>
          </Content>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light mt-2">
            <div className="container">
              <button onClick={handleAlert}>Confirm dialog</button>
            </div>
          </Content>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light mt-2">
            <MooseFormContainer />
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default MooseFormPage;
