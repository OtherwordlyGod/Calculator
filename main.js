let firstNumber = '';
let secondNumber = '';
let operator = '';
let result = '0';

const operators = ['+', '-', '*', '/'];

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return Math.round((a * b + Number.EPSILON) * 100) / 100;
}

function divide(a, b) {
    if (b === 0) return "Error";
    return Math.round((a / b + Number.EPSILON) * 100) / 100;
}

function operate(numOne, numTwo, operator) {
    switch (operator) {
        case '+': return add(numOne, numTwo);
        case '-': return subtract(numOne, numTwo);
        case '*': return multiply(numOne, numTwo);
        case '/': return divide(numOne, numTwo);
        default: return 0;
    }
}

function display() {
    const display = document.querySelector('.display');
    display.textContent = result.length > 10 ? result.slice(0, 10) : result;
}

function evaluateNumber(input) {
    const clicked = input;
    if (operator !== '') {
        secondNumber += clicked;
        result += clicked;
    } else {
        if (result === '0') {
            firstNumber = clicked;
            result = clicked;
        } else {
            firstNumber += clicked;
            result += clicked;
        }
    }
}

function evaluateOperator(input) {
    const operatorText = input;
    if (result !== '0' && firstNumber !== '' && operator === '') {
        operator = operatorText;
        result += operator;
    }
}

function equals() {
    if (firstNumber && secondNumber) {
        const num1 = Number(firstNumber);
        const num2 = Number(secondNumber);
        result = operate(num1, num2, operator).toString();
        firstNumber = result;
        secondNumber = '';
        operator = '';
    }
}

function clear() {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    result = '0';
}

function sign() {
    if (operator && secondNumber) {
        secondNumber = (-Number(secondNumber)).toString();
        result = `${firstNumber}${operator}${secondNumber}`;
    } else if (!operator && firstNumber) {
        firstNumber = (-Number(firstNumber)).toString();
        result = firstNumber;
    }
}

function decimal(input) {
  const buttonText = input;
  
  if (firstNumber !== '' && !firstNumber.includes('.')) {
    firstNumber += buttonText;
    result += buttonText;
  } else if (secondNumber !== '' && !secondNumber.includes('.')) {
    secondNumber += buttonText;
    result += buttonText;
  }
  
};

function backspace() {
    if (secondNumber) {
        secondNumber = secondNumber.slice(0, -1);
    } else if (operator) {
        operator = '';
    } else if (firstNumber) {
        firstNumber = firstNumber.slice(0, -1);
    }
    result = result.slice(0, -1) || '0';
}

function keyPress(event) {
    if (!isNaN(event.key)) {
        evaluateNumber(event.key);
    } else if (operators.includes(event.key)) {
        evaluateOperator(event.key);
    } else if (event.key === 'Enter') {
        equals();
    } else if (event.key === 'Backspace') {
        backspace();
    } else if (event.key === '.') {
        decimal(event.key);
    }
    display();
}

const buttons = document.querySelector('.buttons');

buttons.addEventListener('click', (event) => {
    if (event.target.classList.contains('number')) {
      
        evaluateNumber(event.target.textContent);
      
    } else if (event.target.classList.contains('operator-button')) {
      
        evaluateOperator(event.target.textContent);
      
    } else if (event.target.classList.contains('equals')) {
      
        equals();
      
    } else if (event.target.id === 'decimal') {
      
        decimal('.');
      
    } else if (event.target.id === 'ac') {
      
        clear();
      
    } else if (event.target.id === 'sign') {
      
        sign();
      
    }
  
    display();
  
});

document.addEventListener('keydown', keyPress);
