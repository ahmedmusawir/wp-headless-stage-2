import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Page from './layouts/Page';
import { Row, Col } from 'react-bootstrap';
import Content from './layouts/Content';
import Loader from 'react-loader-spinner';
import parse from 'html-react-parser';
import { fetchSinglePost, updatePost } from '../services/HttpService';

function UpdatePost({ postId }) {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [oldImage, setOldImage] = useState('');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // Loading Spinner Starts
    setIsPending(true);

    // Collecting Data from Http Service
    const getSinglePost = async () => {
      const gotSinglePost = await fetchSinglePost(postId);

      console.log('Single Post', gotSinglePost);

      // Updating Post Data
      setTitle(gotSinglePost.title.rendered);
      setContent(gotSinglePost.content.rendered);
      setOldImage(gotSinglePost.featured_thumb);
    };

    getSinglePost();
    // Loading Spinner Ends
    setIsPending(false);
  }, []);

  const handleUpdate = async () => {
    // STARTING LOADING SPINNER
    setIsPending(true);

    // PERFORMING ACTUAL UPDATE
    await updatePost(imageUrl, setImageUrl, postId, title, content);

    // END LOADING SPINNER
    setIsPending(false);
    // SENDING USER TO BLOGINDEX PAGE
    history.push('/');
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
              onClick={handleUpdate}
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
