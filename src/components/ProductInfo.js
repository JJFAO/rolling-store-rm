import React, { Component, Fragment } from "react";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class ProductInfo extends Component {
  getPhoto(prodId) {
    return `https://firebasestorage.googleapis.com/v0/b/rolling-store-rm.appspot.com/o/products%2F${prodId}.png?alt=media`;
  }

  render() {
    const {
      name,
      brand,
      price,
      id,
      description,
      shippingTime,
      urls
    } = this.props.product;
    const { product, onAddToCartClicked } = this.props;
    console.log(this.props);
    
    
    return (
      <Fragment>
        <div className="productInfo">
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 8 }}>
              <div className="productInfo-imageContainer">
                <img
                  src={this.getPhoto(id)}
                  className="product-image"
                  style={{ width: "100%" }}
                  alt="product"
                />
              </div>
            </Col>
            <br />
            <Col xs={{ span: 24 }} lg={{ span: 16 }}>
              <div className="productInfo-description">
                <div>
                  <h4 style={{color: "var(--title)"}}>{name}</h4>
                  <h6 style={{color: "var(--text)"}}>{brand}</h6>
                  <Row>
                    <Col xs={{ span: 24 }} lg={{ span: 6 }}>
                      <p style={{ color: "var(--primary)" }}>
                        precio: {price}{" "}
                      </p>
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                      <p style={{ color: "var(--secondary)" }}>
                        llega en: {shippingTime}{" "}
                      </p>
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                      <Link
                        to={{
                          pathname: "/cart/",
                          state: { product },
                        }}
                      >
                        <Button
                          onClick={onAddToCartClicked}
                          style={{
                            backgroundColor: "var(--details)",
                            color: "white",
                            fontSize: "1.1rem",
                            height: "3rem",
                          }}
                        >
                          Agregar al carrito
                          <i className="fas fa-cart-plus"></i>
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </div>
                <br />
                <div
                  style={{
                    color: "var(--text)",
                  }}
                >
                  {description}
                </div>
                <Col>
                  <div className="productInfo-images">
                    <img src={urls.uno} alt="product" />
                    <img src={urls.dos} alt="product" />
                    <img src={urls.tres} alt="product" />
                    <img src={urls.cuatro} alt="product" />
                  </div>
                </Col>
              </div>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

ProductInfo.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    shippingTime: PropTypes.string.isRequired,
  }),
  onAddToCartClicked: PropTypes.func.isRequired,
};

export default ProductInfo;
