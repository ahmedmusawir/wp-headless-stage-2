import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Page from './layouts/Page';
import { Row, Col } from 'react-bootstrap';
import Content from './layouts/Content';
import Loader from 'react-loader-spinner';
import parse from 'html-react-parser';
import WPAPI from 'wpapi';

function UpdatePost({ postId }) {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [oldImage, setOldImage] = useState('');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  var wp = new WPAPI({
    endpoint: 'http://localhost:10004/wp-json',
    username: 'cgteam',
    password: '8gLw rmzE hQhZ av4L 1ljg x119',
  });

  useEffect(() => {
    console.log('PostId via param:', postId);
    const fetchSinglePost = async () => {
      try {
        // Loading Spinner Starts
        setIsPending(true);
        // Fetch Single Post
        const singlePost = await wp.posts().id(postId).get();
        console.log('Single Post: ', singlePost);
        // setPost(singlePost);
        setTitle(singlePost.title.rendered);
        setContent(singlePost.content.rendered);
        setOldImage(singlePost.featured_thumb);

        // Loading Spinner Ends
        setIsPending(false);
      } catch (e) {
        // print error
        console.log(e);
        return [];
      }
    };
    fetchSinglePost();
  }, []);

  const handleInsertPost = async () => {
    let uploadedImage = '';
    let updatedPost = '';
    // STARTING LOADING SPINNER
    setIsPending(true);

    console.log('Image URL:', imageUrl);

    if (imageUrl) {
      try {
        // UPLOADING IMAGE
        uploadedImage = await wp.media().file(imageUrl).create({
          title: 'Image Loaded by React HeadLess',
          alt_text: 'an image of something awesome',
          caption: 'This is the caption text',
          description: 'More explanatory information',
        });

        console.log('Uploaded Image ID:', uploadedImage.id);
      } catch (error) {
        console.log('IMAGE UPLOAD ERROR: ', error);
      }
    } else {
      setImageUrl(null);
    }

    try {
      // CREATING NEW POST W FEATURED IMAGE
      updatedPost = await wp
        .posts()
        .id(postId)
        .update({
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

    console.log('Newly Created Post: ', updatedPost);
  };

  return (
    <Page wide={true} pageTitle="Movie Form">
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-75" cssClassNames="bg-light mt-2 mx-auto">
            <h3>Post Update Page</h3>
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
              value={parse(title)}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="file"
              name="featured-image"
              id="featured"
              className="form-control mb-3"
              onChange={(e) => {
                const [file] = e.target.files;
                const desktopImg = document.getElementById('desktop-img');
                if (file) {
                  desktopImg.src = URL.createObjectURL(file);
                  console.log('LOCAL IMAGE', desktopImg.src);
                }
                setImageUrl(e.target.files[0]);
              }}
            />
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
            <textarea
              name="content"
              id="content"
              cols="30"
              rows="10"
              className="form-control mb-3"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button
              className="btn btn-info btn-block btn-lg"
              onClick={handleInsertPost}
            >
              Update Now!
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

export default UpdatePost;
