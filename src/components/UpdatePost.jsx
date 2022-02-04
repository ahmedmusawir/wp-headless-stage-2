import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Page from './layouts/Page';
import { Row, Col } from 'react-bootstrap';
import Content from './layouts/Content';
import Loader from 'react-loader-spinner';
import parse from 'html-react-parser';
import Joi from 'joi-browser';
import InputJoi from './form-joi/InputJoi';
import TextAreaJoi from './form-joi/TextAreaJoi';
import InputImageJoi from './form-joi/InputImageJoi';
import FormJoi from './form-joi/FormJoi';
import { fetchSinglePost, updatePost } from '../services/HttpService';
import { BlogContext } from '../context/BlogContext';

import 'animate.css';

function UpdatePost({ postId, singlePost }) {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [oldImage, setOldImage] = useState('');
  const [errors, setErrors] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [isUpdatePending, setIsUpdatePending] = useState(false);
  const history = useHistory();

  const { state, dispatch } = useContext(BlogContext);

  // console.log('state IN UPDATE POST', state);

  useEffect(() => {
    // Collecting Data from Http Service (in case the page refreshed)
    const getSinglePost = async () => {
      const gotSinglePost = await fetchSinglePost(postId);
      console.log('Single Post', gotSinglePost);
      // Updating Post Data
      setTitle(gotSinglePost.title.rendered);
      setContent(gotSinglePost.content.rendered);
      setOldImage(gotSinglePost.featured_thumb);
    };

    if (singlePost) {
      setTitle(singlePost.title.rendered);
      setContent(singlePost.content.rendered);
      setOldImage(singlePost.featured_thumb);
    } else {
      getSinglePost();
    }

    // SETTING FILE SIZE MANUALLY
    // So that Joi validates in case user don't upload new image
    // If no new image is uploaded the file size won't validate by
    // Joi, cuz it's empty. It only gets file size when a file is
    // uploaded by the form. On the edit screen, the previous image
    // is loaded from the REST api
    setFileSize(500);
  }, [singlePost, postId]);

  // console.log('SINGLE ON UPDATE POST', singlePost);

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
    content: Joi.string().trim().required().label('Content'),
    // This the update page so no need for empty img validation
    imageUrl: Joi.empty(),
    fileSize: Joi.number().max(100000),
  };

  const doSubmit = async () => {
    // STARTING LOADING SPINNER
    setIsUpdatePending(true);

    // PERFORMING ACTUAL UPDATE
    const updatedPost = await updatePost(
      imageUrl,
      setImageUrl,
      postId,
      title,
      content
    );

    console.log('UPDATED HTTPS POST IN UPDATE POST', updatedPost);

    // UPDATING POSTS STATE
    const alteredSinglePost = {
      id: updatedPost.id,
      title: {
        rendered: title,
      },
      content: {
        rendered: content,
      },
      excerpt: {
        rendered: updatedPost.excerpt.rendered,
      },
      featured_full: updatedPost.featured_full,
      featured_thumb: updatedPost.featured_thumb,
    };

    dispatch({
      type: 'EDIT_POST',
      payload: {
        post: { ...alteredSinglePost },
        isPending: false,
        pageNumber: state.pageNumber,
        totalPages: state.totalPages,
        perPage: state.perPage,
      },
    });

    // POST UPDATE SUCCESS
    setIsUpdatePending(false);

    // SENDING USER TO BLOGINDEX PAGE
    history.push('/');
  };

  return (
    <Page wide={true} pageTitle="Movie Form">
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light mt-2 text-center">
            <h3>
              Post Update Page <small>with Image</small>
            </h3>
          </Content>
        </Col>
      </Row>
      {state.isPending && (
        <div className="text-center">
          <Loader type="ThreeDots" color="red" height={100} width={100} />
        </div>
      )}
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
                value={parse(title)}
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
                lastImage={oldImage}
              />

              {/* TEXT AREA */}
              <TextAreaJoi
                hideLabel={false}
                label="Insert Post Content"
                name="content"
                value={content}
                placeholder="Insert Post Content"
                className="form-control"
                rows={3}
                onChangeState={setContent}
                error={errors.content}
              />
              <hr className="bg-primary" />

              <button className="btn btn-primary mt-2" type="submit">
                UPDATE NOW
              </button>
              {isUpdatePending && (
                <div className="text-center">
                  <Loader type="Puff" color="red" height={100} width={100} />
                </div>
              )}
            </FormJoi>
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default UpdatePost;
