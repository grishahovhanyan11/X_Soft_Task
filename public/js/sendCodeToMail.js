let url
if (process.env.NODE_ENV !== 'production') {
  url = 'http://localhost:5000'
} else {
  url = 'heroku'
}

const yesButton = document.getElementById('send_code_btn')
let email = window.localStorage.getItem('email')

const emailFromHtml = document.getElementById('email-input')

yesButton.addEventListener('click', async () => {
  if (emailFromHtml && emailFromHtml.value !== '') {
    email = emailFromHtml.value
    window.localStorage.setItem('email', emailFromHtml.value)
  }
  debugger
  const response = await fetch(`${url}/auth/sendCode`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email
    })
  })

  debugger
  if (response.status !== 200) {
    alert('No user with such email.')
  }
})
