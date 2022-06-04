const input = document.querySelector('#code-input')
const button = document.getElementById('submit-btn')

let isBtnDisabled = [...button.classList].reduce((acc, className) => {
  if (className === 'disabled-button') {
    acc = true
  }

  return acc
}, false)

function checkDisability() {
  if (isBtnDisabled) {
    button.disabled = true
  } else {
    button.disabled = false
  }
}

input.addEventListener('input', function () {
  if (this.value.length > this.maxLength) {
    // to block length
    this.value = this.value.slice(0, this.maxLength)
  } else {
    // able and disable button
    if (this.value.length === this.maxLength) {
      button.classList.remove('disabled-button')
      button.classList.add('confirm-button')
      isBtnDisabled = false
    } else {
      button.classList.remove('confirm-button')
      button.classList.add('disabled-button')
      isBtnDisabled = true
    }
  }

  checkDisability()
})
