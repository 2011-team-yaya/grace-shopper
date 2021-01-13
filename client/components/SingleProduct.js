import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
// import {Link} from 'react-router-dom'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
    // console.log(this.props)
  }
  render() {
    const {
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
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleProduct: state.singleProduct
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleProduct: productId => dispatch(fetchSingleProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
