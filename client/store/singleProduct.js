import axios from 'axios'

const SET_ONE_PRODUCT = 'SET_ONE_PRODUCT'

const setOneProduct = product => {
  return {
    type: 'SET_ONE_PRODUCT',
    product
  }
}

export const fetchSingleProduct = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${productId}`)
      dispatch(setOneProduct(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function productsReducer(state = {}, action) {
  switch (action.type) {
    case SET_ONE_PRODUCT:
      return action.product
    default:
      return state
  }
}
