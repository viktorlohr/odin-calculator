const NONE = "";

// Errors
const DIVIDE_BY_ZERO_ERROR = "DivideByZeroError";
const INVALID_NUMBER_ERROR = "InvalidNumberError";
const INVALID_OPERATOR_ERROR = "InvalidOperatorError";
const INVALID_PHASE_ERROR = "InvalidPhaseError";
const INVALID_INPUT_ERROR = "InvalidInputError";
const UNKNOWN_CALC_STATE_ERROR = "UnkownCalcStateError";
const MISSING_FIRST_OPERAND_ERROR = "MissingFirstOperandError";
const MISSING_SECOND_OPERAND_ERROR = "MissingSecondOperandError";

const ERRORS = [MISSING_SECOND_OPERAND_ERROR, MISSING_FIRST_OPERAND_ERROR, DIVIDE_BY_ZERO_ERROR, INVALID_INPUT_ERROR, INVALID_OPERATOR_ERROR, INVALID_PHASE_ERROR, UNKNOWN_CALC_STATE_ERROR];

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
const DOT = ".";
const OTHER_INPUTS = [EQUAL, CLEAR, DOT];


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
  if (!(OPERATORS.includes(operator))) {
    return INVALID_OPERATOR_ERROR;
  }

  num1 = Number(num1);
  num2 = Number(num2);

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
 * @property {string} num2
 * @property {string} operator
 * @property {string} currentUserInput -- see definition of USER_INPUTS
 * @property {string} lastResult
 */

function resetCalcState(calcState) {
  /**
   * @param {CalcState} calcState
   * @returns {CalcState}
  */

  calcState.num1 = "";
  calcState.num2 = "";
  calcState.operator = NONE;
  calcState.inputPhase = ENTER_FIRST_NUMBER;
}

function clearCalcState(calcState) {
  resetCalcState(calcState);
  calcState.lastResult = CLEAR;
}


function transformCalcState(calcState) {
  /**
   * @param {CalcState} calcState
   * @returns {CalcState}
   */
  if (!(INPUT_PHASES.includes(calcState.inputPhase))) {
    return INVALID_PHASE_ERROR;
  }

  if (!(USER_INPUTS.includes(calcState.currentUserInput))) {
    return INVALID_INPUT_ERROR;
  }


  if (OPERATORS.includes(calcState.currentUserInput)) {
    if (calcState.num1 === "") {
      calcState.num1 = calcState.lastResult;
    }
    
    calcState.operator = calcState.currentUserInput;
    calcState.inputPhase = ENTER_SECOND_NUMBER;

  } else if ([...DIGITS, DOT].includes(calcState.currentUserInput)) {
    switch (calcState.inputPhase) {
      case ENTER_FIRST_NUMBER:
        calcState.num1 = calcState.num1.concat(calcState.currentUserInput);
        break;
      case ENTER_SECOND_NUMBER:
        calcState.num2 = calcState.num2.concat(calcState.currentUserInput);
        break;
    }
  } else if (calcState.currentUserInput === EQUAL) {
    if (calcState.num2 === "") {
      calcState.lastResult = MISSING_SECOND_OPERAND_ERROR;
      return calcState;
    }

    calcState.lastResult = String(operate(calcState.operator, calcState.num1, calcState.num2));
    resetCalcState(calcState);

  } else if (calcState.currentUserInput === CLEAR) {
    clearCalcState(calcState);

  } else {
    calcState.lastResult = UNKNOWN_CALC_STATE_ERROR;
  }

  return calcState;
}
/* 
--- UI ---
*/


let calcState = {
  inputPhase: ENTER_FIRST_NUMBER,
  num1: "",
  num2: "",
  operator: "",
  lastResult: "",
  currentUserInput: "",
}

const CONTAINER_EL = document.querySelector('.calc-container');
const DISPLAY = document.querySelector('.display');

createUI();

function createUI() {
  createDigitBtns();
  createOperatorBtns();
  createOtherBtns();
}


// --- Buttons ----

function createDigitBtns() {
  const digitBtns = document.createElement('div');
  digitBtns.style.display = 'flex';
  digitBtns.style.flexDirection = 'column';

  for (let i = 0; i < 3; i++) {
    let digitRowEl = document.createElement('div');
    digitRowEl.style.display = 'flex';
    digitRowEl.style.padding = '6px';
    digitRowEl.style.gap = '6px';

    for (let j = 0; j < 3; j++) { 
      let digitEl = document.createElement('button');

      digitEl.textContent = DIGITS[3*i + j];
      
      digitRowEl.appendChild(digitEl);
    }

    digitBtns.appendChild(digitRowEl);
  }
  const zeroButton = document.createElement('button');
  zeroButton.textContent = ZERO;
  zeroButton.style.alignSelf = 'center';
  digitBtns.appendChild(zeroButton);

  CONTAINER_EL.appendChild(digitBtns);
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
  
  OTHER_INPUTS.map(input => {
    let btn = document.createElement('button');
    btn.textContent = input;
    otherBtns.appendChild(btn);
  });
  
  CONTAINER_EL.appendChild(otherBtns);
}



let num1 = 0;
let num2 = 0;
let lastPress = "";
let lastResult = "";

btns = Array.from(document.querySelectorAll('button'));
btns.map(b => b.addEventListener('click', () => {
    calcState.currentUserInput = b.textContent;
    calcState = transformCalcState(calcState);
    updateDisplay();
    console.log(calcState);
  }));

const DOT_BUTTON = btns.find(b => b.textContent === DOT);


function updateDisplay() {
  if (calcState.currentUserInput === EQUAL || calcState.currentUserInput === CLEAR) {
    DISPLAY.textContent = calcState.lastResult;

  } else if (calcState.inputPhase === ENTER_FIRST_NUMBER) {
    DISPLAY.textContent = calcState.num1;

    checkAndToggleDot(calcState.num1);

  } else if (calcState.inputPhase === ENTER_SECOND_NUMBER) {
    DISPLAY.textContent = calcState.num1 + " " + calcState.operator + " " + calcState.num2;

    checkAndToggleDot(calcState.num2);
    
  }
}

function checkAndToggleDot(num) {
  if (num.includes(DOT)) {
      DOT_BUTTON.style.display = 'none';
    } else {
      DOT_BUTTON.style.display = 'block';
    }
}



