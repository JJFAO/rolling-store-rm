import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProductCard extends Component {
  render() {
    const { id, name, brand, price } = this.props.product;

    const url = `https://firebasestorage.googleapis.com/v0/b/rolling-store-rm.appspot.com/o/products%2F${id}.png?alt=media`;

    return (
      <div className="product-card">
        <Link
          to={{
            pathname: `/product/${id}`,
            state: {
              product: this.props.product,
            },
          }}
        >
          <img src={url} alt={name} style={{ width: "100%" }} />
          <div className="product-card-info">
            <h6>{name}</h6>            
            <span style={{ color: "var(--primary)" }}>$ {price}</span>
            <p style={{ color: "var(--secondary)", fontSize: "1rem" }}>
              {brand}
            </p>
          </div>
        </Link>
      </div>
    );
  }
}

export default ProductCard;
