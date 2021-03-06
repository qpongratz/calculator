//Constants and variables
const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number')
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('=');
const allClearButton = document.getElementById('allClear');
const clearEntryButton = document.getElementById('clearEntry');
const backButton = document.getElementById('Backspace');
const allButtons = document.querySelectorAll('button');

//Initialize state
let currentNumber = '0';
let originalNumber = '';
let storedOperator = '';
let lastOperator = '';
let lastNumber = '';
let equalAgain = false;
updateDisplay(currentNumber)

// //testing function
// function test(identity){
//     console.log({currentNumber});
//     console.log({originalNumber});
//     console.log({storedOperator});
//     console.log({equalAgain});
//     console.log({lastNumber});
//     console.log({lastOperator});
//     console.log(identity);
// }

//Math Functions
function add(a,b){
    return a + b;
}
function subtract(a,b){
    return a - b;
}
function multiply(a,b){
    return a * b;
}
function divide(a,b){
    return a / b;
}
function operate(a, b, operator){
    switch(operator){
        case '+':
            return add(a,b);
            break;
        case '-':
            return subtract(a,b);
            break;
        case '*':
            return multiply(a,b);
            break;
        case '/':
            if(b === 0){
                alert('I cannot do that, Dave.');
                clearAll();
                return 0;
            }
            return divide(a,b);
            break;
    }
}
function updateDisplay(currentNumber){
    //Some messy code to git rid of leading zeros but also displaying numbers after a decimal correctly
    currentNumber = currentNumber +''
    let length = currentNumber.length;
    if(length > 14){
        currentNumber = (+currentNumber).toExponential(7);
    }
    let decimalSpot = currentNumber.indexOf('.')
    if(decimalSpot>-1){
        let leftDecimal = currentNumber.substring(0, decimalSpot);
        let rightDecimal = currentNumber.substring(decimalSpot); 
        currentNumber = +leftDecimal + rightDecimal;
        display.textContent = currentNumber;
        return
    }
    if(isNaN(+currentNumber)){
        display.textContent = currentNumber;
        return;
    }
    display.textContent = +currentNumber;
}
//Give clear and back their events.
function clearAll() {
        currentNumber = '0';
        originalNumber = '';
        storedOperator = '';
        equalAgain = false;
        updateDisplay(currentNumber);
};
allClearButton.addEventListener('click', clearAll);

clearEntryButton.addEventListener('click', () =>{
    //add check if this was pressed twice and clear all if so?
    currentNumber = '0';
    updateDisplay(currentNumber);
    equalAgain = false;
})

backButton.addEventListener('click', ()=>{
    //clears all if you just did a calculation with =
    if(equalAgain){
        clearAll();
    }
    currentNumber = currentNumber.slice(0, (currentNumber.length - 1))
    equalAgain = false;
    updateDisplay(currentNumber);
});

//Gives the number buttons their ability to display digits
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        //starts fresh if you do a number after completing a calculation with =
        if(equalAgain){
            clearAll();
        }
        //checks if you try to do multiple decimal points
        if(button.value === '.' && currentNumber.indexOf('.') > -1){
            return;
        }
        if(((+currentNumber)+"").length >= 13){
            return;
        }
        equalAgain = false;
        currentNumber += button.value
        updateDisplay(currentNumber);
    });    
});
//Gives the operator their ability to juggle and calculate numbers
operatorButtons.forEach(button =>{
    button.addEventListener('click', () => {
        equalAgain = false;
        if(originalNumber === ''){
            originalNumber = currentNumber;
            currentNumber = '';
            storedOperator = button.value;
        }else if(currentNumber === ''){
            storedOperator = button.value;
        }else{
            if(storedOperator === ''){
                originalNumber = currentNumber;
                currentNumber = '';
                storedOperator = button.value;
                return;
            }
            originalNumber = operate(+originalNumber, +currentNumber, storedOperator);
            updateDisplay(originalNumber);
            currentNumber = '';
            storedOperator = button.value;
        }
    });
});
//The equals button ladies, gentlemen, and non-binary folks.
equalsButton.addEventListener('click', () =>{
    if(currentNumber === '.'){currentNumber = 0};
    if(originalNumber === '.'){originalNumber = 0};
    if(equalAgain){
        originalNumber = operate(+originalNumber, +lastNumber, lastOperator);
        updateDisplay(originalNumber);  
        return;      
    }    
    if(currentNumber === ''){
        updateDisplay(originalNumber);
        storedOperator = '';
        return;
    };
    if(originalNumber === ''){
        originalNumber = currentNumber;
        updateDisplay(originalNumber);
        currentNumber = '';
        return;
    };
    if(storedOperator === ''){
        return;
    }
    originalNumber = operate(+originalNumber, +currentNumber, storedOperator);
    updateDisplay(originalNumber);
    lastNumber = currentNumber;
    lastOperator = storedOperator;
    equalAgain = true;
    currentNumber = '';
});
//button animation on click
allButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        button.classList.add('clicked');
    });
    button.addEventListener('transitionend', ()=>{
        button.classList.remove('clicked');
    });
});

//keyboard support
window.addEventListener('keydown', function(e) {
    let button = document.getElementById(e.key);
    //looks for Enter key to press the equal button once.
    if(button === null){
        button = document.querySelector(`[data-alt='${e.key}'`)
        if(button === null){return};
        button.focus();
        return;
    }
    button.focus();
    button.click();
});