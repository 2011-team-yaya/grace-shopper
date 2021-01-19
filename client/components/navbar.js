import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const cartLink = `../images/cart.png`
const loginImage = `../images/account.png`

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div className="container">
    <h1 id="pageName">
      <div>[ ALL</div>CAPS ]
    </h1>
    <nav className="nav-bar">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <span title="Cart">
            <Link to="/cart">
              <img className="navBarImages" src={cartLink} />
            </Link>
          </span>
          <Link to="/products">Shop</Link>
          <Link to="/home">Home</Link>

          <span title="Logout">
            <a href="#" onClick={handleClick}>
              <img className="navBarImages" src={loginImage} />
            </a>
          </span>

          {isAdmin && <Link to="/adminhome">Admin</Link>}
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <span title="Cart">
            <Link to="/cart">
              <img className="navBarImages" src={cartLink} />
            </Link>
          </span>
          <Link to="/products">All Products</Link>
          <span title="Login">
            <Link to="/login">
              <img className="navBarImages" src={loginImage} />
            </Link>
          </span>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
