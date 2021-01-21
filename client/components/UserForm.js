import React from 'react'
import {Link} from 'react-router-dom'

const UserForm = props => (
  <form onSubmit={props.handleSubmit}>
    <label htmlFor="name">User Name:</label>
    <br />
    <input
      name="name"
      type="text"
      value={props.name}
      onChange={props.handleChange}
    />

    <br />
    <br />

    <label htmlFor="email">Email:</label>
    <br />
    <input
      name="email"
      type="text"
      value={props.email}
      onChange={props.handleChange}
    />
    <br />
    <br />

    <label htmlFor="password">Password:</label>
    <br />
    <input
      name="password"
      type="text"
      value={props.password}
      onChange={props.handleChange}
    />
    <br />
    <br />

    <label htmlFor="isAdmin">User is Admin?:</label>
    <br />
    <select
      name="isAdmin"
      type="text"
      value={props.isAdmin}
      onChange={props.handleChange}
    >
      <option value="">Select...</option>
      <option value="true">Yes</option>
      <option value="false">No</option>
    </select>

    <br />
    <br />
    <button
      type="submit"
      disabled={
        props.name === '' ||
        props.email === '' ||
        props.password === '' ||
        props.isAdmin === ''
      }
    >
      {props.formName === 'edit' ? 'Save' : 'Submit'}
    </button>
    {'  '}
    <Link to="/users">
      <button>Back to List</button>
    </Link>
  </form>
)

export default UserForm
