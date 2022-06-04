function numberFrom0To9() {
  return Math.floor(Math.random() * 9)
}

// Generate number from 000000 to 999999 [length = 6]
const codeLength = 6

function randomCode() {
  let code = ''
  for (let i = 0; i < codeLength; i++) {
    code += numberFrom0To9()
  }

  return code
}

module.exports = randomCode
