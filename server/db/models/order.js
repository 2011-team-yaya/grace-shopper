const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  userId: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false
  },
  isFulfulled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Order
