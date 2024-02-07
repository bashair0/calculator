const customRadio = document.querySelectorAll('.custom-radio')
const inputs = document.querySelectorAll('input[name="theme"]')
const buttons = document.querySelectorAll('button')
const result = document.querySelector('.result')

buttons.forEach(button => {
  button.addEventListener('click', () => {
    result.innerText += button.value
  })
})

/* inputs.forEach(input => {
  input.addEventListener('click', () => {
    if (input.checked === true) {
      console.log(input)
    }
  })
})
 */
