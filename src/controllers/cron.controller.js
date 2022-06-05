
const sendRequests = require('../services/sendRequests')

async function doRequests(req, res) {
  try {
    const { count } = req.body

    const allRequestsData = await sendRequests(count, req.user)


    res.send(allRequestsData)
  } catch (e) {
    res.send(`
      <h1>Server side error</h1>
      <div>${e.message}</div>`
    )
    console.log(e.message)
  }
}

module.exports = {
  doRequests
}
