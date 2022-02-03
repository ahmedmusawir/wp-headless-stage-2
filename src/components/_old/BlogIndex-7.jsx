import React, { useContext } from 'react';
import Loader from 'react-loader-spinner';
import { Row, Col, Card, Button } from 'react-bootstrap';
import Content from '../components/layouts/Content';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import LoadMorePagination from '../components/general/LoadMorePagination';
import { BlogContext } from '../context/BlogContext';
import Masonry from 'react-masonry-css';
import './BlogIndex.scss';
import 'animate.css';

function BlogIndex() {
  const {
    posts,
    handleDelete,
    handleLoadMore,
    totalPages,
    pageNumber,
    isPending,
  } = useContext(BlogContext);

  // console.log('CONTEXT POST IN BLOG INDEX: ', posts);

  // MASONRY BREAKING POINT
  const breakpointColumnsObj = {
    default: 4,
    1500: 3,
    1100: 2,
    700: 1,
  };

  return (
    <>
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content
            width="w-100"
            cssClassNames="bg-light mt-2 d-flex justify-content-between"
          >
            {/* THE FOLLOWING DIVS ARE FOR FLEX LAYOUT */}
            <div className="text-block">
              <h3>Blog Index w/ Masonry Layout</h3>
              <h5>And Cards from React Bootstrap 5 ...</h5>
            </div>
            <div className="button-block">
              <Link
                to={'create-post-page'}
                className="btn btn-info btn-lg px-5 py-4"
              >
                Create Post
              </Link>
            </div>
          </Content>
        </Col>
      </Row>
      <Row>
        <Content width="w-100" cssClassNames="mt-2">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {posts &&
              posts.map((post) => (
                <Col
                  key={post.id}
                  className="animate__animated animate__lightSpeedInRight"
                >
                  <Card>
                    <Link to={`/single-post/${post.id}`}>
                      <Card.Img variant="top" src={post.featured_full} />
                      <Card.Body>
                        <Card.Title>{parse(post.title.rendered)}</Card.Title>
                        <div className="card-text">
                          {parse(post.excerpt.rendered)}
                        </div>
                      </Card.Body>
                    </Link>
                    <Card.Footer className="text-muted">
                      <Button
                        variant="danger"
                        size="sm"
                        className="float-right"
                        onClick={() => handleDelete(post.id)}
                      >
                        Remove
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
          </Masonry>
        </Content>
      </Row>
      {isPending && (
        <div className="text-center">
          <Loader type="ThreeDots" color="red" height={100} width={100} />
        </div>
      )}
      {totalPages > 1 && pageNumber && (
        <LoadMorePagination onLoadMore={handleLoadMore} />
      )}
    </>
  );
}

export default BlogIndex;
