const DomainModel = require('../models/Domain.model')

async function renderNewDomain(req, res) {
  res.render('newDomain', {
    userEmail: req.user.email
  })
}

async function addNewDomain(req, res) {
  try {
    // domain === new domain name
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

async function renderDetails(req, res) {
  const { domainId } = req.params

  const domain = await DomainModel.findById(domainId).populate('requestsList.userId')

  // Put all test data 
  const domainTests = []

  for (let eachTest of domain.requestsList) {
    const test = {
      userEmail: eachTest.userId.email,
      status: eachTest.status,
      statusText: eachTest.statusText,
      requestDate: eachTest.requestDate
    }

    domainTests.push(test)
  }

  res.render('domainDetails', {
    userEmail: req.user.email,
    domain: {
      name: domain.name,
      id: domain._id
    },
    domainTests
  })
}

async function changeDomain(req, res) {
  try {
    // domain === new domain name
    const { domain } = req.body
    const { domainId } = req.params

    const domainFromDB = await DomainModel.findById(domainId)

    // Change name
    domainFromDB.name = domain
    // Empty requestsList 
    domainFromDB.requestsList = []
    await domainFromDB.save()

    res.redirect('/profile')

  } catch (e) {
    res.send(`
    <h1>Server side error</h1>
    <div>${e.message}</div>`)
    console.log(e.message)
  }
}

async function deleteDomain(req, res) {
  try {
    const { domainId } = req.params

    await DomainModel.deleteOne({ _id: domainId })

    res.redirect('/profile')
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
  renderDetails,
  changeDomain,
  deleteDomain
}

