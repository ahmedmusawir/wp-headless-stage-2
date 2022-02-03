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
import _ from 'lodash';

import 'animate.css';

function UpdatePost({ postId }) {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [oldImage, setOldImage] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { posts, setPosts } = useContext(BlogContext);

  console.log('CONTEXT POSTS IN UPDATE POST', posts);

  useEffect(() => {
    if (posts) {
      const singlePost = _.find(posts, (post) => post.id === Number(postId));
      setTitle(singlePost.title.rendered);
      setContent(singlePost.content.rendered);
      setOldImage(singlePost.featured_thumb);
    }
    // SETTING FILE SIZE MANUALLY
    // So that Joi validates in case user don't upload new image
    // If no new image is uploaded the file size won't validate by
    // Joi, cuz it's empty. It only gets file size when a file is
    // uploaded by the form. On the edit screen, the previous image
    // is loaded from the REST api
    setFileSize(500);
    // Collecting Data from Http Service
    const getSinglePost = async () => {
      const gotSinglePost = await fetchSinglePost(postId);
      console.log('Single Post', gotSinglePost);
      // Updating Post Data
      setTitle(gotSinglePost.title.rendered);
      setContent(gotSinglePost.content.rendered);
      setOldImage(gotSinglePost.featured_thumb);
    };

    if (posts === []) {
      getSinglePost();
    }
  }, [posts]);

  // console.log('UPDATE POST', post);

  useEffect(() => {
    // Loading Spinner Starts
    // setIsPending(true);
    //   // Updating Post Data
    // const quickSingle = async () => {
    //   await setTitle(post.title.rendered);
    //   await setContent(post.content.rendered);
    //   await setOldImage(post.featured_thumb);
    // };
    // quickSingle();
    // Collecting Data from Http Service
    // const getSinglePost = async () => {
    //   const gotSinglePost = await fetchSinglePost(postId);
    //   console.log('Single Post', gotSinglePost);
    //   // Updating Post Data
    //   setTitle(gotSinglePost.title.rendered);
    //   setContent(gotSinglePost.content.rendered);
    //   setOldImage(gotSinglePost.featured_thumb);
    // SETTING FILE SIZE MANUALLY
    // So that Joi validates in case user don't upload new image
    // If no new image is uploaded the file size won't validate by
    // Joi, cuz it's empty. It only gets file size when a file is
    // uploaded by the form. On the edit screen, the previous image
    // is loaded from the REST api
    // setFileSize(500);
    // };
    // getSinglePost();
    // Loading Spinner Ends
    // setIsPending(false);
  }, []);

  // FORM VALUE OBJECT

  const formValues = {
    title: title,
    content: content,
    imageUrl: imageUrl,
    fileSize: fileSize,
  };

  console.log('UPDATE POST - FORM VALUE', formValues);

  // JOI SCHEMA
  const schema = {
    title: Joi.string().trim().required().label('Title'),
    content: Joi.string().trim().required().label('Content'),
    // This the update page so no need for empty img validation
    imageUrl: Joi.empty(),
    fileSize: Joi.number().max(300000),
  };

  const doSubmit = async () => {
    // STARTING LOADING SPINNER
    setIsPending(true);

    // PERFORMING ACTUAL UPDATE
    const updatedPost = await updatePost(
      imageUrl,
      setImageUrl,
      postId,
      title,
      content
    );
    // setPosts({ ...posts, updatedPost });
    setPosts(
      posts.map((post) => {
        return post.id === updatedPost.id
          ? {
              ...post,
              title: {
                rendered: updatedPost.title,
              },
              content: {
                rendered: updatedPost.content,
              },
            }
          : post;
      })
    );

    console.log('UPDATED POST IN UPDATE POST', updatedPost);
    console.log('POSTS IN UPDATE POST', posts);

    // END LOADING SPINNER
    setIsPending(false);
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
                value={title}
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
                Create Now
              </button>
              {isPending && (
                <div className="text-center">
                  <Loader
                    type="ThreeDots"
                    color="red"
                    height={100}
                    width={100}
                  />
                </div>
              )}
            </FormJoi>
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

export default UpdatePost;
