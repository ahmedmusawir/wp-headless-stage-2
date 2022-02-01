import React, { useState, useRef } from 'react';
import Page from '../layouts/Page';
import Content from '../layouts/Content';
import { Row, Col } from 'react-bootstrap';

function FormBasic() {
  const [name, setName] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // FORM VALUE OBJECT
    const values = {
      userName: name,
      accept: isChecked,
      gender: gender,
      location: location,
      comment: comment,
    };
    // DISPLAY VALUE
    console.log('Form Values: ', values);
    // RESETTING THE FORM AFTER SUBMIT
    setName('');
    setIsChecked(false);
    setGender('');
    setLocation('');
    setComment('');
    // e.target.reset();
  };
  return (
    <Page wide={true} pageTitle="Form Basic">
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light">
            {/* DISPLAY BOX */}
            <div className="alert alert-primary">Name: {name}</div>
            <div
              className={
                isChecked ? 'alert alert-success' : 'alert alert-danger'
              }
            >
              Accept: {isChecked ? 'True' : 'False'}
            </div>
            <div className="alert alert-warning">Gender: {gender}</div>
            <div className="alert alert-info">Location: {location}</div>
            <div className="alert alert-dark">Comment: {comment}</div>
            {/* END DISPLAY BOX */}

            {/* SIMPLE FORM */}
            <form className="p-5 bg-light" onSubmit={handleSubmit}>
              {/* TEXT INPUT */}
              <div className="mb-2">
                <label htmlFor="userName" className="form-label">
                  User Name
                </label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="User Name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {/* CHECKBOX */}
              <div className="form-check pb-1 mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={isChecked}
                  id="flexCheckDefault"
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Accept Privacy Policy
                </label>
              </div>
              {/* RADIO BUTTONS */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  value="male"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === 'male'}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Male
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  value="female"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === 'female'}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Female
                </label>
              </div>
              <hr className="bg-primary" />
              {/* SELECT BOX */}
              <select
                name="locationSelect"
                className="form-control"
                aria-label="Default select example"
                onChange={(e) => setLocation(e.target.value)}
              >
                <option defaultValue="">Choose A Location</option>
                <option value="paris">Paris</option>
                <option value="kuala lumpur">KL</option>
                <option value="sarasota">Sarasota</option>
              </select>
              {/* TEXT AREA */}
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label mt-2"
                >
                  LEAVE A COMMENT
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <hr className="bg-primary" />
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
              <button className="btn btn-warning ml-1" type="reset">
                Reset
              </button>
            </form>
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default FormBasic;
