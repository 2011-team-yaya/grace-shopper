import Axios from 'axios'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleUser} from '../store/user'
import history from '../history'
import UserForm from './UserForm'

class EditUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      isAdmin: ''
    }

    this.formName = 'edit'
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchSingleUser(this.props.match.params.userId)

    this.setState({
      name: this.props.user.name,
      email: this.props.user.email,
      password: this.props.user.password,
      isAdmin: this.props.user.isAdmin
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
    const userId = this.props.user.id
    try {
      const {data} = await Axios.put(`/api/users/${userId}`, this.state)
      alert(`${data.name} has been updated`)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div>
        <br />
        <h1>Edit User Form</h1>
        <br />
        <br />
        <UserForm
          {...this.state}
          formName={this.formName}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
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

export default connect(mapState, mapDispatch)(EditUser)
