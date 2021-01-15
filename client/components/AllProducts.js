import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    let products = this.props.products
    return (
      <div className="all">
        <h1> Products </h1>
        <ul>
          {products.map(product => {
            let image = `../images/${product.imageURL}`
            return (
              <li key={product.id}>
                <div>
                  <div className="singleProductImage">
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

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
