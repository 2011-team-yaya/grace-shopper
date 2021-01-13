const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('Cart', {
  cartId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
})

module.exports = Cart
