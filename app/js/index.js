//Initialize calculator object
const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForOperand: false,
    operator: null,
};

//Update function that updates the input field of the calculator when called
const updateDisplay = () => {
    const display = document.querySelector('.calculator-input');
    display.value = calculator.displayValue;
};

//Call updateDisplay when page is opened
updateDisplay();

const inputNumber = (number) => {
    const {displayValue, waitingForOperand } = calculator;
    //If we are waiting for operand, set displayValue to number clicked and set watingForOperand false
    if (waitingForOperand === true) {
        calculator.displayValue = number;
        calculator.waitingForOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? number : displayValue + number;
    };
    //Finally update display
    updateDisplay();
};

const inputDecimal = (decimal) => {
    //If waiting for operand, do not append the decimal
    if (calculator.waitingForOperand === true) {
        return;
    };
    //Append decimal if the display value doesn't have one already
    if (!calculator.displayValue.includes(decimal)) {
        calculator.displayValue += decimal;
    };
    //Finally update display
    updateDisplay();
};

const inputOperator = (nextOperator) => {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    //If operator is inputted and user presses other operator
    //Change the operators value to the most recently pressed operator
    if (operator && calculator.waitingForOperand) {
        calculator.operator = nextOperator;
        return;
    };
    if (firstOperand === null) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const currentValue = firstOperand || 0;
        const result = performCalculation[operator](currentValue, inputValue);
        calculator.displayValue = result.toString();
        calculator.firstOperand = result;
    };
    calculator.waitingForOperand = true;
    calculator.operator = nextOperator;
    //Finally update display
    updateDisplay();
};

//Object that performs calculations depending the operator
const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand
};

//Function that sets all calculator -object values to deafault
const allClear = () => {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForOperand = false;
    calculator.operator = null;
    updateDisplay();
};

//Set calculator buttons that we are listening
const keys = document.querySelector('.calculator-keys');

//Listen keys that user presses
keys.addEventListener('click', (event) => {
    const target = event.target;
    //If button element is not clicked, exit the function
    if (!target.matches('button')){
        return;
    };
    //Here we check what kind of button is clicked and then
    //We call corresponding fuction
    if (target.classList.contains('operator')) {
        inputOperator(target.value);
        return;
    };
    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        return;
    };
    if (target.classList.contains('all-clear')) {
        allClear();
        return;
    };
    inputNumber(target.value);
});