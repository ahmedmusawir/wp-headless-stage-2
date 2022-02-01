import React, { useState } from 'react';
import Page from './layouts/Page';
import { Row, Col } from 'react-bootstrap';
import Content from './layouts/Content';
import Joi from 'joi-browser';
import Loader from 'react-loader-spinner';
import { insertPost } from '../services/HttpService';
import { useHistory } from 'react-router-dom';
import InputJoi from './form-joi/InputJoi';
import TextAreaJoi from './form-joi/TextAreaJoi';
import InputImage from './form-joi/InputImage';
import 'animate.css';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [errors, setErrors] = useState({});
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  // FORM VALUE OBJECT
  const formValues = {
    title: title,
    content: content,
    imageUrl: imageUrl,
    fileSize: fileSize,
  };

  // JOI SCHEMA
  const schema = {
    title: Joi.string().trim().required().label('Title'),
    content: Joi.string().required().label('Content'),
    imageUrl: Joi.object().required().label('Featured Image'),
    fileSize: Joi.number().max(100000),
  };

  // VALIDATE ON SUBMIT
  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(formValues, schema, options);

    if (!error) return null;

    const errors = {};

    for (let item of error.details) {
      switch (item.path[0]) {
        case 'imageUrl':
          item.message = 'Must Upload a Featured Image';
          errors[item.path[0]] = item.message;
          break;

        case 'fileSize':
          item.message = 'Featued Image must be smaller than 100 Kelobytes';
          errors[item.path[0]] = item.message;
          break;

        default:
          errors[item.path[0]] = item.message;
          break;
      }
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // VALIDATING FORM DATA
    const errors = validate();
    // UPDATING ERRORS CONSTANT
    setErrors((prev) => errors || {});
    console.log('ERRORS IN HANDLE SUBMIT', errors);
    // IF ERRORS FOUND RETURN
    if (errors) return;

    // CALLING DO SUBMIT
    doSubmit();
  };

  const doSubmit = async () => {
    // DISPLAY SUBMIT VALUE
    console.log('FORM VALUES SUBMITTED: ', formValues);
    // STARTING LOADING SPINNER
    setIsPending(true);
    // INSERT POST TO WP DB
    await insertPost(formValues);
    // POST CREATION SUCCESS
    setIsPending(false);
    // SENDING USER TO BLOGINDEX PAGE
    history.push('/');
  };

  return (
    <Page wide={true} pageTitle="Movie Form">
      <Row>
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light mt-2 text-center">
            <h3>Post Create Page w/ Featured Image</h3>
          </Content>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content
            width="w-100"
            cssClassNames="mx-auto animate__animated animate__lightSpeedInRight"
          >
            {/* SIMPLE FORM */}
            <form className="bg-light" onSubmit={handleSubmit}>
              {/* INPUT JOI */}
              <InputJoi
                hideLabel={false}
                label="Title"
                type="text"
                name="title"
                placeholder="Post Title"
                className="form-control"
                onChangeState={setTitle}
                error={errors.title}
              />
              {/* IMAGE FILE INPUT */}
              <InputImage
                name="imageUrl"
                errors={errors}
                updateErrors={setErrors}
                updateImageUrl={setImageUrl}
                updateFileSize={setFileSize}
                className="form-control mb-3"
              />

              {/* TEXT AREA */}
              <TextAreaJoi
                hideLabel={false}
                label="Insert Post Content"
                name="content"
                placeholder="Insert Post Content"
                className="form-control"
                rows={3}
                onChangeState={setContent}
                error={errors.content}
              />

              <hr className="bg-primary" />
              <button className="btn btn-primary" type="submit">
                Create Now
              </button>
            </form>
          </Content>
        </Col>
        {isPending && (
          <div className="text-center">
            <Loader type="ThreeDots" color="red" height={100} width={100} />
          </div>
        )}
      </Row>
    </Page>
  );
}

export default CreatePost;
