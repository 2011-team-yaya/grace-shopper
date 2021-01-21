import React from 'react'

const CheckOut = props => {
  const {total} = props.location.state

  return (
    <div>
      <p>Your Order is Confirmed</p>
      <p>Your purchase was for: ${total}</p>
    </div>
  )
}

export default CheckOut
