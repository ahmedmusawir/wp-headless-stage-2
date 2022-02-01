import React, { useEffect, useState } from 'react';
import Page from '../components/layouts/Page';
import Loader from 'react-loader-spinner';
import { Row, Col, Card } from 'react-bootstrap';
import Content from '../components/layouts/Content';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import { fetchPosts, conf } from '../services/HttpService';
import LoadMorePagination, {
  loadMorePosts,
} from '../components/general/LoadMorePagination';
import Masonry from 'react-masonry-css';
import './MasonryLayoutPage.scss';
import 'animate.css';

function MasonryLayoutPage() {
  const [posts, setPosts] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [pageNumber, setPageNumber] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage] = useState(conf.perPage);
  // MASONRY BREAKING POINT
  const breakpointColumnsObj = {
    default: 4,
    1500: 3,
    1100: 2,
    700: 1,
  };

  useEffect(() => {
    // Loading Spinner Starts
    setIsPending(true);

    // Collecting Data from Http Service
    const getPosts = async () => {
      const gotPosts = await fetchPosts();
      // Updating Posts
      setPosts(gotPosts);
      // Updating Total Pages
      setTotalPages(gotPosts._paging.totalPages);

      // Loading Spinner Ends
      setIsPending(false);
    };

    getPosts();
  }, []);

  const handleLoadmore = async () => {
    console.log('load more button clicked');
    // Loading Spinner Starts
    setIsPending(true);
    console.log('Handling Load More');
    const snapShot = await loadMorePosts(pageNumber, perPage, totalPages);
    setPosts([...posts, ...snapShot.newPosts]);
    setPageNumber(snapShot.newPageNumber);
    // Loading Spinner Starts
    setIsPending(false);
  };

  return (
    <Page wide={true} pageTitle="Movie Form" className="mb-5 mx-5">
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content
            width="w-100"
            cssClassNames="bg-light mt-2 d-flex justify-content-between"
          >
            <div className="text-block">
              <h1>Masonry Layout Page</h1>
              <h4>And Cards from React Bootstrap 5 ...</h4>
            </div>
            <div className="button-block">
              <Link
                to={'create-post'}
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
                  <Link to={`/single-post/${post.id}`}>
                    <Card>
                      <Card.Img variant="top" src={post.featured_full} />
                      <Card.Body>
                        <Card.Title>{parse(post.title.rendered)}</Card.Title>
                        <div className="card-text">
                          {parse(post.excerpt.rendered)}
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
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
        <LoadMorePagination onLoadMore={handleLoadmore} />
      )}
    </Page>
  );
}

export default MasonryLayoutPage;
