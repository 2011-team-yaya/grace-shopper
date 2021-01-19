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
    allowNull: false,
    defaultValue: 'defaultcap.png'
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: `Create the perfect accessory by adding your embroidered designs to this classic trucker cap. It has a structured fit with a mesh back, and it's bound to become a favorite for all occasions.
    60% cotton, 40% polyester*
    Mid-profile cap with a low-profile embroidery area
    Structured, six-panel cap
    Hard buckram front panels
    Mesh back
    Permacurv visor, matching under-visor
    Plastic adjustable closure
    3.5″ crown (8.9 cm)
    Head circumference: 21⅝″–23⅝″ (54.9 cm–60 cm)`
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 100
  }
})

module.exports = Product
