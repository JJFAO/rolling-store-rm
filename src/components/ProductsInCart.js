import React, { Component } from "react";
import { Row, Col } from "antd";

class ProductsInCart extends Component {
  getPhoto(prodId) {
    return `https://firebasestorage.googleapis.com/v0/b/rolling-store-rm.appspot.com/o/products%2F${prodId}.png?alt=media`;
  }

  render() {
    const { products } = this.props;
    // let products =[{
    //   id: 2,
    //   name:"Asdad",
    //   brand:"asdas",
    //   price: 3333,
    //   quantity:2
    // },
    // {
    //   id: 2,
    //   name:"Asdad",
    //   brand:"asdas",
    //   price: 3333,
    //   quantity:2
    // }]
    return (
      <div className="productsIncart">
        <h3 style={{color: "var(--title)"}}>Productos en Carrito</h3>
        {products.map(({ name, brand, price, id, quantity }) => (
          <div style={{ margin: 20 }}>
            <Row>
              <Col xs={{span: 8}}>
                <img
                  src={this.getPhoto(id)}
                  style={{ width: "100px" }}
                  alt="product"
                />
              </Col>
              <Col xs={{span: 12}}>
                <h3 style={{color: "var(--text)", marginLeft:"2rem"}} >
                  {name} {brand}
                </h3>
                <h6 style={{color: "var(--primary)",marginLeft:"2rem"}}>
                  subtotal: {quantity} x ${price} = ${quantity * price}{" "}
                </h6>
              </Col>
            </Row>
          </div>
        ))}        
      </div>
    );
  }
}

export default ProductsInCart;
