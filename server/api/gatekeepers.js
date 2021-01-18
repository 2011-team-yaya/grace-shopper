//middleware for admin only
// const adminsOnly = (req, res, next) => {
//   if (!req.user.isAdmin) {
//     const error = new Error('User is Not an Admin: Request Denied!')
//     error.status = 401
//     return next(error)
//   }
//   next()
// }

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
