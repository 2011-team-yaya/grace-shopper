import React, {Component} from 'react'
import UserForm from './UserForm'
import history from '../history'
import Axios from 'axios'

export default class AddUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      isAdmin: ''
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
      const {data} = await Axios.post('/api/users', this.state)
      alert(`User ${data.name} has been added!`)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div>
        <br />
        <h1>Add User Form</h1>
        <br />
        <br />
        <UserForm
          {...this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <br />
        <br />
      </div>
    )
  }
}
