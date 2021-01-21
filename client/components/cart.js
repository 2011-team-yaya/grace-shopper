import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  decrementCart,
  fetchCartDb,
  incrementCart,
  userPurchase,
  removeOrderProducts
} from '../store/cart'

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
    this.userPurchase = this.userPurchase.bind(this)

    this.guestPurchase = this.guestPurchase.bind(this)
  }
  componentDidMount() {
    this.props.fetchProducts()
    if (this.props.user.id) {
      this.props.fetchCartDb()
    }
  }
  removeFromUserCart(user, product) {
    this.props.removeProduct(user, product)
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

  userPurchase() {
    this.props.userPurchase()
  }

  guestPurchase() {
    window.localStorage.removeItem('cart')
  }

  loggedInCart(products) {
    let disable = products.length === 0
    let usrId = this.props.user.id
    let total = products
      .map(i => {
        return i.price * i.order_products.quantity
      })
      .reduce((current, accum) => {
        return accum + current
      }, 0)
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
                      id="quan"
                      onClick={() => {
                        this.props.decreaseQty(usrId, id)
                      }}
                    >
                      --
                    </button>
                    <button
                      type="button"
                      id="remove"
                      onClick={() => {
                        this.removeFromUserCart(usrId, id)
                      }}
                    >
                      remove
                    </button>
                    <button
                      type="button"
                      id="quan"
                      onClick={() => {
                        this.props.increaseQty(usrId, id)
                      }}
                    >
                      ++
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        <p>Order Total: $ {total}</p>
        <Link
          to={{
            pathname: '/checkout',
            state: {
              total
            }
          }}
        >
          <button type="submit" onClick={this.userPurchase} disabled={disable}>
            Go to Checkout
          </button>
        </Link>
      </div>
    )
  }

  guestCart() {
    let cart = JSON.parse(window.localStorage.getItem('cart'))
    if (!cart) return <div> your cart is currently empty </div>
    else {
      let total = cart
        .map(i => {
          return i.price * i.quantity
        })
        .reduce((current, accum) => {
          return accum + current
        }, 0)
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
          <p>Order Total: $ {total}</p>
          <a href="/login/">
            <button className="checkoutButton" type="submit">
              Log-In to Checkout
            </button>
          </a>
          <Link
            to={{
              pathname: '/checkout',
              state: {
                total
              }
            }}
          >
            <button
              className="checkoutButton"
              type="submit"
              onClick={this.guestPurchase}
            >
              Guest Checkout
            </button>
          </Link>
        </div>
      )
    }
  }

  render() {
    if (this.props.user.id) {
      let products = this.props.cart || []
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
    increaseQty: (user, product) => dispatch(incrementCart(user, product)),
    decreaseQty: (user, product) => dispatch(decrementCart(user, product)),
    fetchCartDb: () => dispatch(fetchCartDb()),
    fetchProducts: () => dispatch(fetchProducts()),
    removeProduct: (userId, productId) =>
      dispatch(removeOrderProducts(userId, productId)),
    userPurchase: () => dispatch(userPurchase())
  }
}

export default connect(mapState, mapDispatch)(Cart)
