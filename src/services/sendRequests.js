const fetch = require('node-fetch')

const DomainModel = require('../models/Domain.model')
const randomNumberIn = require('../utils/randomNumberInArray')

async function sendRequests(count, user) {
  const allRequestsData = []

  // Fill array from 0 to domainsCount
  const domainsCount = await DomainModel.countDocuments()
  const numbers = Array.from(Array(domainsCount).keys())
  // numbers = [0, 1, 2, ..... , domainsCount ]

  for (let i = 0; i < count; i++) {
    const skip = randomNumberIn(numbers)

    // get random domain
    const domain = await DomainModel.findOne().skip(skip)
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
