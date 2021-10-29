"use strict";
const log = console.log;

//  DOM Selections

const displayText = document.querySelector(".display-text");
const btnNumbers = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".opr");
const btnClear = document.querySelector(".button-clr");
const btnEql = document.querySelector(".button-equal");
const btnDot = document.getElementById("dot");

// Starting Conditions

let currentValue = "";
let runningTotal = "";
let operator = "";
let inOperation = false;
let isFloat = false;
let inEquals = false;

// set starting conditions function

const startingConditions = function () {
  currentValue = "";
  runningTotal = "";
  operator = "";
  inOperation = false;
  displayText.textContent = currentValue;
  btnDot.value = ".";
  inEquals = false;
};

// Enter Values

const enterValues = (button) => {
  if (inEquals) {
    startingConditions();
    inEquals = false;
  }

  currentValue = `${currentValue}${button.value}`;
  displayText.textContent = currentValue;

  if (currentValue.includes(".")) {
    btnDot.value = "";
  }
};

// EVENT LISTENERS FOR NUMBERS

// numbers click event listener

btnNumbers.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    enterValues(button);
  });
});

// keyboard NUMBERS event listener

addEventListener("keydown", function (event) {
  const keyValue = event.key;
  btnNumbers.forEach((button) => {
    if (keyValue === button.value) {
      enterValues(button);
    }
  });
});

// EVENT LISTENERS FOR OPERATORS

// keyboard OPERATORS event listeners

addEventListener("keydown", function (event) {
  event.preventDefault();
  const keyValue = event.key;

  operators.forEach((operator) => {
    if (keyValue === operator.value) {
      operatorCalc(keyValue);
    }
  });
});

// operator click listener
operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    e.preventDefault();
    operatorCalc(operator.value);
  });
});

// operator set and calculate function

const operatorCalc = function (operatorValue) {
  if (inEquals) {
    inEquals = false;
  }
  equals();
  operator = operatorValue;
  log(operator);
};
// equal button listener

btnEql.addEventListener("click", (e) => {
  e.preventDefault();
  runEquals();
  inEquals = true;
});

// equal keyboard listener

addEventListener("keydown", (e) => {
  e.preventDefault();
  const keyValue = e.key;
  if (keyValue === "=" || keyValue === "Enter") {
    runEquals();
    inEquals = true;
  }
});

// run equals

const runEquals = function () {
  equals();
  operator = "";
};

// Calculate Function

const equals = function () {
  if (inOperation) {
    if (operator === "+") {
      runningTotal += Number(currentValue);
    } else if (operator === "-") {
      runningTotal -= Number(currentValue);
    } else if (operator === "*") {
      runningTotal *= Number(currentValue);
    } else if (operator === "/") {
      runningTotal /= Number(currentValue);
    }
    currentValue = runningTotal;
    displayText.textContent = currentValue;
  } else {
    inOperation = true;
    runningTotal = Number(currentValue);
  }
  currentValue = "";
  btnDot.value = ".";
};

// clear button
btnClear.addEventListener("click", function (e) {
  e.preventDefault();
  startingConditions();
});
