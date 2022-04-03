import React, { useState } from 'react';
import axios from 'axios';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { Row, Col, Card, Button } from 'react-bootstrap';
import Content from '../layouts/Content';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import Masonry from 'react-masonry-css';
import './WooCom.scss';
import 'animate.css';

function WooCom() {
  // VARIABLES
  const [products, setProducts] = useState([]);
  // MASONRY BREAKING POINT
  const breakpointColumnsObj = {
    default: 4,
    1500: 3,
    1100: 4,
    700: 1,
  };

  // WOOCOM API SETUP
  const WooCommerce = new WooCommerceRestApi({
    url: 'http://localhost:10004/', // Your store URL
    consumerKey: 'ck_004f2ebf17300b34c764b5e041d75e3d17d91655', // Your consumer key
    consumerSecret: 'cs_7d668bcdae9cf03a3a17861adc57bf2d0095664c', // Your consumer secret
    version: 'wc/v3', // WooCommerce WP REST API version
  });

  // Custom interceptor to remove woocommerce custom User-Agent (not allowed in Chrome/Safari)
  axios.interceptors.request.use(function (config) {
    const { headers = {} } = config || {};
    if (headers['User-Agent']) delete config.headers['User-Agent'];

    return config;
  });

  const getProducts = () => {
    // FEATURED & NOT FEATURED (true/false)
    // WooCommerce.get('products?featured=true', {
    // BY CATEGORY (412 is featured)
    // WooCommerce.get('products?category=412,409', {
    // BY EXCLUDING CAT - HAD TO ADD FILTER FUNCTION ... CHECK functions.php
    // WooCommerce.get('products?category_exclude=412', {
    // BY EXCLUDING TAG - HAD TO ADD FILTER FUNCTION ... CHECK functions.php
    // WooCommerce.get('products?tag_exclude=413', {
    // BASIC PRODUCT
    WooCommerce.get('products?category=412,409', {
      // per_page: 5, // 20 products per page
    })
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div>
      <h3>Getting Products</h3>
      <button className="btn btn-lg btn-success pb-4" onClick={getProducts}>
        Get WooCom Products
      </button>
      <hr />
      <Row>
        <Content width="w-100" cssClassNames="mt-2">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {products &&
              products.map((product) => (
                <React.Fragment key={product.id}>
                  <Col
                    // key={product.id}
                    className="animate__animated animate__lightSpeedInRight"
                  >
                    <Card key={product.id}>
                      {/* <Link to={`/single-product/${product.id}`}> */}
                      <Card.Img variant="top" src={product.images[0].src} />
                      <Card.Body className="clearfix">
                        <Card.Title>{parse(product.name)}</Card.Title>
                        <div className="card-text">
                          {parse(product.short_description)}
                        </div>
                        <div className="alert alert-dark">
                          {product.categories[0].name}
                        </div>
                        <section className="badge badge-info pill p-2 float-right">
                          PRICE: ${product.price}
                        </section>
                      </Card.Body>
                      {/* </Link> */}
                      <Card.Footer className="text-danger">
                        Product Points:
                        {/* {product.meta_data[0].id} */}
                        {product.meta_data.map((acf) => {
                          return acf.key === 'product_points' ? (
                            <span className="font-weight-bold">
                              {' '}
                              {acf.value}
                            </span>
                          ) : null;
                        })}
                      </Card.Footer>
                    </Card>
                  </Col>
                </React.Fragment>
              ))}
          </Masonry>
        </Content>
      </Row>
    </div>
  );
}

export default WooCom;
