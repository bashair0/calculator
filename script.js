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

let operator = ''
let previousOperand = ''
let currentOperand = ''

let theme = localStorage.getItem('theme')
const radioButtons = document.querySelectorAll('input')

const enableSecondTheme = () => {
  document.body.classList.add('light-grey__theme')
  localStorage.setItem('theme', 'second')
}

const disableSecondTheme = () => {
  document.body.classList.remove('light-grey__theme')
}

const disableThirdTheme = () => {
  document.body.classList.remove('dark-violet__theme')
}

const enableThirdTheme = () => {
  document.body.classList.add('dark-violet__theme')
  localStorage.setItem('theme', 'third')
}

if (theme === 'second') {
  enableSecondTheme()
  disableThirdTheme()
} else if (theme === 'third') {
  enableThirdTheme()
  disableSecondTheme()
} else if (theme === null) {
  disableSecondTheme()
  disableThirdTheme()
}

radioButtons.forEach(button => {
  button.addEventListener('click', () => {
    theme = localStorage.getItem('theme')
    if (button.value == 0) {
      disableSecondTheme()
      disableThirdTheme()
      localStorage.setItem('theme', null)
    } else if (button.value == 1) {
      enableSecondTheme()
      disableThirdTheme()
    } else {
      enableThirdTheme()
      disableSecondTheme()
    }
  })
})

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
    return '∞'
  } else {
    return x / y
  }
}

function operate () {
  let x = parseFloat(previousOperand)
  let y = parseFloat(currentOperand)
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
    updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    handleOperator(button.innerText)
    updateDisplay()
  })
})

equalsButton.addEventListener('click', () => {
  getResult()
  updateDisplay()
  /* previousOperandTextElement.textContent = previousOperand
  currentOperandTextElement.textContent = currentOperand */
})

resetButton.addEventListener('click', () => {
  resetCalculator()
  updateDisplay()
})

deleteButton.addEventListener('click', () => {
  del()
  updateDisplay()
})

function getResult () {
  if (previousOperand === '' && currentOperand === '') return
  currentOperand = operate(
    operator,
    parseFloat(previousOperand),
    parseFloat(currentOperand)
  )
  previousOperand = ''
  operator = ''
}

function resetCalculator () {
  currentOperand = ''
  previousOperand = ''
  operator = ''
}

function del () {
  currentOperand = currentOperand.toString().slice(0, -1)
}

function appendNumber (number) {
  if (number === '.' && currentOperand.includes('.')) return
  if (currentOperand.length <= 7) {
    currentOperand = currentOperand.toString() + number.toString()
  }
}

function getDisplayNumber (number) {
  if (typeof number === 'string') {
    return number
  }
  const stringNumber = number.toString()
  const integerDigits = parseFloat(stringNumber.split('.')[0])
  const decimalDigits = stringNumber.split('.')[1]
  let integerDisplay
  if (isNaN(integerDigits)) {
    integerDisplay = ''
  } else {
    integerDisplay = integerDigits.toLocaleString('en', {
      maximumFractionDigits: 0
    })
  }
  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`
  } else {
    return integerDisplay
  }
}

function updateDisplay () {
  currentOperandTextElement.innerText = getDisplayNumber(currentOperand)
  if (operator != null) {
    previousOperandTextElement.innerText = `${getDisplayNumber(
      previousOperand
    )} ${operator} `
  } else {
    previousOperandTextElement.innerText = ''
  }
}

function handleOperator (op) {
  if (currentOperand === '') return
  if (previousOperand !== '') {
    previousOperand = operate()
    currentOperand = ''
    operator = op
    /* previousOperandTextElement.textContent = `${previousOperand} ${operator}`
    currentOperandTextElement.textContent = currentOperand */
  } else {
    operator = op
    previousOperand = currentOperand
    currentOperand = ''
  }
}
