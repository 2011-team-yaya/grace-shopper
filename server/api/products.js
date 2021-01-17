const router = require('express').Router()
const {Product} = require('../db/models')
const {adminsOnly} = require('./gatekeepers')

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)

    res.json(product)
  } catch (error) {
    next(error)
  }
})

//for administrator use only: POST, DELETE, PUT
router.post('/', adminsOnly, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
})

//deleting product
router.delete('/:productId', adminsOnly, async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.productId
      }
    })

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

//updating product
router.put('/:productId', adminsOnly, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)

    await product.update(req.body)

    res.json(product)
  } catch (error) {
    next(error)
  }
})

module.exports = router
