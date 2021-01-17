//middleware for admin only
const adminsOnly = (req, res, next) => {
  if (!req.user.isAdmin) {
    const error = new Error('User is Not an Admin: Request Denied!')
    error.status = 401
    return next(error)
  }
  next()
}

module.exports = {
  adminsOnly
}
