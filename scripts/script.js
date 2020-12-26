//Constants and variables
const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number')
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('=');
const allClearButton = document.getElementById('allClear');
const clearEntryButton = document.getElementById('clearEntry');
const backButton = document.getElementById('backspace');
let currentNumber = '';
let originalNumber = '';
let storedOperator = '';
let equalAgain = false;

//testing function
function test(identity){
    console.log({currentNumber});
    console.log({originalNumber});
    console.log({storedOperator});
    console.log({equalAgain});
    console.log(identity);
}

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
                alert('I cannot do that.')
                return 0;
            }
            return divide(a,b);
            break;
    }
}
function updateDisplay(currentNumber){
    display.textContent = +currentNumber;
}
//Give clear and back their events.
function clearAll() {
        currentNumber = '0';
        originalNumber = '';
        storedOperator = '';
        equalAgain = false;
        updateDisplay(currentNumber);
        test('allClear');
};
allClearButton.addEventListener('click', clearAll);

clearEntryButton.addEventListener('click', () =>{
    currentNumber = '0';
    updateDisplay(currentNumber);
    equalAgain = false;
    test('clearEntry')
})
backButton.addEventListener('click', ()=>{
    console.log(currentNumber);
    currentNumber = currentNumber.slice(0, (currentNumber.length - 1))
    updateDisplay(currentNumber);
});

//Gives the number buttons their ability to display digits
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        //Add a check for doing decimal multiple times
        if(equalAgain){
            clearAll();
        }
        if(button.value === '.' && currentNumber.indexOf('.') > -1){
            console.log(button.value);
            console.log(currentNumber.indexOf('.'))
            return;
        }
        equalAgain = false;
        currentNumber += button.value
        updateDisplay(currentNumber);
        test('numberButton')
    });    
});
//Gives the operator their ability to juggle and calculate numbers
operatorButtons.forEach(button =>{
    button.addEventListener('click', () => {
        test('operatorButton')
        equalAgain = false;
        if(originalNumber === ''){
            originalNumber = currentNumber;
            currentNumber = '';
            storedOperator = button.value;
        }else if(currentNumber === ''){
            storedOperator = button.value;
        }else{
            originalNumber = operate(+originalNumber, +currentNumber, storedOperator);
            updateDisplay(originalNumber);
            currentNumber = '';
            storedOperator = button.value;
        }
    })
})
//The equals button ladies, gentlemen, and non-binary folks.
equalsButton.addEventListener('click', () =>{
    test('equal')
    if(equalAgain){
        originalNumber = operate(+originalNumber, +lastNumber, lastOperator);
        updateDisplay(originalNumber);  
        return;      
    }    
    if(currentNumber === ''){
        if(originalNumber === ''){
            originalNumber = currentNumber;
        };
        updateDisplay(originalNumber);
        storedOperator = '';
        return;
    };
    if(originalNumber === ''){
        originalNumber = currentNumber;
        updateDisplay(originalNumber);
        currentNumber = '';
        storedOperator = '';
        return;
    };
    originalNumber = operate(+originalNumber, +currentNumber, storedOperator);
    updateDisplay(originalNumber);
    lastNumber = currentNumber;
    lastOperator = storedOperator;
    equalAgain = true;
    currentNumber = '';
});


//keyboard support
window.addEventListener('keydown', function(e) {
    let button = document.getElementById(e.key);
    //looks for Enter key to press the equal button once.
    if(button === null){
        button = document.querySelector(`[data-alt='${e.key}'`)
        button.focus();
        return;
    }
    button.focus();
    button.click();
})