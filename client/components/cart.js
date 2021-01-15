import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Cart extends React.Component {
  //   componentDidMount() {
  //     console.log(window.localStorage) ;
  //     this.props.cart = JSON.parse( window.localStorage.getItem('cart') ) ;
  //   }

  render() {
    let cart = JSON.parse(window.localStorage.getItem('cart'))
    console.log(cart)
    if (!cart) return <div> your cart is currently empty </div>
    else
      return (
        <div className="all">
          <h1> cart </h1>
          <ul>
            {cart.map(product => {
              let image = `../images/${product.imageURL}`
              return (
                <li key={product.id}>
                  <div>
                    <p>
                      <div className="singlecartImage">
                        <Link to={`"/products/${product.id}`} key={product.id}>
                          <img src={image} />
                        </Link>
                      </div>
                    </p>
                    <p>
                      <Link to={`"/products/${product.id}`} key={product.id}>
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
