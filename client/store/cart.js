import axios from 'axios'

const GET_CART = 'GET_CART'
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}
const addToCart = product => {
  return {
    type: ADD_ITEM_TO_CART,
    product
  }
}
const removeFromCart = product => {
  return {
    type: REMOVE_FROM_CART,
    product
  }
}
export const fetchCartDb = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/order_products/hello`)
      dispatch(getCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addToOrderProducts = (productId, userId) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `/api/order_products/${userId}/${productId}`
      )
      dispatch(addToCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}
export const removeOrderProducts = (userId, productId) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `api/order_products/deleteFromCart/${userId}/${productId}`
      )

      dispatch(removeFromCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const userPurchase = () => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/order_products/user/Purchase`)
      dispatch(getCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function cartReducer(cart = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.cart.products
    case ADD_ITEM_TO_CART:
      return [...cart.products, action.product]
    case REMOVE_FROM_CART:
      return [...cart.filter(product => product.id !== action.product)]
    default:
      return cart
  }
}
