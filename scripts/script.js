//Constants and variables
const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number')
let number = '';

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
            return divide(a,b);
            break;
    }
}
function updateDisplay(currentNumber){
    display.textContent = currentNumber;
}
//Gives the number buttons their ability to display digits
numberButtons.forEach(button => {
    button.addEventListener('click', () =>{
        number += button.value
        updateDisplay(number);
    });    
});
