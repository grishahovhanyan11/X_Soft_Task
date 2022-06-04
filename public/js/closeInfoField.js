const noButton = document.getElementById('no_btn')

noButton.addEventListener('click', () => {
  const div = document.querySelector('.info') // it will be only one 
  div.remove()
})
