import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCartDb, removeOrderProducts} from '../store/cart'
import {fetchProducts} from '../store/products'
import Cookies from 'js-cookie'

export class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.props.fetchCartDb()
    this.loggedInCart = this.loggedInCart.bind(this)
    this.guestCart = this.guestCart.bind(this)
    this.removeFromUserCart = this.removeFromUserCart.bind(this)
    this.removeFromGuestCart = this.removeFromGuestCart.bind(this)
  }
  componentDidMount() {
    this.props.fetchProducts()
    if (this.props.user.id) {
      this.props.fetchCartDb()
    }
  }
  removeFromUserCart(user, product) {
    this.props.removeOrderProducts(user, product)
  }
  removeFromGuestCart(id) {
    let cart = JSON.parse(window.localStorage.getItem('cart'))
    console.log(cart, id)
    cart = cart.filter(product => {
      return product.id !== id
    })
    window.localStorage.setItem('cart', JSON.stringify(cart))
    this.forceUpdate()
  }
  loggedInCart(products) {
    let usrId = this.props.user.id
    return (
      <div id="loggedInCart">
        <div className="all">
          <h1>{this.props.user.email}'s cart</h1>
          <ul>
            {products.map(product => {
              let image = `../images/${product.imageURL}` || 'test'
              let id = product.id

              return (
                <li key={id}>
                  <div>
                    <div className="singleCartImage">
                      <Link to={`/products/${product.id}`} key={product.id}>
                        <img src={image} />
                      </Link>
                    </div>
                    <p>
                      <Link to={`/products/${product.id}`} key={product.id}>
                        {product.name}
                      </Link>
                    </p>
                    <p>Price: {product.price}</p>
                    <p>Quantity Selected: {product.order_products.quantity}</p>
                    <p>
                      Item Total:{' '}
                      {product.price * product.order_products.quantity}
                    </p>
                    <button
                      type="button"
                      id="remove"
                      onClick={() => {
                        this.removeFromUserCart(usrId, id)
                      }}
                    >
                      remove
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        <p>
          Order Total: $
          {products
            .map(i => {
              return i.price * i.order_products.quantity
            })
            .reduce((current, accum) => {
              return accum + current
            }, 0)}
        </p>
        <button type="submit">Go to Checkout</button>
      </div>
    )
  }

  guestCart() {
    let cart = JSON.parse(window.localStorage.getItem('cart'))
    if (!cart) return <div> your cart is currently empty </div>
    else
      return (
        <div id="guestCart">
          <div className="all">
            <h1> guest cart </h1>
            <ul>
              {cart.map(product => {
                // console.log(product)
                let image = `../images/${product.imageURL}`
                return (
                  <li key={product.id}>
                    <div>
                      <div className="singleCartImage">
                        <Link to={`/products/${product.id}`} key={product.id}>
                          <img src={image} />
                        </Link>
                      </div>

                      <p>
                        <Link to={`/products/${product.id}`} key={product.id}>
                          {product.name}
                        </Link>
                      </p>
                      <p>Price: {product.price}</p>
                      <p>Quantity Selected: {product.quantity}</p>
                      <p>Item Total: {product.price * product.quantity}</p>
                      <button
                        type="button"
                        id="remove"
                        onClick={() => {
                          this.removeFromGuestCart(product.id)
                        }}
                      >
                        remove
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          <p>
            Order Total: $
            {cart
              .map(i => {
                return i.price * i.quantity
              })
              .reduce((current, accum) => {
                return accum + current
              }, 0)}
          </p>
          <a href="/login/">
            <button type="submit">Please Log-In before Checkout</button>
          </a>
          <button type="submit">Checkout as a Guest</button>
        </div>
      )
  }

  render() {
    if (this.props.user.id) {
      let products = this.props.cart.products || []
      return this.loggedInCart(products)
    } else {
      return this.guestCart()
    }
  }
}

const mapState = state => {
  return {
    user: state.user,
    cart: state.cartReducer,
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCartDb: () => dispatch(fetchCartDb()),
    fetchProducts: () => dispatch(fetchProducts()),
    removeOrderProducts: (userId, productId) =>
      dispatch(removeOrderProducts(userId, productId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
