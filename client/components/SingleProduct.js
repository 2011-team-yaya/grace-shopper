import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addToOrderProducts} from '../store/cart'
import {fetchSingleProduct} from '../store/singleProduct'
import {Link} from 'react-router-dom'
import Axios from 'axios'

class SingleProduct extends Component {
  // binding add to cart function //
  constructor(props) {
    super(props)

    this.addToCart = this.addToCart.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
    this.addItemUser = this.addItemUser.bind(this)
  }
  // binding add to cart function //

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
    // console.log(this.props)
  }
  addItemUser(product, userId) {
    this.props.addToOrderProducts(product, userId)
  }
  /*adding to cart button*/
  addToCart(product) {
    product = JSON.parse(product)
    let cart = JSON.parse(window.localStorage.getItem('cart'))
    // we have already established a cart, so just push to it //
    if (cart) cart.push(product)
    //if they already added the item to the cart, increment quantity
    // cart has not been established, so make it //
    else cart = [product]
    //first time they add this unique item, we need to set the quantity to 1
    // assign the cart on storage to cart made here //
    window.localStorage.setItem('cart', JSON.stringify(cart))
  }
  /*adding to cart button*/

  async deleteProduct(productId) {
    try {
      await Axios.delete(`/api/products/${productId}`)
      alert(`Product has been deleted. Please go back to Shop!`)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
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
        <h1>{name || 'Item Name'}</h1>
        <p>price: {price}</p>
        <p className="capDescription">{description}</p>

        <p>quantity available: {quantity === 0 ? 'Out of Stock' : quantity}</p>
        {/*adding to cart button*/}
        <button
          value={JSON.stringify(this.props.singleProduct)}
          onClick={
            this.props.user.id
              ? this.addItemUser(id, userId)
              : e => {
                  this.addToCart(e.target.value)
                }
          }
          type="submit"
        >
          {' '}
          Add To Cart{userId}
        </button>
        {'  '}
        <br />
        <br />
        {/*adding to cart button*/}

        {//renders Edit and Delete buttons if user is Admin
        isAdmin && (
          <div>
            <Link to={`/editproduct/${id}`}>
              <button>Edit</button>
            </Link>
            <br />
            <br />
            <button onClick={() => this.deleteProduct(id)}>Delete Item</button>
            <br />
            <br />
            <Link to="/">
              <button>Back to Shop</button>
            </Link>
          </div>
        )}
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
    fetchSingleProduct: productId => dispatch(fetchSingleProduct(productId)),
    addToOrderProducts: (productId, userId) =>
      dispatch(addToOrderProducts(productId, userId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
