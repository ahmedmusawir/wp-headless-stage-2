import React from 'react';
import Page from '../layouts/Page';
import Content from '../layouts/Content';
import { Row, Col } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function FormikTest() {
  const initialValues = {
    userName: '',
    userEmail: '',
    accept: false,
    countries: [],
    gender: '',
    location: '',
    comment: '',
  };

  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm({ values: initialValues });
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required('Name is Required!'),
    userEmail: Yup.string()
      .email('Invalid Email Format')
      .required('Email is Required!'),
    accept: Yup.boolean().oneOf(
      [true],
      'Must accept our terms and conditions!'
    ),
    countries: Yup.array().min(1, 'Must choose at least one country'),
    gender: Yup.string().required('Must choose a Gender!'),
    location: Yup.string().required('Must choose a location!'),
    comment: Yup.string().required('Must Leave a comment!'),
    userFile: Yup.mixed().nullable().required('Must Load a File!'),
    // .test(
    //   'FILE_SIZE',
    //   'Uploaded file is too big.',
    //   (value) => !value || (value && value.size <= FILE_SIZE)
    // )
    // .test(
    //   'FILE_FORMAT',
    //   'Uploaded file has unsupported format.',
    //   (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    // ),
  });

  return (
    <Page wide={true} pageTitle="Movie Form">
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-secondary">
            <h4 className="p-3 text-light">
              Formik CANNOT HANDLE FILE UPLOAD INPUT
            </h4>
          </Content>
          <Content width="w-100" cssClassNames="bg-dark">
            {/* FORMIK FORM */}
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form className="p-3 bg-light formik-comp">
                {/* TEXT INPUT */}
                <div className="mb-2">
                  <label htmlFor="userName" className="form-label">
                    User Name
                  </label>

                  <Field
                    type="text"
                    name="userName"
                    id="userName"
                    placeholder="User Name"
                    className="form-control"
                  />

                  <ErrorMessage
                    name="userName"
                    component="div"
                    className="alert alert-danger"
                  />
                  <p className="text-muted">
                    This is a special one. See code to find out how the
                    is-invalid class was used. A lot of work just for a red
                    border & an exclamation mark in the input
                  </p>
                </div>
                {/* EMAIL INPUT */}
                <div className="mb-2">
                  <label htmlFor="userEmail" className="form-label">
                    User Email
                  </label>
                  <Field
                    type="text"
                    name="userEmail"
                    id="userEmail"
                    placeholder="User Email"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="userEmail"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <hr className="bg-primary" />
                {/* FILE INPUT */}
                {/* <div className="mb-2">
                  <label htmlFor="userEmail" className="form-label">
                    User Image
                  </label>
                  <Field
                    type="file"
                    name="userFile"
                    id="userFile"
                    placeholder="User File"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="userFile"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <hr className="bg-primary" /> */}

                {/* CHECKBOX */}
                <div className="form-check pb-1 mb-2">
                  <Field
                    name="accept"
                    className="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Accept Privacy Policy
                  </label>
                  <ErrorMessage
                    name="accept"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                {/* CHECKBOX GROUP */}
                <h6>Countries Visited:</h6>
                <div role="group" className="form-check pb-1 mb-2">
                  <Field
                    name="countries"
                    className="form-check-input"
                    type="checkbox"
                    id="countriesGroup1"
                    value="U.S.A."
                  />
                  <label className="form-check-label" htmlFor="countriesGroup1">
                    United States
                  </label>
                  <ErrorMessage
                    name="countries"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-check pb-1 mb-2">
                  <Field
                    name="countries"
                    className="form-check-input"
                    type="checkbox"
                    id="countriesGroup2"
                    value="Malaysia"
                  />
                  <label className="form-check-label" htmlFor="countriesGroup2">
                    Malaysia
                  </label>
                  <ErrorMessage
                    name="countries"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-check pb-1 mb-2">
                  <Field
                    name="countries"
                    className="form-check-input"
                    type="checkbox"
                    id="countriesGroup3"
                    value="India"
                  />
                  <label className="form-check-label" htmlFor="countriesGroup3">
                    India
                  </label>
                  <ErrorMessage
                    name="countries"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                {/* RADIO BUTTONS */}
                <h6>Choose a gender:</h6>
                <div className="form-check">
                  <Field
                    name="gender"
                    id="flexRadioDefault1"
                    type="radio"
                    className="form-check-input"
                    value="male"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Male
                  </label>
                </div>
                <div className="form-check">
                  <Field
                    name="gender"
                    id="flexRadioDefault2"
                    type="radio"
                    className="form-check-input"
                    value="female"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Female
                  </label>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <hr className="bg-primary" />
                {/* SELECT BOX */}
                <div className="mb-3">
                  <Field
                    as="select"
                    name="location"
                    className="form-control"
                    aria-label="Default Field example"
                  >
                    <option defaultValue="">Choose A Location</option>
                    <option value="paris">Paris</option>
                    <option value="kuala lumpur">KL</option>
                    <option value="sarasota">Sarasota</option>
                  </Field>
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                {/* TEXT AREA */}
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label mt-2"
                  >
                    LEAVE A COMMENT
                  </label>
                  <Field
                    as="textarea"
                    name="comment"
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></Field>
                  <ErrorMessage
                    name="comment"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <hr className="bg-primary" />
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
                <button
                  className="btn btn-warning ml-1"
                  type="reset"
                  //   onClick={() => formik.resetForm()}
                >
                  Reset
                </button>
              </Form>
            </Formik>
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default FormikTest;
