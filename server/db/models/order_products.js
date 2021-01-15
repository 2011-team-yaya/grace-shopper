/* eslint-disable camelcase */
const Sequelize = require('sequelize')
const db = require('../db')

const Order_Products = db.define('order_products', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 10000
    }
  },
  snapshotPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 10000
    }
  }
})

module.exports = Order_Products
