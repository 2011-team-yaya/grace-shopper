/* eslint-disable camelcase */
const router = require('express').Router()
const {Product} = require('../db/models')
const {Order} = require('../db/models')
const {Order_Products} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const allOrderProducts = await Order_Products.findAll()
    res.json(allOrderProducts)
  } catch (error) {
    console.log(error)
  }
})
//better route
router.get('/:anything', async (req, res, next) => {
  try {
    if (req.user) {
      const orderProducts = await Order.findOne({
        where: {
          userId: req.user.id,
          isFulfilled: false
        },
        include: Product
      })
      res.json(orderProducts)
    } else {
      res.json('guest does not yet have an order in db')
    }
  } catch (error) {
    next(error)
  }
})
router.post('/:orderId', async (req, res, next) => {
  try {
    const orderProduct = await Order_Products.create(req.body)
    res.json(orderProduct)
  } catch (error) {
    next(error)
  }
})

router.delete('/:orderId', async (req, res, next) => {
  try {
    await Order_Products.destroy({
      where: {
        id: req.params.orderId
      }
    })

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.put('/deleteFromCart/:userId/:productId', async (req, res, next) => {
  try {
    let order = await Order.findOne({
      where: {
        isFulfilled: false,
        userId: req.params.userId
      }
    })
    let productInOrder = await Order_Products.findOne({
      where: {
        productId: req.params.productId,
        orderId: order.id
      }
    })
    productInOrder
      ? await productInOrder.destroy()
      : new Error('product is not in cart')
    res.send(req.params.productId)
  } catch (err) {
    next(err)
  }
})

// practice route --> for adding to logged in user's cart //
router.put('/:userId/:productId', async (req, res, next) => {
  // console.log('put request')
  try {
    let unfullfilledOrder = await Order.findOne({
      where: {
        isFulfilled: false,
        userId: req.params.userId //should be req.session.userId
      }
    })
    let productInOrder = await Order_Products.findOne({
      where: {
        productId: req.params.productId,
        orderId: unfullfilledOrder.id
      }
    })
    productInOrder
      ? await productInOrder.increment('quantity')
      : await unfullfilledOrder.addProduct(req.params.productId)
    res.send(req.body)
  } catch (err) {
    next(err)
  }
})

module.exports = router
