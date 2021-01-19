import React from 'react'

const ProductForm = props => (
  <form onSubmit={props.handleSubmit}>
    <label htmlFor="name">Item Name:</label>
    <br />
    <input
      name="name"
      type="text"
      value={props.name}
      onChange={props.handleChange}
    />

    <br />
    <br />

    <label htmlFor="imageURL">Image URL:</label>
    <br />
    <input
      name="imageURL"
      type="text"
      value={props.imageURL}
      onChange={props.handleChange}
    />
    <br />
    <br />

    <label htmlFor="quantity">Quantity:</label>
    <br />
    <input
      name="quantity"
      type="text"
      value={props.quantity}
      onChange={props.handleChange}
    />
    <br />
    <br />

    <label htmlFor="description">Description:</label>
    <br />
    <input
      name="description"
      type="text"
      value={props.description}
      onChange={props.handleChange}
    />
    <br />
    <br />

    <label htmlFor="price">Price:</label>
    <br />
    <input
      name="price"
      type="text"
      value={props.price}
      onChange={props.handleChange}
    />
    <br />
    <br />

    <br />
    <br />
    <br />
    <button type="submit" disabled={props.name === ''}>
      Submit
    </button>
  </form>
)

export default ProductForm
