import React, {Component} from 'react'
import ProductForm from './ProductForm'
import {Link} from 'react-router-dom'
import Axios from 'axios'

export default class AddProduct extends Component {
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

  handleChange(event) {
    const value = event.target.value
    const name = event.target.name

    this.setState({
      [name]: value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    try {
      const {data} = await Axios.post('/api/products', this.state)
      alert(`Product ${data.name} has been added!`)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div>
        <br />
        <h1>Add Product Form</h1>
        <br />
        <br />
        <ProductForm
          {...this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <br />
        <br />
        <Link to="/">
          <button>Back to Shop</button>
        </Link>
      </div>
    )
  }
}
