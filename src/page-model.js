function initButtons() {
    let addButton = document.getElementById("add-button");
    let subtractButton = document.getElementById("subtract-button");
    let multiplyButton = document.getElementById("multiply-button");
    let divideButton = document.getElementById("divide-button");

    addButton.addEventListener("click", (e) => {
        performFunc(add);
    });

    subtractButton.addEventListener("click", (e) => {
        performFunc(subtract);
    });

    multiplyButton.addEventListener("click", (e) => {
        performFunc(multiply);
    });

    divideButton.addEventListener("click", (e) => {
        performFunc(divide);
    })
}

function performFunc(func) {
    let values = getValues();
    
    if(values == null) {
        // error
        return;
    }

    let numOne = values[0];
    let numTwo = values[1];

    let result = func(numOne, numTwo);

    showOutput(result);
}

function getValues() {
    let numOneInput = document.getElementById("num1-input");
    let numTwoInput = document.getElementById("num2-input");

    let numOne = parseInt(numOneInput.value);
    let numTwo = parseInt(numTwoInput.value);

    if (isNaN(numOne)) {
        showError("First number invalid");
        return;
    }

    if (isNaN(numTwo)) {
        showError("Second number invalid");
        return;
    }

    return [numOne, numTwo ];
}

function showError(errMsg) {
    let errorTag = document.getElementById("error-output");

    let errorMessage = `ERROR: ${errMsg}`;

    errorTag.innerText = errorMessage;
}

function showOutput(output) {
    let outputTag = document.getElementById("result-output");

    outputTag.innerText = `Result is: ${output}`;
}


initButtons();