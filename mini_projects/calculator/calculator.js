const previousDisplay = document.getElementById('previous');
const currentDisplay = document.getElementById('current');
const buttons = document.querySelectorAll('button');

let currentValue = '0';
let previousValue = '';
let operator = '';
let waitingForOperand = false;

function updateDisplay() {
    currentDisplay.textContent = currentValue;
    previousDisplay.textContent = previousValue ? `${previousValue} ${operator}`.trim() : '0';
}

function clearAll() {
    currentValue = '0';
    previousValue = '';
    operator = '';
    waitingForOperand = false;
    updateDisplay();
}

function inputDigit(value) {
    if (waitingForOperand) {
        currentValue = value;
        waitingForOperand = false;
    } else {
        currentValue = currentValue === '0' ? value : currentValue + value;
    }
    updateDisplay();
}

function inputDecimal() {
    if (waitingForOperand) {
        currentValue = '0.';
        waitingForOperand = false;
        updateDisplay();
        return;
    }

    if (!currentValue.includes('.')) {
        currentValue += '.';
        updateDisplay();
    }
}

function deleteLast() {
    if (waitingForOperand) return;

    if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
    } else {
        currentValue = '0';
    }
    updateDisplay();
}

function calculate(a, b, op) {
    const first = Number(a);
    const second = Number(b);

    switch (op) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return second === 0 ? 'Error' : first / second;
        default:
            return second;
    }
}

function handleOperator(nextOperator) {
    const inputValue = Number(currentValue);

    if (previousValue && operator && waitingForOperand) {
        operator = nextOperator;
        updateDisplay();
        return;
    }

    if (previousValue === '') {
        previousValue = currentValue;
    } else if (operator) {
        const result = calculate(previousValue, currentValue, operator);
        currentValue = `${result}`;
        previousValue = `${result}`;
    }

    operator = nextOperator;
    waitingForOperand = true;
    updateDisplay();
}

function performEquals() {
    if (!operator || !previousValue) return;

    const result = calculate(previousValue, currentValue, operator);
    currentValue = `${result}`;
    previousValue = '';
    operator = '';
    waitingForOperand = false;
    updateDisplay();
}

function handlePercent() {
    const value = Number(currentValue) / 100;
    currentValue = `${value}`;
    updateDisplay();
}

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const { value, action } = button.dataset;

        if (value !== undefined) {
            if (/[0-9]/.test(value)) {
                inputDigit(value);
            } else if (value === '.') {
                inputDecimal();
            } else {
                handleOperator(value);
            }
            return;
        }

        switch (action) {
            case 'clear':
                clearAll();
                break;
            case 'delete':
                deleteLast();
                break;
            case 'equals':
                performEquals();
                break;
            case 'percent':
                handlePercent();
                break;
        }
    });
});

document.addEventListener('keydown', (event) => {
    const { key } = event;

    if (/^[0-9]$/.test(key)) {
        inputDigit(key);
    } else if (key === '.') {
        inputDecimal();
    } else if (['+', '-', '*', '/'].includes(key)) {
        handleOperator(key);
    } else if (key === 'Enter' || key === '=') {
        performEquals();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearAll();
    }
});

updateDisplay();