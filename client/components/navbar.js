import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
const cartLink = `../images/cart.png`
const loginImage = `../images/account.png`
const Navbar = ({handleClick, isLoggedIn, isAdmin, cartCount}) => (
  <div className="container">
    <nav className="nav-bar">
      <h1 id="pageName">
        <div>[ ALL</div>CAPS ]
      </h1>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/products">Shop</Link>
          <Link to="/home">Home</Link>

          {isAdmin && <Link to="/adminhome">Admin</Link>}
          <span title="Logout">
            <a href="#" onClick={handleClick}>
              <img className="navBarImages" src={loginImage} />
            </a>
          </span>
          <span title="Cart">
            <Link to="/cart">
              <img className="navBarImages" src={cartLink} />
              {/* 
              {cartCount
                ? cartCount.reduce((accum, current) => {
                    return accum + current.order_products.quantity
                  }, 0)
                : 0} */}
            </Link>
          </span>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/products">Shop</Link>
          <Link to="/signup">Sign Up</Link>

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
    <hr />
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
