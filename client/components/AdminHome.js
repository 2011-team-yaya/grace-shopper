import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const AdminHome = props => {
  const {name} = props

  return (
    <div>
      <h3>Welcome Admin {name}</h3>
      <Link to="/products">
        <button>Edit Products</button>
      </Link>
      <br />
      <br />
      <Link to="/addproduct">
        <button>Add New Product</button>
      </Link>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    name: state.user.name
  }
}

export default connect(mapState)(AdminHome)

/**
 * PROP TYPES
 */
AdminHome.propTypes = {
  name: PropTypes.string
}
