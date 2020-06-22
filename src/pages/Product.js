import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Layout } from 'antd'
import ProductInfo from '../components/ProductInfo'
import { addToCart } from '../actions'
import { getVisibleProducts } from '../reducers/products'
const { Content } = Layout

class Product extends Component {
  render() {
    const { product } = this.props.location.state
    const { addToCart } = this.props

    return(
      <Layout>
        <Content className="content">
          <ProductInfo
            product={product}
            onAddToCartClicked={() => addToCart(product.id)}
          />
        </Content>
      </Layout>
    )
  }
}

Product.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    // title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  })).isRequired,
  addToCart: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  products: getVisibleProducts(state.products)
})

export default connect(
  mapStateToProps,
  { addToCart }
)(Product)