import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Page from './layouts/Page';
import { Row, Col } from 'react-bootstrap';
import Content from './layouts/Content';
import Loader from 'react-loader-spinner';
import wp from '../services/HttpService';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleInsertPost = async () => {
    let uploadedImage = '';
    let newPost = '';
    // STARTING LOADING SPINNER
    setIsPending(true);

    console.log('Image URL:', imageUrl);

    try {
      // UPLOADING IMAGE
      uploadedImage = await wp.media().file(imageUrl).create({
        title: 'Image Loaded by React HeadLess',
        alt_text: 'an image of something awesome',
        caption: 'This is the caption text',
        description: 'More explanatory information',
      });
    } catch (error) {
      console.log('IMAGE UPLOAD ERROR: ', error);
    }

    console.log('Uploaded Image ID:', uploadedImage.id);

    try {
      // CREATING NEW POST W FEATURED IMAGE
      newPost = await wp.posts().create({
        title: title,
        content: content,
        featured_media: uploadedImage.id,
        categories: [157, 30],
        tags: [374, 375],
        status: 'publish',
      });
      // POST CREATION SUCCESS
      setIsPending(false);
      // SENDING USER TO BLOGINDEX PAGE
      history.push('/');
    } catch (error) {
      console.log('POST CREATION ERROR: ', error);
    }

    console.log('Newly Created Post: ', newPost);
  };

  return (
    <Page wide={true} pageTitle="Movie Form">
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-75" cssClassNames="bg-light mt-2 mx-auto">
            <h3>Post Create Page</h3>
            <h5>This time with Image ...</h5>
          </Content>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-75" cssClassNames="mt-2 mx-auto">
            <input
              type="text"
              name="title"
              id="title"
              className="form-control mb-3"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="file"
              name="featured-image"
              id="featured-image"
              className="form-control mb-3"
              onChange={(e) => setImageUrl(e.target.files[0])}
            />
            <textarea
              name="content"
              id="content"
              cols="30"
              rows="10"
              className="form-control mb-3"
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button
              className="btn btn-info btn-block btn-lg"
              onClick={handleInsertPost}
            >
              Create Now!
            </button>
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
