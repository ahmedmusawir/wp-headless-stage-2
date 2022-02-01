import React, { useEffect, useState } from 'react';
import Page from '../components/layouts/Page';
import Loader from 'react-loader-spinner';
import { Row, Col, Card } from 'react-bootstrap';
import Content from '../components/layouts/Content';
import parse from 'html-react-parser';
import { fetchPosts, conf } from '../services/HttpService';
import LoadMorePagination, {
  loadMorePosts,
} from '../components/general/LoadMorePagination';

function CardLayoutPage() {
  const [posts, setPosts] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [pageNumber, setPageNumber] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage] = useState(conf.perPage);

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
    <Page wide={true} pageTitle="Movie Form" className="mb-5">
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light">
            <h1>Card Layout Page</h1>
            <h4>React Bootstrap 5 ...</h4>
          </Content>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4">
        {posts &&
          posts.map((post) => (
            <Col key={post.id}>
              <Card className="mb-3">
                <Card.Img variant="top" src={post.featured_full} />
                <Card.Body>
                  <Card.Title>{parse(post.title.rendered)}</Card.Title>
                  {/* <Card.Text>{post.excerpt.rendered}</Card.Text> */}
                  <div className="card-text">
                    {parse(post.excerpt.rendered)}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
      {/* </div> */}
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

export default CardLayoutPage;
