import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Page from '../layouts/Page';
import Content from '../layouts/Content';
import { Row, Col } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import parse from 'html-react-parser';
import Joi from 'joi-browser';
import WPAPI from 'wpapi';

function FormJoi({ postId }) {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState('');
  const [oldImage, setOldImage] = useState('');
  const [isPending, setIsPending] = useState(false);

  // const history = useHistory();

  var wp = new WPAPI({
    endpoint: 'http://localhost:10004/wp-json',
    username: 'cgteam',
    password: '8gLw rmzE hQhZ av4L 1ljg x119',
  });

  useEffect(() => {
    const fetchSinglePost = async () => {
      // try {
      //   // Loading Spinner Starts
      //   setIsPending(true);
      //   // Fetch Single Post
      //   const singlePost = await wp.posts().id(324).get();
      //   console.log('Single Post: ', singlePost);
      //   // setPost(singlePost);
      //   setTitle(singlePost.title.rendered);
      //   setContent(singlePost.content.rendered);
      //   setOldImage(singlePost.featured_thumb);
      //   // Loading Spinner Ends
      //   setIsPending(false);
      // } catch (e) {
      //   // print error
      //   console.log(e);
      //   return [];
      // }
    };
    fetchSinglePost();
  }, []);

  const handleInsertPost = async () => {
    let uploadedImage = '';
    let updatedPost = '';
    // STARTING LOADING SPINNER
    // setIsPending(true);

    // console.log('Image URL:', imageUrl);

    // if (imageUrl) {
    //   try {
    //     // UPLOADING IMAGE
    //     uploadedImage = await wp.media().file(imageUrl).create({
    //       title: 'Image Loaded by React HeadLess',
    //       alt_text: 'an image of something awesome',
    //       caption: 'This is the caption text',
    //       description: 'More explanatory information',
    //     });

    //     console.log('Uploaded Image ID:', uploadedImage.id);
    //   } catch (error) {
    //     console.log('IMAGE UPLOAD ERROR: ', error);
    //   }
    // } else {
    //   setImageUrl(null);
    // }

    // try {
    //   // CREATING NEW POST W FEATURED IMAGE
    //   updatedPost = await wp
    //     .posts()
    //     .id(postId)
    //     .update({
    //       title: title,
    //       content: content,
    //       featured_media: uploadedImage.id,
    //       categories: [157, 30],
    //       tags: [374, 375],
    //       status: 'publish',
    //     });
    //   // POST CREATION SUCCESS
    //   setIsPending(false);
    //   // SENDING USER TO BLOGINDEX PAGE
    //   history.push('/');
    // } catch (error) {
    //   console.log('POST CREATION ERROR: ', error);
    // }

    console.log('Newly Created Post: ', updatedPost);
  };

  const schema = {
    title: Joi.string().required().label('Title'),
    content: Joi.string().required().label('Content'),
    imageUrl: Joi.object().required().label('Featured Image'),
    fileSize: Joi.number().max(100000),
  };

  const validate = (data) => {
    console.log('IMAGE OBJ IN VALIDATE:', data.imageUrl);
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;

    const errors = {};

    for (let item of error.details) {
      if (item.path == 'imageUrl') {
        item.message = 'Featued Image must be an Image File';
        errors[item.path[0]] = item.message;
      } else if (item.path == 'fileSize') {
        item.message = 'Featued Image must be smaller than 100 Kelobytes';
        errors[item.path[0]] = item.message;
      } else {
        errors[item.path[0]] = item.message;
      }
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('IMAGE URL: ', imageUrl);

    // CREATING THE FORM DATA OBJECT
    const data = {
      title: title,
      content: content,
      imageUrl: imageUrl,
      fileSize: fileSize,
    };

    // VALIDATING FORM DATA
    const errors = validate(data);

    // UPDATING ERRORS CONSTANT
    // Errors property should always be set to an object, never be null
    // Otherwise, it will error out - [Cannot read property of null ...]
    setErrors({ errors: errors || {} });
    console.log('ERRORS FROM HANDLE SUBMIT:', errors);
    // IF ERRORS FOUND RETURN
    if (errors) return;

    console.log('Submitted', data);
  };

  return (
    <Page wide={true} pageTitle="Movie Form">
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-75" cssClassNames="mt-2 mx-auto">
            <form onSubmit={handleSubmit} className="form">
              <label className="font-weight-bold" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter Title"
                className="form-control mb-3"
                value={parse(title)}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors['title'] && (
                <div className="alert alert-danger">{errors['title']}</div>
              )}

              <label className="font-weight-bold" htmlFor="featured-image">
                Featured Image:
              </label>
              <input
                type="file"
                name="imageUrl"
                id="featured"
                className="form-control mb-3"
                onChange={(e) => {
                  const [file] = e.target.files;
                  const desktopImg = document.getElementById('desktop-img');
                  if (file) {
                    desktopImg.src = URL.createObjectURL(file);
                    console.log('LOCAL IMAGE', desktopImg.src);
                  }
                  const currentFileSize = Number(e.target.files[0].size);
                  setImageUrl(e.target.files[0]);
                  setFileSize(currentFileSize);
                }}
              />
              {errors['imageUrl'] && (
                <div className="alert alert-danger">{errors['imageUrl']}</div>
              )}
              {errors['fileSize'] && (
                <div className="alert alert-danger">{errors['fileSize']}</div>
              )}

              <figure>
                {/* DISPLAY Featured Image</h6> */}
                <img
                  id="desktop-img"
                  src={oldImage}
                  alt=""
                  width={150}
                  height={150}
                />
              </figure>
              <label className="font-weight-bold" htmlFor="content">
                Content
              </label>
              <textarea
                name="content"
                id="content"
                placeholder="Enter Content"
                cols="30"
                rows="10"
                className="form-control mb-3"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              {errors['content'] && (
                <div className="alert alert-danger">{errors['content']}</div>
              )}

              <button
                className="btn btn-info btn-block btn-lg"
                onClick={handleSubmit}
              >
                Update Now!
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

export default FormJoi;
