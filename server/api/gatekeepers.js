const adminsOnly = (req, res, next) => {
  const currentUser = req.user
  if (currentUser && currentUser.isAdmin) {
    next()
  } else {
    const error = new Error('User is Not an Admin: Request Denied!')
    error.status = 401
    next(error)
  }
}

module.exports = {
  adminsOnly
}
