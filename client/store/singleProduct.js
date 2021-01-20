import axios from 'axios'
import history from '../history'

const SET_ONE_PRODUCT = 'SET_ONE_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

const setOneProduct = product => {
  return {
    type: 'SET_ONE_PRODUCT',
    product
  }
}

const deleteProductCreator = id => {
  return {
    type: DELETE_PRODUCT,
    id
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

export const deleteProduct = productId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${productId}`)
      dispatch(deleteProductCreator(productId))
      history.push('/products')
    } catch (error) {
      console.log(error)
    }
  }
}

export default function productsReducer(state = {}, action) {
  switch (action.type) {
    case SET_ONE_PRODUCT:
      return action.product
    case DELETE_PRODUCT:
      return action.id
    default:
      return state
  }
}
