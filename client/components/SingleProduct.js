import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
// import {Link} from 'react-router-dom'

class SingleProduct extends Component {
  // binding add to cart function //
  constructor() {
    super()
    this.addToCart = this.addToCart.bind(this)
  }
  // binding add to cart function //

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
    // console.log(this.props)
  }

  /*adding to cart button*/
  addToCart(product) {
    product = JSON.parse(product)
    let cart = JSON.parse(window.localStorage.getItem('cart'))
    // we have already established a cart, so just push to it //
    if (cart) cart.push(product)
    // cart has not been established, so make it //
    else cart = [product]
    // assign the cart on storage to cart made here //
    window.localStorage.setItem('cart', JSON.stringify(cart))
  }
  /*adding to cart button*/

  render() {
    const userId = this.props.user.id
    const {
      name,
      imageURL,
      price,
      quantity,
      description
    } = this.props.singleProduct
    return (
      <div>
        <h1>{name || 'Item Name'}</h1>
        <div className="singleProductImage">
          <img src={`../images/${imageURL}`} />
        </div>
        <p className="capDescription">{description}</p>
        <p>price: {price}</p>
        <p>quantity available: {quantity}</p>
        {/*adding to cart button*/}
        <button
          value={JSON.stringify(this.props.singleProduct)}
          onClick={e => {
            this.addToCart(e.target.value)
          }}
          type="submit"
        >
          {' '}
          Add To Cart{userId}
        </button>
        {/*adding to cart button*/}
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleProduct: state.singleProduct,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleProduct: productId => dispatch(fetchSingleProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
