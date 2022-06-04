const { request } = require('http')
const nodemailer = require('nodemailer')

async function sendConfirmCodeToUserMail(mailAddress, code) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SENDER_MAIL,
      pass: process.env.SENDER_MAIL_PASS, // password from mail settings
    },
    tls: { rejectUnauthorized: false },
  })

  const info = await transporter.sendMail({
    from: process.env.SENDER_MAIL, // sender address
    to: mailAddress,
    subject: 'X-SOFT',
    text: 'Confirm code from X-SOFT',
    html: `
      <div style= 'text-align: center'>
        <b>Your confirm code: </b>
        <h1>${code}</h1>
      </div>
    `,
  })

  console.log('Mail sended [info]: ' + info.response)
}

module.exports = sendConfirmCodeToUserMail
