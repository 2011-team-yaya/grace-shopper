import axios from 'axios'

const SET_PRODUCTS = 'SET_PRODUCTS'

const setproducts = products => {
  return {
    type: SET_PRODUCTS,
    products
  }
}

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(setproducts(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function productsReducer(products = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    default:
      return products
  }
}
