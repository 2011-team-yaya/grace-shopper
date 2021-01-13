import React from 'react'
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
      <div>
        <h1> Products </h1>
        <ul>
          {products.map(product => {
            return (
              <li key={product.id}>
                <div>
                  <p>
                    <Link
                      to={{
                        pathname: `/products/${product.id}`,
                        state: {
                          product
                        }
                      }}
                      key={product.id}
                    >
                      {product.image}{' '}
                    </Link>
                  </p>
                  <p>
                    <Link
                      to={{
                        pathname: `/products/${product.id}`,
                        state: {
                          product
                        }
                      }}
                      key={product.id}
                    >
                      {product.name}{' '}
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
