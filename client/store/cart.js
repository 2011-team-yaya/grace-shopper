import axios from 'axios'

const GET_CART = 'GET_CART'
const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'

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
      console.log(data, 'addToOrderProducts')
      dispatch(addToCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function cartReducer(cart = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_ITEM_TO_CART:
      return [...cart, action.product]
    default:
      return cart
  }
}
