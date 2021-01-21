import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/allusers'
import {Link} from 'react-router-dom'

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    let {users} = this.props

    return (
      <div className="all">
        <br />

        <Link to="/adduser">
          <button>Add New User</button>
        </Link>
        <br />
        <br />

        <br />
        <ul>
          {users.map(user => {
            return (
              <li key={user.id} className="allusers">
                <div>
                  <p>
                    <Link to={`/users/${user.id}`} key={user.id}>
                      <h3>Name: {user.name}</h3>
                    </Link>
                  </p>
                  <p>Email: {user.email}</p>
                  <p>User is Admin: {user.isAdmin ? 'Yes' : 'No'}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapState = state => {
  return {
    users: state.allusers
  }
}

const mapDispatch = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
