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

/* ************ */
/* THEME BUTTONS */
/* ************ */
let theme = localStorage.getItem('theme')
const radioButtons = document.querySelectorAll('input')
const themeOneButton = document.querySelector('[data-theme-one]')
const themeTwoButton = document.querySelector('[data-theme-two]')
const themeThreeButton = document.querySelector('[data-theme-three]')

const enableFirstTheme = () => {
  localStorage.setItem('theme', 'first')
  themeOneButton.style.background = 'hsl(6, 63%, 50%)'
}

const disableFirstTheme = () => {
  themeOneButton.style.background = ''
}

const enableSecondTheme = () => {
  document.body.classList.add('light-grey__theme')
  localStorage.setItem('theme', 'second')
  themeTwoButton.style.background = 'hsl(25, 98%, 40%)'
}

const disableSecondTheme = () => {
  document.body.classList.remove('light-grey__theme')
  themeTwoButton.style.background = ''
}

const disableThirdTheme = () => {
  document.body.classList.remove('dark-violet__theme')
  themeThreeButton.style.background = ''
}

const enableThirdTheme = () => {
  document.body.classList.add('dark-violet__theme')
  localStorage.setItem('theme', 'third')
  themeThreeButton.style.background = 'hsl(176, 100%, 44%)'
}

switch (theme) {
  case 'first':
    enableFirstTheme()
    disableSecondTheme()
    disableThirdTheme()
    break
  case 'second':
    enableSecondTheme()
    disableFirstTheme()
    disableThirdTheme()
    break
  case 'third':
    enableThirdTheme()
    disableFirstTheme()
    disableSecondTheme()
    break
}

radioButtons.forEach(button => {
  button.addEventListener('click', () => {
    theme = localStorage.getItem('theme')

    switch (button.value) {
      case '0':
        enableFirstTheme()
        disableSecondTheme()
        disableThirdTheme()
        break
      case '1':
        enableSecondTheme()
        disableFirstTheme()
        disableThirdTheme()
        break
      case '2':
        enableThirdTheme()
        disableFirstTheme()
        disableSecondTheme()
        break
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
  if (previousOperand === '' || currentOperand === '') return
  if (previousOperand === '.' || currentOperand === '.') return
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
  if (number === '∞') {
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
  if (currentOperand === '' || currentOperand == '.') return
  if (previousOperand !== '') {
    previousOperand = operate()
    currentOperand = ''
    operator = op
  } else {
    operator = op
    previousOperand = currentOperand
    currentOperand = ''
  }
}
