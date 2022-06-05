const DomainModel = require('../models/Domain.model')

async function renderProfile(req, res) {
  const user = req.user

  if (user.isAdmin) {
    return res.render('adminProfile')
  }

  if (user.isCron) {
    // From 0 to ?
    const domainsCount = await DomainModel.countDocuments()

    res.render('cronProfile', {
      domainsCount
    })
  }
}

function logout(req, res) {
  req.logout()
  res.redirect('/auth/login')
}

module.exports = {
  renderProfile,
  logout
}