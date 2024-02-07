const customRadio = document.querySelectorAll('.custom-radio')
const inputs = document.querySelectorAll('input[name="theme"]')

inputs.forEach(input => {
  input.addEventListener('click', () => {
    if (input.checked === true) {
      console.log(input)
    }
  })
})
