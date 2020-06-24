import shop from '../api/shop'
import { firebaseApp } from "../firebase";
import * as types from '../constants/ActionTypes'

const Products = firebaseApp.database().ref().child('products');

const fetchProducts = products => {
  return {
    type: types.FETCH_PRODUCTS,
    products
  }
}

export const getFetchedProducts = () => dispatch => {
  Products.on('value', snapshot => {
    dispatch(fetchProducts(snapshot.val()))
  })
}

const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products
})

export const getAllProducts = () => dispatch => {
  shop.getProducts(products => {
    dispatch(receiveProducts(products))
  })
}

const addToCartUnsafe = productId => ({
  type: types.ADD_TO_CART,
  productId
})

export const addToCart = productId => (dispatch, getState) => {
  if (getState().products.byId[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId))
  }
}

export const checkoutCart = (newShippingAddress, newCreditCard, newCustomer) => dispatch =>  {
  dispatch({
    type: types.CHECKOUT_CART,
    payload: {
      newShippingAddress,
      newCreditCard,
      newCustomer
    }
  })
}

export const checkout = products => (dispatch, getState) => {
  const { cart } = getState()

  dispatch({
    type: types.CHECKOUT_REQUEST
  })
  shop.buyProducts(products, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart
    })
    // Replace the line above with line below to rollback on failure:
    // dispatch({ type: types.CHECKOUT_FAILURE, cart })
  })
}