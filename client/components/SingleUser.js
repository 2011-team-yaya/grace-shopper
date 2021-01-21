import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleUser} from '../store/user'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import history from '../history'

class SingleUser extends Component {
  constructor(props) {
    super(props)

    this.deleteUser = this.deleteUser.bind(this)
  }

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
      <div id="all">
        <h1> Name: {name}</h1>
        <p>Email: {email}</p>
        <p>User is Admin: {isAdmin ? 'Yes' : 'No'}</p>
        <br />
        <div>
          <Link to={`/edituser/${id}`}>
            <button>Edit</button>
          </Link>
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
