import axios from 'axios'

const GET_CART = 'GET_CART'

const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

export const fetchCartDb = orderId => {
  return async dispatch => {
    try {
      console.log('fetchCartDb thunk')
      const {data} = await axios.get(`/api/order_products/${orderId}`)
      console.log(data, 'this is the result of axios call')
      dispatch(getCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function cartReducer(cart = [], action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return cart
  }
}
