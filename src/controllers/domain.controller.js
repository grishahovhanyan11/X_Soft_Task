const DomainModel = require('../models/Domain.model')

async function renderNewDomain(req, res) {
  res.render('newDomain', {
    userEmail: req.user.email
  })
}

async function addNewDomain(req, res) {
  try {
    const { domain } = req.body

    const existingDomain = await DomainModel.findOne({ name: domain })

    if (existingDomain) {
      return res.render('newDomain', {
        userEmail: req.user.email,
        validationInfo: 'This domain already have in DB'
      })
    }

    const newDomain = await DomainModel.create({ name: domain })

    res.redirect('/profile')

  } catch (e) {
    res.send(`
    <h1>Server side error</h1>
    <div>${e.message}</div>`)
    console.log(e.message)
  }
}

async function renderEdit(req, res) {
  res.send('edit page')
}

async function editDomain(req, res) {
  try {

  } catch (e) {
    res.send(`
    <h1>Server side error</h1>
    <div>${e.message}</div>`)
    console.log(e.message)
  }
}

async function deleteDomain(req, res) {
  try {

  } catch (e) {
    res.send(`
    <h1>Server side error</h1>
    <div>${e.message}</div>`)
    console.log(e.message)
  }
}


module.exports = {
  renderNewDomain,
  addNewDomain,
  renderEdit,
  editDomain,
  deleteDomain
}

