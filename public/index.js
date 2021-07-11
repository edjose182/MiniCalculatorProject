const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null
};

function inputDigit(digit) {
    const {displayValue,waitingForSecondOperand} = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    }

    else {
        // Overwrite `displayValue`if the current value is '0' otherwise append to it
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

    console.log(calculator);
}

function handleOperator(nextOperator) {
    // Destructure the properties on the calculator object
    const {firstOperand, displayValue, operator} = calculator;
    // `parseFloat` converts the string contens of `display value`
    // to a floating-pint number
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
        
    }

    // verify that `firstOperand`is null and that the `inputValue`
    // is not a `NaN`value
    if (firstOperand === null && !isNaN(inputValue)) {
        // Update the firstOperand property
        calculator.firstOperand = inputValue;
    }

    else if (operator) {
        const result = calculate(firstOperand,inputValue,operator)
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
        
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator; 

    console.log(calculator);
    
}

function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;    
    }

    else if (operator === '-') {
        return firstOperand - secondOperand;
    }

    else if (operator === "x") {
        return firstOperand * secondOperand;
    }

    else if (operator === "/"){
        return firstOperand / secondOperand;
    }

    return secondOperand;
}

function resetCalculator() {
    calculator.displayValue = 0;
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}

function updateDisplay() {
    // Select the element with class of `calculator-screen`
    const display = document.getElementById('calculator-screen');
    // update the value of the elment with the contents of `displayValue`
    display.value = calculator.displayValue;
}



const keys = document.getElementById("Calculator");
keys.addEventListener('click', (event) => {
    // Acess the clicked element
    const {target} = event;
    
    //console.log(target);// Shows html
    //console.log(target.classList) //Shows html info as an onject
    var buttonId = String(target.getAttribute("id")); // -> Extract the id of the button 

    // Check if the clicked element is a button.
    // If not, exit from the function

    if (!target.matches('button')) {
        return;
    }

    if (buttonId.substring(0,8) == "Operator") {
        console.log("Operator",target.value);
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (buttonId.substring(0,5) == "Reset") {
        resetCalculator();
        updateDisplay();
        console.log("Reset",target.value);
        
        return;
    }

    if (buttonId.substring(0,5) == "Equal") {
        console.log("Equal",target.value);
        console.log("Operator",target.value);
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (buttonId.substring(0,6) == "Number") {
        console.log("Number",target.value);
        inputDigit(target.value);
        updateDisplay();
        return;
    }

}
)

