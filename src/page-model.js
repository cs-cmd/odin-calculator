// numbers and operand used for calculation
let num1 = null;
let operand = null;
let num2 = null;

// maximum number of characters in a single number
const MAX_CHARACTERS = 111;
// clears values to default (null)
function clearVals() {
    num1 = null;
    num2 = null; 
    operand = null;
}

// globals for screen and screen header
let screen = document.getElementsByClassName('calc-screen')[0];
let screenHeader = document.getElementsByClassName('calc-header')[0];

// initialized buttons with on-click event listener
function initButtons() {
    let calcButtons = document.getElementsByClassName("calc-button");

    for (let i = 0; i < calcButtons.length; ++i) {
        calcButtons[i].addEventListener("click", (e) => {
            let value = e.target.innerText;
            // ro-type consists of number, operand, equals, and decimal
            // custom type used in handleButtonClick to redirect flow
            let type = e.target.getAttribute("ro-type");

            handleButtonClick(type, value);
        })
    }
}

// operate. performs the operation chosen via the operand
// stores the function planned to be used in a variable, calls that 
// and returns
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

// handles button click. redirects flow based on button type
function handleButtonClick(type, value) {
    switch (type) {
        case "backspace":
            // if backspace/delete, remove last character and 
            // set as innerText
            let screenString = (screen.innerText).slice(0, screen.innerText.length-1);
            screen.innerText = screenString;
            return;
        case "decimal":
            // if the value already has a decimal, return
            if (hasDecimal()) { return; }
        case "number":
            handleNumberClick(value);
            break;
        case "operand":
            handleOperandClick(value);
            break;
        case "equals":
            handleEqualsClick();
            // assign return of operate to result, show it, then clear vals
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

    // prevent number from growing past a certain size
    if (text.length + 1 > MAX_CHARACTERS) {
        showError("Number too long...");
        return;
    }

    screen.innerText = text + value;
}

// handles operand clicks. 
function handleOperandClick(value) {
    // if an operand was chosen already, apply change to header text
    // and change operand global (no need to make and changes to numbers)
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

// handles equal sign clicks.
function handleEqualsClick() {
    num = parseFloat(screen.innerText);

    if(isNaN(num)) {
        showError("Number is invalid...");
    }

    num2 = num;
}

// shows result to calc screen
function showResult(result) {
    screenHeader.innerText = '';
    screen.innerText = result;
}

function showError(errMsg) {
    console.log(`ERROR: ${errMsg}`);
}

// clears calc screens and vals
function clearCalcScreen() {
    screenHeader.innerText = '';
    screen.innerText = '';
    clearVals();
}

// test inner text of screen to determine if it contains a 
// decimal
// regex.test(str);
function hasDecimal() {
    return /[.]/.test(screen.innerText);
}

// on script load, init buttons
initButtons();