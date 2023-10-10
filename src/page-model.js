let vals = [ null, null, null ];
function clearArray() {
    vals[0] = null;
    vals[1] = null; 
    vals[2] = null;
}

let screen = document.getElementsByClassName('calc-screen')[0];
let screenHeader = document.getElementsByClassName('calc-header')[0];

function initButtons() {
    let calcButtons = document.getElementsByClassName("calc-button");

    for (let i = 0; i < calcButtons.length; ++i) {
        calcButtons[i].addEventListener("click", (e) => {
            let value = e.target.innerText;
            let type = e.target.getAttribute("ro-type");

            console.log(value);
            console.log(type);
            handleButtonClick(type, value);
        })
    }
}

function operate(num1, operand, num2) {
    let func;

    switch (operand) {
        case "+":
            func = add;
            break;
        case "-":
            func = subtract;
            break;
        case "*": 
            func = multiply;
            break;
        case "/":
            func = divide;
            break;
        default:
            showError("Error in computation...");
            return;
    }

    let result = func(num1, num2);

    showResult(result);
}

function handleButtonClick(type, value) {
    switch (type) {
        case "decimal":
        case "number":
            handleNumberClick(value);
            break;
        case "operand":
            handleOperandClick(value);
            break;
        case "equals":
            handleEqualsClick(value);
            operate(vals[0], vals[1], vals[2]);
            clearArray();
            break;
        case "clear": 
            clearCalcScreen();
            break;
        default:
            showError("Error in processing...");
            break;
    }
}

function handleNumberClick(value) {
    let text = screen.innerText;

    if (text.length >= 54) {
        showError("Number too long...");
        return;

    }

    screen.innerText = text + value;
}

function handleOperandClick(value) {
    let num1 = parseFloat(screen.innerText);

    if (isNaN(num1)) {
        showError("Number is invalid...");
        return;
    }

    vals[0] = num1;
    vals[1] = value;

    let displayText = screen.innerText + ` ${value}`;
    screenHeader.innerText = displayText;

    screen.innerText = '';
}

function handleEqualsClick(value) {
    num2 = parseFloat(screen.innerText);

    if(isNaN(num2)) {
        showError("Number is invalid...");
    }

    vals[2] = num2;
}

function showResult(result) {
    screenHeader.innerText = '';
    screen.innerText = result;
}
function showError(errMsg) {
    let errTag = document.getElementById("error-output");
    errTag.innerText = errMsg;
}

function clearCalcScreen() {
    screen.innerText = '';
}
initButtons();