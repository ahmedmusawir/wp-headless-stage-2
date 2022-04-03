import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

function MainNavbar(props) {
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          React & WP
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/sample-page">
              Sample Page
            </Nav.Link>
            <Nav.Link as={Link} to="/formik-page">
              Formik Page
            </Nav.Link>
            <Nav.Link as={Link} to="/form-joi-page">
              Form Joi Page
            </Nav.Link>
            <Nav.Link as={Link} to="/woocom-page">
              Woocom
            </Nav.Link>
            <Nav.Link as={Link} to="/stripe-page">
              Stripe
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/form-moose-page">
              Form Moose Page
            </Nav.Link> */}
            {/* <Nav.Link as={Link} to="/nextprev">
              Next/Prev Pagination
            </Nav.Link>
            <Nav.Link as={Link} to="/numeric">
              Numeric Pagination
            </Nav.Link>
            <Nav.Link as={Link} to="/loadmore">
              Load More Pagination
            </Nav.Link>
            <Nav.Link as={Link} to="/masonry-layout">
              Masonry Layout
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

MainNavbar.propTypes = {};

export default MainNavbar;
