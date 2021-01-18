import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {Link} from 'react-router-dom'
import Axios from 'axios'

class SingleProduct extends Component {
  // binding add to cart function //
  constructor(props) {
    super(props)

    this.addToCart = this.addToCart.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
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
    else
      // cart has not been established, so make it //
      cart = [product]
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
    fetchSingleProduct: productId => dispatch(fetchSingleProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
