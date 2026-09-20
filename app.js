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



