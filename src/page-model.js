let vals = [ null, null, null ];
function clearArray() {
    vals[0] = null;
    vals[1] = null; 
    vals[2] = null;
}

function readyArray(result) {
    clearArray();
    vals[0] = result;
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
    }

    let result = func(num1, num2);

    showResult(result);

    return result;
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
            let result = operate(vals[0], vals[1], vals[2]);
            readyArray(result);
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
    if (vals[1] !== null) {
        let headerText = screenHeader.innerText;
        screenHeader.innerText = headerText.substring(0, headerText.length - 1) + `${value}`;
        vals[1] = value;
        return;
    }

    let num = parseFloat(screen.innerText);

    if (isNaN(num)) {
        showError("Number is invalid...");
        return;
    }

    vals[0] = num;
    vals[1] = value;

    let displayText = screen.innerText + ` ${value}`;
    screenHeader.innerText = displayText;

    screen.innerText = '';
}

function handleEqualsClick() {
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
    console.log(`ERROR: ${errMsg}`);
}

function clearCalcScreen() {
    screenHeader.innerText = '';
    screen.innerText = '';
    clearArray();
}

function hasDecimal() {
    // test inner text of screen to determine if it contains a 
    // decimal
    // regex.test(str);
    return /[.]/.test(screen.innerText);
}
initButtons();