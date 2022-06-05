const fetch = require('node-fetch')
const DomainModel = require('../models/Domain.model')

async function sendRequests(count, user) {
  const domains = await DomainModel.find().limit(count)
  // console.log(user)
  const allRequestsData = []

  for (let domain of domains) {
    const response = await fetch(domain.name, { method: 'OPTIONS' })

    const data = {
      status: response.status,
      statusText: response.statusText,
      requestDate: response.headers.get('date')
    }

    // Add new request info in db
    domain.requestsList.push({
      userId: user._id,
      ...data,
    })
    await domain.save()

    // Put in array to return all requests
    allRequestsData.push({
      url: response.url,
      ...data
    })
  }

  return allRequestsData
}

module.exports = sendRequests
