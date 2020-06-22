import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkout } from "../actions";
import { 
  getTotal,
  getCartProducts,
  getInfoCustomer,
  getInfoShippingAddress,
  getInfoCreditCard
} from "../reducers";
import { Layout, Row, Col} from 'antd';
import ProductsInCart from '../components/ProductsInCart';
import CartDetails from '../components/CartDetails';
import { Link } from 'react-router-dom'

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creditCard: '',
      shippingAddress: ''
    }
  }

  render() {
    const { customer, shippingAddress, creditCard, products } = this.props
    
    return(
      <Layout>
        <Link to={{ pathname: "/" }}>
            ¿Seguir comprando? Volver a la tienda
          </Link>
          <p> Carrito de: {customer} </p>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <ProductsInCart products={products} />
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <CartDetails
                shippingAddress={shippingAddress}
                creditCard={creditCard}
              />
              
            </Col>
          </Row>
      </Layout>
    )
  }
}

Cart.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
  })).isRequired,
  total: PropTypes.string,
  checkout: PropTypes.func
}

const mapStateToProps = state => ({
  products: getCartProducts(state),
  total: getTotal(state),
  customer: getInfoCustomer(state),
  shippingAddress: getInfoShippingAddress(state),
  creditCard: getInfoCreditCard(state)
})

export default connect(
  mapStateToProps,
  { checkout }
)(Cart)