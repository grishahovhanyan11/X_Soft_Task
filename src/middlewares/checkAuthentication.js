
function authenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login')
  }

  next()
}

function notAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/profile')
  }

  next()
}

module.exports = {
  authenticated,
  notAuthenticated,
}
