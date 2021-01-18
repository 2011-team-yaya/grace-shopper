import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCartDb} from '../store/cart'
import {fetchProducts} from '../store/products'
import Cookies from 'js-cookie'

export class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.props.fetchCartDb()
  }
  componentDidMount() {
    // console.log(window.localStorage)
    // this.props.cart = JSON.parse( window.localStorage.getItem('cart') ) ;
    // console.log(this.state)
    // console.log(this.state.orderId, 'this.state.orderId')
    this.props.fetchProducts()
    this.props.fetchCartDb() //find a way to put the orderId here
  }

  render() {
    if (this.props.user.id) {
      let products = this.props.cart.products || []

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
                      <p>
                        Quantity Selected: {product.order_products.quantity}
                      </p>
                      <p>
                        Item Total:{' '}
                        {product.price * product.order_products.quantity}
                      </p>
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
    } else {
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
                        <div className="singlecartImage">
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
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(Cart)
