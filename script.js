const numpad = document.getElementById('numpad');
const displayTop = document.getElementById('top');
const displayBottom = document.getElementById('bottom');
let result, display = '', equation = '';

// Show & Hide output
function showText(box, text) {
    box.innerHTML = text;
}

function hideText(box) {
    box.innerHTML = '';
}

// Calculator
function calculator(input) {
    if (input in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
        if (equation.slice(-1) === '=') {
            hideText(displayTop);
            equation = input;
            display = input;
        } else {
            equation += input;
            display += input;
        }
        showText(displayBottom, display);
    } else if (input === '+' || input === '-' || input === '*' || input === '/') {
        if (equation.slice(-1) === '+' || equation.slice(-1) === '-' || equation.slice(-1) === '*' || equation.slice(-1) === '/') {
            equation = equation.slice(0, -1);
            display = display.slice(0, -1);
        } else if (equation.slice(-1) === '=') {
            equation = result.toString();
            display = result.toString();
        }
        equation += input;
        if (input === '+' || input === '-') {
            display += input;
        } else if (input === '*') {
            display += '×';
        } else if (input === '/') {
            display += '÷';
        }
        showText(displayBottom, display);
    } else if (input === '.') {
        equation += input;
        display += input;
        showText(displayBottom, display);
    } else if (input === '%') {
        if (equation.slice(-1) === '=') {
            equation = result.toString();
            display = result.toString();
        }
        equation += '/100';
        display += input;
        showText(displayBottom, display);
    } else if (input === '=') {
        if (equation !== '') {
            try {
                result = eval(equation);
                showText(displayTop, display);
            }
            catch (err) {
                result = 'Syntax Error';
            }
            equation += input;
            showText(displayBottom, result);
        }
    } else if (input === 'D') {
        if (display.slice(-1) === '%') {
            equation = equation.slice(0, -4);
        } else if (equation.slice(-1) === '=') {
            equation = result.toString();
            display = result.toString();
            equation = equation.slice(0, -1);
        } else {
            equation = equation.slice(0, -1);
        }
        display = display.slice(0, -1);
        showText(displayBottom, display);
    } else if (input === 'C') {
        equation = '';
        display = '';
        hideText(displayBottom);
        hideText(displayTop);
    }
}

// Input by click
numpad.addEventListener('click', event => {
    const input = event.target.value;
    calculator(input);
})

const deleteIcon = document.getElementById('delete_icon')
deleteIcon.addEventListener('click', () => {
    calculator('D');
})

// Input by keyboard
document.addEventListener('keydown', event => {
    const input = event.key;
    if (input in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,]) {
        calculator(input);
    } else if (input === '+' || input === '-' || input === '*' || input === '/' || input === '%' || input === '.' || input === '=') {
        calculator(input);
    } else if (input === 'Backspace' || input === 'Delete') {
        calculator('D');
    } else if (input === 'Enter') {
        calculator('=');
    }
})

// Change Theme
const changeTheme = document.getElementById('change_theme');

changeTheme.addEventListener('click', () => {
    if (document.body.className === 'dark-mode') {
        setLightMode();
    } else {
        setDarkMode();
    }
})

function setDarkMode() {
    document.body.classList.add('dark-mode');
    changeTheme.innerHTML = '<i class="ri-moon-fill"></i>';
    saveTeme('darkMode');
}

function setLightMode() {
    document.body.classList.remove('dark-mode');
    changeTheme.innerHTML = '<i class="ri-sun-fill"></i>';
    saveTeme('lightMode');
}

// Get Theme
const theme = localStorage.getItem('theme');

if (theme === 'darkMode') {
    setDarkMode();
} else if (theme === 'lightMode') {
    setLightMode();
}

// Save Theme
function saveTeme(theme) {
    localStorage.setItem('theme', theme);
}