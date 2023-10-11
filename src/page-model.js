// numbers and operand used for calculation
let num1 = null;
let operand = null;
let num2 = null;

// clears values to default (null)
function clearVals() {
    num1 = null;
    num2 = null; 
    operand = null;
}

let screen = document.getElementsByClassName('calc-screen')[0];
let screenHeader = document.getElementsByClassName('calc-header')[0];

function initButtons() {
    let calcButtons = document.getElementsByClassName("calc-button");

    for (let i = 0; i < calcButtons.length; ++i) {
        calcButtons[i].addEventListener("click", (e) => {
            let value = e.target.innerText;
            let type = e.target.getAttribute("ro-type");

            handleButtonClick(type, value);
        })
    }
}

function operate(numOne, pOperand, numTwo) {
    let func; // function to invoke

    switch (pOperand) {
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
    }

    return func(numOne, numTwo);
}

function handleButtonClick(type, value) {
    switch (type) {
        case "backspace":
            let screenString = (screen.innerText).slice(0, screen.innerText.length-1);
            screen.innerText = screenString;
            return;
        case "decimal":
            if (hasDecimal()) { return; }
        case "number":
            handleNumberClick(value);
            break;
        case "operand":
            handleOperandClick(value);
            break;
        case "equals":
            handleEqualsClick();
            let result = operate(num1, operand, num2);
            showResult(result);
            clearVals();
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

    if (text.length >= 111) {
        showError("Number too long...");
        return;

    }

    screen.innerText = text + value;
}

function handleOperandClick(value) {
    if (operand !== null) {
        let headerText = screenHeader.innerText;
        screenHeader.innerText = headerText.substring(0, headerText.length - 1) + `${value}`;
        operand = value;
        return;
    }

    let num = parseFloat(screen.innerText);

    if (isNaN(num)) {
        showError("Number is invalid...");
        return;
    }

    num1 = num;
    operand = value;

    let displayText = num + ` ${value}`;
    screenHeader.innerText = displayText;

    screen.innerText = '';
}

function handleEqualsClick() {
    num = parseFloat(screen.innerText);

    if(isNaN(num)) {
        showError("Number is invalid...");
    }

    num2 = num;
}

function showResult(result) {
    screenHeader.innerText = '';
    screen.innerText = result;
}

function showError(errMsg) {
    console.log(`ERROR: ${errMsg}`);
}

function clearCalcScreen() {
    screenHeader.innerText = '';
    screen.innerText = '';
    clearVals();
}

function hasDecimal() {
    // test inner text of screen to determine if it contains a 
    // decimal
    // regex.test(str);
    return /[.]/.test(screen.innerText);
}
initButtons();