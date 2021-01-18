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

router.get('/:orderId', async (req, res, next) => {
  try {
    const orderProducts = await Order_Products.findAll({
      where: {
        orderId: req.params.orderId
      }
    })
    res.json(orderProducts)
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

// router.put('/', async (req, res, next) => {
//   try {
//     const addedProduct = await Order_Products.update(req.body)
//     res.json(addedProduct)
//   } catch (err) {
//     next(err)
//   }
// })

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
