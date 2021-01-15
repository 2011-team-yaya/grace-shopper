const router = require('express').Router()
const {Order} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const product = await Order.findByPk(req.params.orderId)

    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
})

router.delete('/:orderId', async (req, res, next) => {
  try {
    await Order.destroy({
      where: {
        id: req.params.orderId
      }
    })

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.put('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.productId)

    await order.update(req.body)

    res.json(order)
  } catch (error) {
    next(error)
  }
})

module.exports = router
