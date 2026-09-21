const NONE = "none";

// Errors
const DIVIDE_BY_ZERO_ERROR = "DivideByZeroError";
const INVALID_NUMBER_ERROR = "InvalidNumberError";
const INVALID_OPERATOR_ERROR = "InvalidOperatorError";
const INVALID_PHASE_ERROR = "InvalidPhaseError";
const INVALID_INPUT_ERROR = "InvalidInputError";

/*
  --- USER INPUT CONSTANTS
*/

// Math operator constants
const PLUS = "+";
const MINUS = "-";
const TIMES = "*";
const DIVIDE = "/";
const OPERATORS = [PLUS, MINUS, TIMES, DIVIDE];

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


// Other Inputs
const EQUAL = "=";
const CLEAR = "clr";
const OTHER_INPUTS = [EQUAL, CLEAR];


const USER_INPUTS = [...DIGITS, ...OPERATORS, ...OTHER_INPUTS];

/*
  --- LOGIC ---
*/

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
  if (!operator in OPERATORS) {
    return INVALID_OPERATOR_ERROR;
  }

  [num1, num2].map(n => Number(n));

  if ((typeof num1 != 'number') || (typeof num2 != 'number')) {
    return INVALID_NUMBER_ERROR;
  }
  
  let f = MATH_FUNCTIONS[OPERATORS.indexOf(operator)]

  return f(num1,num2);
}


/*
  TRANSFORMING THE "CALC STATE"
*/

ENTER_FIRST_NUMBER = "enterFirstNumber";
ENTER_SECOND_NUMBER = "enterSecondNumber";
INPUT_PHASES = [ENTER_FIRST_NUMBER, ENTER_SECOND_NUMBER];

/**
 * @typedef {Object} CalcState
 * @property {string} inputPhase -- see definition of INPUT_PHASES
 * @property {string} num1
 * @property {string} operator
 * @property {string} num2
 * @property {string} currentUserInput -- see definition of USER_INPUTS
 * @property {string} lastResult
 */

function clearCalcState(calcState) {
  /**
   * @param {CalcState} calcState
   * @returns {CalcState}
  */

  calcState.num1 = NONE;
  calcState.num2 = NONE;
  calcState.operator = NONE;
  calcState.inputPhase = ENTER_FIRST_NUMBER;

}

function transformCalcState(calcState) {
  /**
   * @param {CalcState} calcState
   * @returns {CalcState}
   */
  if (!(calcState.input_phase in INPUT_PHASES)) {
    return INVALID_PHASE_ERROR;
  }

  if (!([calcState.lastUserInput, calcState.currentUserInput].every(i => i in USER_INPUTS))) {
    return INVALID_INPUT_ERROR;
  }

  if (!([calcState.num1, calcState.num2].every(n => n.split().every(digit => digit in [...DIGITS, '.'])))) {
    return INVALID_NUMBER_ERROR;
  }


  if (calcState.currentUserInput in OPERATORS) {
      calcState.operator = calcState.currentUserInput;

      if (calcState.num1 === NONE) {
        calcState.num1 = calcState.lastResult;
      }

      calcState.inputPhase = ENTER_SECOND_NUMBER;
    }

  if (calcState.currentUserInput === EQUAL) {
    

    calcState.lastResult = String(operate(calcState.operator, calcState.num1, calcState.num2));
  }
  
  if (calcState.currentUserInput in DIGITS) {
    switch (calcState.inputPhase) {
      case ENTER_FIRST_NUMBER:
        calcState.num1 = num1.concat(calcState.currentUserInput);

      case ENTER_SECOND_NUMBER:
        calcState.num2 = num2.concat(calcState.currentUserInput);
    }
  }

}



/* 
--- UI ---
*/

// Size constants
// TINIEST = '2px';
// TINY = '4px';
// SMALLEST = '6px';
// SMALLER = '8px';
// SMALL = '10px';
// NORMAL = '12px';
// LARGE = '16px';
// LARGER = '24px';
// LARGEST = '32px';
// HUGE = '42px';
// HUGER = '48px';
// HUGEST = '64px';

const CONTAINER_EL = document.querySelector('.calc-container');

createUI();

function createUI() {
  createDigitBtns();
  createOperatorBtns();
  createOtherBtns();
}


// --- Buttons ----

function createDigitBtns() {
  const digitBtns = document.createElement('div');
  CONTAINER_EL.appendChild(digitBtns);

  for (let i = 0; i < 3; i++) {
    let digitRowEl = document.createElement('div');
    digitRowEl.style.display = 'flex';
    digitRowEl.style.padding = '6px';
    digitRowEl.style.gap = '6px';

    for (let j = 0; j < 3; j++) { 
      let digitEl = document.createElement('button');

      digitEl.textContent = DIGITS[3*j + i];
      
      digitRowEl.appendChild(digitEl);
    }

    digitBtns.appendChild(digitRowEl);
  }
}

function createOperatorBtns() {
  const operatorBtns = document.createElement('div');
  operatorBtns.style.display = 'flex';
  operatorBtns.style.flexDirection = 'column';
  operatorBtns.style.gap = '12px';
  operatorBtns.style.padding = '6px';

  OPERATORS.map(operator => {
    let operatorBtn = document.createElement('button');
    operatorBtn.textContent = operator;

    operatorBtns.appendChild(operatorBtn);
  });

  CONTAINER_EL.appendChild(operatorBtns);
}

function createOtherBtns() {
  const otherBtns = document.createElement('div');
  otherBtns.style.display = 'flex';
  otherBtns.style.flexDirection = 'column';
  otherBtns.style.gap = '12px';
  
  const equalsBtn = document.createElement('button');
  equalsBtn.textContent = EQUAL;
  otherBtns.appendChild(equalsBtn);

  const clearBtn = document.createElement('button');
  clearBtn.textContent = CLEAR;
  otherBtns.appendChild(clearBtn);

  
  CONTAINER_EL.appendChild(otherBtns);
}


let num1 = 0;
let num2 = 0;
let lastPress = "";
let lastResult = "";

function addEventListenersToBtns() {

}
