const emailInput = document.getElementById('email-input')
const submitButton = document.getElementById('submit-btn')

submitButton.addEventListener('click', () => {
  if (emailInput.value !== '') {
    window.localStorage.setItem('email', emailInput.value)
  }
})
