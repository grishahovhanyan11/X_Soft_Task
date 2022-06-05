const DomainModel = require('../models/Domain.model')

const sendRequests = require('../services/sendRequests')

async function renderProfile(req, res) {
  try {
    const user = req.user

    if (user.isAdmin) {
      const domains = await DomainModel.find().select('name _id')

      return res.render('adminProfile', {
        userEmail: user.email,
        domains
      })
    }

    if (user.isCron) {
      const domainsCount = await DomainModel.countDocuments()

      return res.render('cronProfile', {
        domainsCount,
        userEmail: user.email
      })
    }

    res.send('<h1>404 NOT FOUND</h1>')

  } catch (e) {
    res.send(`
    <h1>Server side error</h1>
    <div>${e.message}</div>`)
    console.log(e.message)
  }

}

async function doRequests(req, res) {
  try {
    let { count } = req.body

    if (count === '' || count === 0) {
      count = 1
    }

    const requestsData = await sendRequests(count, req.user)
    const domainsCount = await DomainModel.countDocuments()

    res.render('cronProfile', {
      userEmail: req.user.email,
      requestsData,
      domainsCount
    })

  } catch (e) {
    res.send(`
    <h1>Server side error</h1>
    <div>${e.message}</div>`
    )
    console.log(e.message)
  }
}

function logout(req, res) {
  req.logout()
  res.redirect('/auth/login')
}

module.exports = {
  renderProfile,
  doRequests,
  logout
}