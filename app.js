// Errors
const DIVIDE_BY_ZERO_ERROR = "DivideByZeroError";
const INVALID_NUMBER_ERROR = "InvalidNumberError";
const INVALID_OPERATOR_ERROR = "InvalidOperatorError";

// Math operator constants
const PLUS = "+";
const MINUS = "-";
const TIMES = "*";
const DIVIDE = "/";

const MATH_OPERATORS = [PLUS, MINUS, TIMES, DIVIDE];

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


function operate(operator, num1, num2) {
  if (!operator in MATH_OPERATORS) {
    return INVALID_OPERATOR_ERROR;
  }
  if (typeof num1 != Number || typeof num2 != Number) {
    return INVALID_NUMBER_ERROR;
  }
  
}

