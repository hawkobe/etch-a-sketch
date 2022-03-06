const DEFAULT_SIZE = 16
const DEFAULT_MODE = 'Color'

let currentSize = DEFAULT_SIZE;
let currentMode = DEFAULT_MODE;


const grid = document.querySelector('.grid');
const colorPicker = document.querySelector('#color-selector');
const gridSlider = document.querySelector('#gridSlider');
const clearbtn = document.querySelector('.clear');
const controlButtons = document.querySelectorAll('button');

let gridSize = document.querySelector('.size-value');
gridSize.textContent = `${DEFAULT_SIZE} x ${DEFAULT_SIZE}`;


let sketching = false;
let changingSlider = false;

function applyCurrentSize(changedSize) {
    currentSize = changedSize;
}

function createGrid(size) {
    let boxWidth = grid.clientWidth / size;

    for (let i = 0; i < (size * Math.round(size * .75)); i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        square.style.width = `${boxWidth}px`;
        square.addEventListener('mousedown', dragSketch);
        square.addEventListener('mouseenter', dragSketch);
        grid.appendChild(square);
    }
}

function toggleActive(e) {
    e.target.classList.add('active');
    currentMode = e.target.textContent;
    controlButtons.forEach(button => {
        if (button !== e.target) {
            button.classList.remove('active');
        }
    });
}

function startSketch() {
    if (currentMode === 'Color') {
        this.style.backgroundColor = colorPicker.value;
    } else if (currentMode === 'Rainbow') {
        let hue = Math.floor(Math.random() * 360);
        this.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
    }
}

function dragSketch(e) {
    if (e.type === 'mouseenter' && !sketching) return;

    if (currentMode === 'Color') {
        this.style.backgroundColor = colorPicker.value;
    } else if (currentMode === 'Rainbow') {
        let hue = Math.floor(Math.random() * 360);
        this.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
    } else if (currentMode === 'Grayscale') {
        let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
        if (currentOpacity <= 0.9) {
            this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1}`;
        } else {
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        }
    } else if (currentMode === 'Erase') {
        this.style.backgroundColor = `rgb(218, 218, 218)`;
    }
}

function changeSizeValue(e) {
    if (!changingSlider) return;
    gridSize.textContent = `${gridSlider.value} x ${Math.round(gridSlider.value * .75)}`;
}

function newSize(sliderValue) {
    applyCurrentSize(sliderValue);
    resetGrid();
}

function resetGrid() {
    wipeGrid();
    createGrid(currentSize);
}

function wipeGrid() {
    grid.innerHTML = ''
}

document.body.addEventListener('mousedown', () => sketching = true);
document.body.addEventListener('mouseup', () => sketching = false);
gridSlider.addEventListener('mousedown', () => changingSlider = true);
gridSlider.addEventListener('mouseup', () => changingSlider = false);
gridSlider.addEventListener('mousemove', changeSizeValue);
gridSlider.addEventListener('change', e => newSize(e.target.value));
clearbtn.addEventListener('click', resetGrid);
controlButtons.forEach(button => button.addEventListener('click', toggleActive));


window.onload = () => {
    createGrid(DEFAULT_SIZE);
    controlButtons.forEach(button => {
        if (button.classList.contains('color')) {
            button.classList.add('active');
        }
    });
}