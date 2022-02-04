import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Content from './layouts/Content';
import Joi from 'joi-browser';
import Loader from 'react-loader-spinner';
import InputJoi from './form-joi/InputJoi';
import TextAreaJoi from './form-joi/TextAreaJoi';
import InputImageJoi from './form-joi/InputImageJoi';
import FormJoi from './form-joi/FormJoi';
import { insertPost } from '../services/HttpService';
import { BlogContext } from '../context/BlogContext';

import 'animate.css';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [errors, setErrors] = useState({});
  const [isInsertPending, setIsInsertPending] = useState(false);
  const history = useHistory();

  const { state, dispatch } = useContext(BlogContext);

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

  const doSubmit = async () => {
    // STARTING LOADING SPINNER
    setIsInsertPending(true);

    // DISPLAY SUBMIT VALUE
    console.log('FORM VALUES SUBMITTED: ', formValues);
    // STARTING LOADING SPINNER
    // setIsPending(true);
    // INSERT POST TO WP DB
    const insertedPost = await insertPost(formValues);
    console.log('INSERTED POST IN CREATE POST', insertedPost);

    // DATA ALTERED FOR LOCAL INSTANT FEEDBACK
    const createdSinglePost = {
      id: insertedPost.id,
      title: {
        rendered: insertedPost.title.rendered,
      },
      content: {
        rendered: insertedPost.content.rendered,
      },
      excerpt: {
        rendered: insertedPost.excerpt.rendered,
      },
      featured_full: insertedPost.featured_full,
      featured_thumb: insertedPost.featured_thumb,
    };

    // UPDATING THE CURRENT POSTS STATE
    dispatch({
      type: 'ADD_POST',
      payload: {
        post: createdSinglePost,
      },
    });

    // STOPPING LOADING SPINNER
    setIsInsertPending(false);

    // SENDING USER TO BLOGINDEX PAGE
    history.push('/');
  };

  return (
    <>
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
            <FormJoi
              data={formValues}
              schema={schema}
              setErrors={setErrors}
              doSubmit={doSubmit}
            >
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
              <InputImageJoi
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

              <button className="btn btn-primary mt-2" type="submit">
                Create Now
              </button>

              {isInsertPending && (
                <div className="text-center">
                  <Loader
                    type="Puff"
                    color="dodgerblue"
                    height={100}
                    width={100}
                  />
                </div>
              )}
            </FormJoi>
          </Content>
        </Col>
      </Row>
    </>
  );
}

export default CreatePost;
