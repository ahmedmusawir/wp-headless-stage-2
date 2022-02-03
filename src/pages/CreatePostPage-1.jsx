import React, { useContext } from 'react';
import Page from '../components/layouts/Page';
import { Row, Col } from 'react-bootstrap';
import Content from '../components/layouts/Content';
import Header from '../components/general/Header';
import CreatePost from '../components/CreatePost';
import { BlogContext } from '../context/BlogContext';

function CreatePostPage() {
  const { posts, setPosts, isPending, setIsPending } = useContext(BlogContext);

  return (
    <Page wide={true} pageTitle="Create Post">
      <Header />
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light mt-2 clearfix">
            <CreatePost
              posts={posts}
              setPosts={setPosts}
              isPending={isPending}
              setIsPending={setIsPending}
            />
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default CreatePostPage;
