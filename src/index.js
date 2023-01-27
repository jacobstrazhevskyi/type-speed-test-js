/* eslint-disable linebreak-style */
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

function listener(evt) {
    console.log(evt.key);
}

function start() {
    document.removeEventListener('keypress', start);
    console.log('removed');
    document.addEventListener('keydown', listener);
    time = 60;
    timerBar.value = 60;
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
        console.log(time);
    }
}

function startCount() {
    tick();
}

const engUnicodeCodes = [];

for (let i = 65; i <= 90; i++) {
    engUnicodeCodes.push(i);
}
for (let i = 97; i <= 122; i++) {
    engUnicodeCodes.push(i);
}

let languageNow = ruGlossary.split(/\t|\n/g);
languageNow.shift();

const languages = {
    rus: ruGlossary,
    eng: engGlossary,
};

const selectLanguage = document.getElementById('select-language');

for (let i = 0; i < 100; i++) {
    const element = document.createElement('span');
    element.textContent = `${languageNow[Math.floor(Math.random() * languageNow.length)]} `;
    wordsDisplay.appendChild(element);
}

selectLanguage.onchange = function() {
    languageNow = languages[`${selectLanguage.value}`].split(/\t|\n/g);
    languageNow.shift();
    if (selectLanguage.value === 'eng') {
        languageNow = languageNow.filter((elem) => engUnicodeCodes.includes(elem.charCodeAt()));
        languageNow = languageNow.join(' ').split(' ');
        languageNow = languageNow.filter((elem) => engUnicodeCodes.includes(elem.charCodeAt()));
        languageNow = languageNow.filter((elem) => !/[*()-]/g.test(elem.split('')));
    }
    console.log(languageNow);
};

document.addEventListener('keypress', start);
