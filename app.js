// Errors
const DIVIDE_BY_ZERO_ERROR = "DivideByZeroError";
const INVALID_NUMBER_ERROR = "InvalidNumberError";
const INVALID_OPERATOR_ERROR = "InvalidOperatorError";

// Math operator constants
const PLUS = "+";
const MINUS = "-";
const TIMES = "*";
const DIV = "/";
const MATH_OPERATORS = [PLUS, MINUS, TIMES, DIV];

// Digits
const ONE = "1";
const TWO = "2";
const THREE = "3";
const FOUR = "4";
const FIVE = "5";
const SIX = "6";
const SEVEN = "7";
const EIGHT = "8";
const NINE = "9";
const ZERO = "0";
const DIGITS = [ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, ZERO];

// Math Functions
const add = (a,b) => +a + +b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a*b;
const divide = (a,b) => {
  if (b === 0) {
    return DIVIDE_BY_ZERO_ERROR;
  }

  return (a / b).toFixed(2);
}

const MATH_FUNCTIONS = [add, subtract, multiply, divide];


function operate(operator, num1, num2) {
  if (!operator in MATH_OPERATORS) {
    return INVALID_OPERATOR_ERROR;
  }

  [num1, num2].map(n => Number(n));

  if ((typeof num1 != 'number') || (typeof num2 != 'number')) {
    return INVALID_NUMBER_ERROR;
  }
  
  let f = MATH_FUNCTIONS[MATH_OPERATORS.indexOf(operator)]

  return f(num1,num2);
}



// --- UI ---
const CONTAINER_EL = document.querySelector('.calc-container');

function createDigitBtns() {

  for (let i = 0; i < 3; i++) {
    let digitRowEl = document.createElement('div');
    digitRowEl.style.display = 'flex';
    digitRowEl.style.padding = '12px';
    digitRowEl.style.gap = "6px";

    for (let j = 0; j < 3; j++) { 
      let digitEl = document.createElement('button');

      digitEl.textContent = DIGITS[3*j + i];
      
      digitRowEl.appendChild(digitEl);
    }

    CONTAINER_EL.appendChild(digitRowEl);
  }
}

function createOperatorBtns() {
  
}


const test = createDigitBtns;
test();