import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Page from '../components/layouts/Page';
import { Row, Col } from 'react-bootstrap';
import Content from '../components/layouts/Content';
import WPAPI from 'wpapi';

function PostCreatePage() {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  var wp = new WPAPI({
    endpoint: 'http://localhost:10004/wp-json',
    username: 'cgteam',
    password: '8gLw rmzE hQhZ av4L 1ljg x119',
  });

  const handleInsertPost = async () => {
    // STARTING LOADING SPINNER
    setIsPending(true);
    console.log('TITLE: ', title);
    console.log('CONTENT: ', content);
    console.log('IMAGE: ', imageUrl);

    // UPLOADING IMAGE MEDIA
    const newImageId = await wp
      .media()
      .file(imageUrl)
      .create({
        title: 'My awesome image',
        alt_text: 'an image of something awesome',
        caption: 'This is the caption text',
        description: 'More explanatory information',
      })
      .then(function (response) {
        console.log('IMAGE: ', response);
        return response.id;
      });

    // CREATING THE POST
    await wp
      .posts()
      .create({
        title: title,
        featured_media: newImageId,
        content: content,
        status: 'publish',
      })
      .then(function (response) {
        console.log('PUBLISHED POST: ', response);
        setIsPending(false);
        history.push('/card-layout');
      });
  };

  return (
    <Page wide={true} pageTitle="Movie Form">
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light mt-2 text-center">
            <h1>Post Create Page</h1>
            <h4>This time with Image ...</h4>
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
      </Row>
    </Page>
  );
}

export default PostCreatePage;
