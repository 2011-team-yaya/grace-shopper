const router = require('express').Router()
const User = require('../db/models/user')
const {Order} = require('../db/models')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      const order = await Order.findOne({
        where: {userId: user.id, isFulfilled: false}
      })
      const currentOrderId = order.dataValues.id

      res.cookie('orderId', JSON.stringify(currentOrderId), {
        signed: false,
        httpOnly: true
      })

      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const {email, password, googleId} = req.body
    const user = await User.create({
      email,
      password,
      googleId
    })

    let newOrder = await Order.create()
    await newOrder.setUser(req.session.userId)

    // res.cookie('orderId', req.session.orderId, {signed: true, httpOnly: true})

    req.login(user, err => (err ? next(err) : res.json(user)))

    res.end()
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
