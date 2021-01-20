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
  loggedInCart(products) {
    let usrId = this.props.user.id

    return (
      <div id="loggedInCart">
        <div className="all">
          <h1>{this.props.user.email}'s cart</h1>
          <ul>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th>price</th>
                  <th>qty</th>
                  <th>
                    line
                    <br /> total
                  </th>
                  <th></th>
                </tr>
              </thead>
              {products.map(product => {
                let image = `../images/${product.imageURL}` || 'no image'
                let id = product.id
                return (
                  <tbody key={product.name}>
                    <tr key={product.id}>
                      <td>
                        <Link to={`/products/${product.id}`} key={product.id}>
                          <img className="singleCartImage" src={image} />
                        </Link>
                      </td>
                      <td>
                        <Link to={`/products/${product.id}`} key={product.id}>
                          {product.name}
                        </Link>
                      </td>
                      <td>{product.price}</td>
                      <td>{product.order_products.quantity}</td>
                      <td>{product.price * product.order_products.quantity}</td>
                      <td>
                        <button
                          type="button"
                          id="remove"
                          onClick={() => {
                            this.removeFromUserCart(usrId, id)
                          }}
                        >
                          remove
                        </button>
                      </td>
                    </tr>
                  </tbody>
                )
              })}
            </table>
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
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th>price</th>
                    <th>qty</th>
                    <th>
                      line
                      <br /> total
                    </th>
                    <th></th>
                  </tr>
                </thead>
                {cart.map(product => {
                  let image = `../images/${product.imageURL}`
                  return (
                    <tbody key={product.id}>
                      <tr key="itemLine">
                        <td>
                          <Link to={`/products/${product.id}`} key={product.id}>
                            <img className="singleCartImage" src={image} />
                          </Link>
                        </td>
                        <td>
                          <Link to={`/products/${product.id}`} key={product.id}>
                            {product.name}
                          </Link>
                        </td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                        <td>{product.price * product.quantity}</td>
                        <td>
                          <button
                            type="button"
                            id="remove"
                            onClick={() => {
                              this.removeFromGuestCart(product.id)
                            }}
                          >
                            remove
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  )
                })}
              </table>
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
      let products = this.props.cart[0] || []
      // console.log(this.props.cart[0])
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
    removeProduct: (userId, productId) =>
      dispatch(removeOrderProducts(userId, productId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
