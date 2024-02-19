const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const resetButton = document.querySelector('[data-reset]')
const previousOperandTextElement = document.querySelector(
  '[data-previous-operand]'
)
const currentOperandTextElement = document.querySelector(
  '[data-current-operand]'
)

operator = ''
previousOperand = ''
currentOperand = ''

/* ********** */
/* FUNCTIONS */
/* ********** */

let add = (x, y) => {
  return x + y
}
let sub = (x, y) => {
  return x - y
}
let multi = (x, y) => {
  return x * y
}
let div = (x, y) => {
  if (y === 0) {
    return 'Error! Division by zero.'
  } else {
    return x / y
  }
}

function operate (operator, x, y) {
  switch (operator) {
    case '+':
      return add(x, y)
    case '-':
      return sub(x, y)
    case '×':
      return multi(x, y)
    case '÷':
      return div(x, y)
    default:
      return 'Invalid operator'
  }
}

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    appendNumber(button.innerText)
    currentOperandTextElement.textContent = currentOperand
  })
})

resetButton.addEventListener('click', () => {
  resetCalculator()
  currentOperandTextElement.textContent = currentOperand
  previousOperandTextElement.textContent = currentOperand
})

function resetCalculator () {
  currentOperand = ''
  previousOperand = ''
  operator = ''
}

function appendNumber (number) {
  if (number === '.' && currentOperand.includes('.')) return
  if (currentOperand.length <= 7) {
    currentOperand = currentOperand.toString() + number.toString()
  }
}
