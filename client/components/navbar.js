import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
const logo = `../images/logo.png`
const cartLink = `../images/cart.png`
const loginImage = `../images/account.png`
const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div className="container">
    <nav className="nav-bar">
      <div id="pageName">
        <span title="Logo">
          <Link to="/products">
            <img className="logo" src={logo} />
          </Link>
        </span>
      </div>
      {isLoggedIn ? (
        <div className="icons">
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Account</Link>

          {isAdmin && <Link to="/adminhome">Admin</Link>}
          <span title="Logout">
            <a href="#" onClick={handleClick}>
              <img className="navBarImages" src={loginImage} />
            </a>
          </span>
          <span title="Cart">
            <Link to="/cart">
              <img className="navBarImages" src={cartLink} />
            </Link>
          </span>
        </div>
      ) : (
        <div className="icons">
          {/* The navbar will show these links before you log in */}

          <span title="Login">
            <Link to="/login">
              <img className="navBarImages" src={loginImage} />
            </Link>
          </span>
          <span title="Cart">
            <Link to="/cart">
              <img className="navBarImages" src={cartLink} />
            </Link>
          </span>
        </div>
      )}
    </nav>
    {/* <hr /> */}
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin,
    cartCount: state.cartReducer
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
