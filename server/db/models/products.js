const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: 'smth.png'
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER
  }
})

module.exports = Product
