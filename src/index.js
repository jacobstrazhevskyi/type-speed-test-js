/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-plusplus */
/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-console */

// eslint-disable-next-line import/extensions
import ruGlossary from './glossaries/ruGlossary.js';
// eslint-disable-next-line import/extensions
import engGlossary from './glossaries/engGlossary.js';

let time = 60;
let intervalId;
const timerBar = document.getElementById('timer');
const wordsDisplay = document.getElementById('wordsDisplay');
const input = document.getElementById('input');
let marg = document.body.clientWidth / 2;

input.style.left = `${(document.body.clientWidth / 2) + 6}px`;

const engUnicodeCodes = [];

for (let i = 65; i <= 90; i++) {
    engUnicodeCodes.push(i);
}

for (let i = 97; i <= 122; i++) {
    engUnicodeCodes.push(i);
}

engUnicodeCodes.push(189);

const selectLanguage = document.getElementById('select-language');

input.focus();

console.log('z'.charCodeAt());

let wordNowIndex = 1;
let wordNowLetterIndex = 0;
let wordWrited = false;
let writtenWord = '';

const ruKeys = [70, 188, 68, 85, 76, 84, 192, 186, 80, 66, 81, 82, 75, 86, 89, 74, 71, 72, 67, 78, 69, 65, 219, 87, 88, 73, 79, 221, 83, 77, 222, 190, 90, 189];

setInterval(() => {
    input.value = '';
}, 1);

function listener(evt) {
    let wordNow = '';
    for (let i = 0; i < wordsDisplay.children[wordNowIndex].children.length; i++) {
        wordNow += wordsDisplay.children[wordNowIndex].children[i].textContent;
    }
    if (evt.key === 'Backspace') {
        if (wordNowLetterIndex > 0) {
            wordNowLetterIndex--;
            marg += 11;
            wordsDisplay.children[wordNowIndex].children[wordNowLetterIndex].setAttribute('style', 'opacity: 1; color: black;');
            writtenWord = writtenWord.split('');
            writtenWord.pop();
            writtenWord = writtenWord.join('');
        }
        wordsDisplay.children[1].setAttribute('style', `margin-left:${marg}px;`);
        return;
    }
    if (selectLanguage.value === 'rus') {
        if (ruKeys.includes(evt.keyCode) || evt.keyCode === 32) {
            if (wordsDisplay.children[wordNowIndex].children[wordNowLetterIndex].textContent === evt.key) {
                wordsDisplay.children[wordNowIndex].children[wordNowLetterIndex].setAttribute('style', 'opacity: 0.1;');
                wordNowLetterIndex++;
                marg -= 11;
                writtenWord += evt.key;
            } else {
                wordsDisplay.children[wordNowIndex].children[wordNowLetterIndex].setAttribute('style', 'color: red;');
                wordNowLetterIndex++;
                marg -= 11;
                writtenWord += evt.key;
            }
        }
    } else if (selectLanguage.value === 'eng') {
        if (engUnicodeCodes.includes(evt.keyCode) || evt.keyCode === 32) {
            if (wordsDisplay.children[wordNowIndex].children[wordNowLetterIndex].textContent === evt.key) {
                wordsDisplay.children[wordNowIndex].children[wordNowLetterIndex].setAttribute('style', 'opacity: 0.1;');
                wordNowLetterIndex++;
                marg -= 11;
                writtenWord += evt.key;
            } else {
                wordsDisplay.children[wordNowIndex].children[wordNowLetterIndex].setAttribute('style', 'color: red;');
                wordNowLetterIndex++;
                marg -= 11;
                writtenWord += evt.key;
            }
        }
    }
    
    console.log(wordNow);
    console.log(evt.keyCode);
    
    console.log(writtenWord);
    
    if (writtenWord.length === wordNow.length) {
        wordWrited = true;
    }
    
    if (wordWrited) {
        writtenWord = '';
        wordNowIndex++;
        wordWrited = false;
        wordNowLetterIndex = 0;
    }
    wordsDisplay.children[1].setAttribute('style', `margin-left:${marg}px;`);
}

function start() {
    document.removeEventListener('keypress', start);
    console.log('removed');
    document.addEventListener('keydown', listener);
    time = 60;
    timerBar.value = 60;
    wordsDisplay.children[1].setAttribute('style', 'margin-left: 50%;');
    // eslint-disable-next-line no-use-before-define
    intervalId = setInterval(startCount, 1000);
}

function tick() {
    if (time === 0) {
        clearInterval(intervalId);
        console.log('Time is out!');
        document.removeEventListener('keypress', listener);
        document.addEventListener('keypress', start);
    }
    if (time > 0) {
        time--;
        timerBar.value--;
        // console.log(time);
    }
}

function startCount() {
    tick();
}

let languageNow = ruGlossary.split(/\t|\n/g);
languageNow.shift();

const languages = {
    rus: ruGlossary,
    eng: engGlossary,
};

function generateWordArray() {
    for (let i = 0; i < 100; i++) {
        const element = document.createElement('span');
        const word = `${languageNow[Math.floor(Math.random() * languageNow.length)]} `.split('');
        for (let j = 0; j < word.length; j++) {
            const wordSpan = document.createElement('span');
            wordSpan.textContent = word[j];
            element.appendChild(wordSpan);
        }
        wordsDisplay.appendChild(element);
    }
}

generateWordArray();

console.log(wordsDisplay);
console.log(document.body.clientWidth / 2);

selectLanguage.onchange = () => {
    languageNow = languages[`${selectLanguage.value}`].split(/\t|\n/g);
    languageNow.shift();
    if (selectLanguage.value === 'eng') {
        languageNow = languageNow.filter((elem) => engUnicodeCodes.includes(elem.charCodeAt()));
        languageNow = languageNow.join(' ').split(' ');
        languageNow = languageNow.filter((elem) => engUnicodeCodes.includes(elem.charCodeAt()));
        languageNow = languageNow.filter((elem) => !/[*()-]/g.test(elem.split('')));
    }
    console.log(languageNow);
    while (wordsDisplay.children.length !== 1) {
        wordsDisplay.children[wordsDisplay.children.length - 1].remove();
    }
    generateWordArray();
    wordsDisplay.children[1].setAttribute('style', 'margin-left: 50%;');
    marg = document.body.clientWidth / 2;
    wordNowIndex = 1;
    wordNowLetterIndex = 0;
    wordWrited = false;
    writtenWord = '';  
    time = 60;
    timerBar.value = 60;
    clearInterval(intervalId);
    document.removeEventListener('keypress', listener);
    document.addEventListener('keypress', start);
    console.log(wordsDisplay.children);
    console.log(wordsDisplay);
};

document.addEventListener('keypress', start);

console.log(wordsDisplay.children);
