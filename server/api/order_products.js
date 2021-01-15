const router = require('express').Router()
const {Product} = require('../db/models')
const {Order} = require('../db/models')
const {Order_Products} = require('../db/models')

//router.get()???

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

router.post('/', async (req, res, next) => {
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

router.put('/', async (req, res, next) => {
  try {
    addedProduct = await Order_Products.update(req.body)

    res.json(addedProduct)
  } catch (err) {
    next(err)
  }
})
