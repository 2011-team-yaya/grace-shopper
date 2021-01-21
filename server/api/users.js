const router = require('express').Router()
const {User} = require('../db/models')
const {adminsOnly} = require('./gatekeepers')
module.exports = router

router.get('/', adminsOnly, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'name', 'email', 'isAdmin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', adminsOnly, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)

    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.post('/', adminsOnly, async (req, res, next) => {
  try {
    const email = req.body.email === '' ? undefined : req.body.email

    const password = req.body.password === '' ? undefined : req.body.password

    const googleId = req.body.googleId === '' ? undefined : req.body.googleId

    const isAdmin = req.body.isAdmin === '' ? undefined : req.body.isAdmin

    const newUser = await User.create({
      name: req.body.name,
      email: email,
      password: password,
      googleId: googleId,
      isAdmin: isAdmin
    })
    res.json(newUser)
  } catch (error) {
    next(error)
  }
})

//deleting user
router.delete('/:userId', adminsOnly, async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.userId
      }
    })

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

//updating user
router.put('/:userId', adminsOnly, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)

    await user.update(req.body)

    res.json(user)
  } catch (error) {
    next(error)
  }
})
