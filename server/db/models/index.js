/* eslint-disable camelcase */
const User = require('./user')
const Product = require('./products')
const Order = require('./order')
const Order_Products = require('./order_products')
const db = require('../db')

Order.belongsTo(User)
User.hasMany(Order)

Product.belongsToMany(Order, {
  through: Order_Products
})
Order.belongsToMany(Product, {
  through: Order_Products
})

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  db,
  Order_Products,
  Order
}
