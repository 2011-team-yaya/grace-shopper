import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleUser} from '../store/user'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import history from '../history'

class SingleUser extends Component {
  // binding add to cart function //
  constructor(props) {
    super(props)

    this.deleteUser = this.deleteUser.bind(this)
  }
  // binding add to cart function //

  componentDidMount() {
    this.props.fetchSingleUser(this.props.match.params.userId)
  }

  async deleteUser(userId) {
    try {
      await Axios.delete(`/api/users/${userId}`)
      history.push('/users')
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const {id, name, email, isAdmin} = this.props.user

    return (
      <div id="singleProductBox">
        <h1> Name: {name}</h1>
        <p>Email: {email}</p>
        <p>User is Admin: {isAdmin ? 'Yes' : 'No'}</p>

        <div>
          <Link to={`/edituser/${id}`}>
            <button>Edit</button>
          </Link>
          <br />
          <br />
          <button onClick={() => this.deleteUser(id)}>Delete User</button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleUser: userId => dispatch(fetchSingleUser(userId))
  }
}

export default connect(mapState, mapDispatch)(SingleUser)
