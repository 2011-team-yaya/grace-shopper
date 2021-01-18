import Axios from 'axios'
import React, {Component} from 'react'
import ProductForm from './ProductForm'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {Link} from 'react-router-dom'

class EditProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      imageURL: '',
      quantity: '',
      description: '',
      price: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)

    this.setState({
      name: this.props.singleProduct.name,
      imageURL: this.props.singleProduct.imageURL,
      quantity: this.props.singleProduct.quantity,
      description: this.props.singleProduct.description,
      price: this.props.singleProduct.price
    })
  }

  handleChange(event) {
    const value = event.target.value
    const name = event.target.name

    this.setState({
      [name]: value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    const productId = this.props.singleProduct.id
    try {
      const {data} = await Axios.put(`/api/products/${productId}`, this.state)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div>
        <br />
        <h1>Edit Product Form</h1>
        <br />
        <br />
        <ProductForm
          {...this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <Link to="/">
          <button>Back to Shop</button>
        </Link>
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

export default connect(mapState, mapDispatch)(EditProduct)
