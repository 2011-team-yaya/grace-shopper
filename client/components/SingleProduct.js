import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addToOrderProducts} from '../store/cart'
import {fetchSingleProduct, deleteProduct} from '../store/singleProduct'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import history from '../history'

class SingleProduct extends Component {
  // binding add to cart function //
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.addItemUser = this.addItemUser.bind(this)
  }
  // binding add to cart function //

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
  }
  handleClick(e) {
    if (this.props.user.id) {
      this.addItemUser(this.props.singleProduct.id, this.props.user.id)
    } else {
      this.addToCart(e.target.value)
      alert(`Item added to cart!`)
    }
    document.getElementById('added').innerHTML = 'Added!'
  }
  addItemUser(product, userId) {
    this.props.addToOrderProducts(product, userId)
  }
  /*adding to cart button*/
  addToCart(product) {
    product = JSON.parse(product)
    let cart = JSON.parse(window.localStorage.getItem('cart'))
    // we have already established a cart //
    if (cart) {
      let productMatch = cart.find(cartProduct => cartProduct.id === product.id)
      // if product is already in cart increment quantity
      if (productMatch) productMatch.quantity++
      // if product is not in cart
      else {
        product.quantity = 1
        cart.push(product)
      }
    }
    // cart has not been established, so make it //
    else {
      product.quantity = 1
      cart = [product]
    }
    // assign the cart on storage to cart made here //
    window.localStorage.setItem('cart', JSON.stringify(cart))
  }
  /*adding to cart button*/

  render() {
    if (this.props.singleProduct === null) {
      return 'error, this product no longer exists'
    } else {
      const {isAdmin} = this.props.user
      const userId = this.props.user.id

      const {
        id,
        name,
        imageURL,
        price,
        quantity,
        description
      } = this.props.singleProduct
      return (
        <div id="singleProductBox">
          <div className="singleProductImage">
            <img src={`../images/${imageURL}`} />
          </div>
          <div className="singleProductDetails">
            <h1>{name || 'Item Name'}</h1>
            <p>price: {price}</p>
            <p className="capDescription">{description}</p>

            {/*adding to cart button*/}
            <button
              value={JSON.stringify(this.props.singleProduct)}
              onClick={this.handleClick}
              type="submit"
            >
              ADD TO CART
            </button>
            <p id="added"></p>
          </div>
          <br />
          <br />
          {/*adding to cart button*/}

          {//renders Edit and Delete buttons if user is Admin
          isAdmin && (
            <div>
              <Link to={`/editproduct/${id}`}>
                <button type="submit">Edit</button>
              </Link>
              <br />
              <br />
              <button
                type="button"
                onClick={() => this.props.deleteProduct(id)}
              >
                Delete Item
              </button>
            </div>
          )}
        </div>
      )
    }
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
    fetchSingleProduct: productId => dispatch(fetchSingleProduct(productId)),
    addToOrderProducts: (productId, userId) =>
      dispatch(addToOrderProducts(productId, userId)),
    deleteProduct: productId => dispatch(deleteProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
