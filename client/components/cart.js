import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCartDb} from '../store/cart'
import {fetchProducts} from '../store/products'
export class Cart extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    // console.log(window.localStorage) ;
    // this.props.cart = JSON.parse( window.localStorage.getItem('cart') ) ;
    // console.log(this.state)
    this.props.fetchProducts()

    this.props.fetchCartDb(6) //find a way to put the orderId here
  }

  render() {
    if (this.props.user.id) {
      let cart = this.props.cart
      console.log(cart)
      return (
        <div className="all">
          <h1>{this.props.user.email}'s cart</h1>
          <ul>
            {cart.map(product => {
              let id = product.productId - 1
              //subtract 1 from product ID because array starts at 0 index.
              let currentProduct = this.props.products[id]
              let image = `../images/${currentProduct.imageURL}` || 'test'
              return (
                <li key={id}>
                  <div>
                    <div className="singlecartImage">
                      <Link
                        to={`/products/${currentProduct.id}`}
                        key={currentProduct.id}
                      >
                        <img src={image} />
                      </Link>
                    </div>

                    <p>
                      <Link
                        to={`/products/${currentProduct.id}`}
                        key={currentProduct.id}
                      >
                        {currentProduct.name}
                      </Link>
                    </p>
                    <p>{currentProduct.price}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )
    } else {
      let cart = JSON.parse(window.localStorage.getItem('cart'))
      if (!cart) return <div> your cart is currently empty </div>
      else
        return (
          <div className="all">
            <h1> guest cart </h1>
            <ul>
              {cart.map(product => {
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
                      <p>{product.price}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
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
    fetchCartDb: orderId => dispatch(fetchCartDb(orderId)),
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(Cart)
