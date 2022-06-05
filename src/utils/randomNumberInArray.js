
function randomNumberIn(numbersArray) {
  const number = numbersArray[Math.floor(Math.random() * numbersArray.length)]

  // remove form array
  const indexOfNumber = numbersArray.indexOf(number)
  numbersArray.splice(indexOfNumber, 1)

  return number
}

module.exports = randomNumberIn
