/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-plusplus */
/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */

// IMPORTS
import ruGlossary from './glossaries/ruGlossary.js'; // imports russian words
import engGlossary from './glossaries/engGlossary.js'; // imports english words

/*                   CONSTANTS                            */
const timerBar = document.getElementById('timer'); // progress bar for timer element

const wordsDisplay = document.getElementById('wordsDisplay'); // display of words element
const input = document.getElementById('input'); // for dicorative carret element
const blinkingTablet = document.getElementById('blinking-tablet'); // blinking "PRESS ANY KEY TO START" tablet element

// over tablet
const overTablet = document.querySelector('.over-tablet'); // over tablet element
const closeTabletButton = document.querySelector('.close-button'); // close over tablet button element
const screenBlocker = document.querySelector('.fullscreen-blocker'); // element for block screen when over tablet is opened
const resultsTablet = document.querySelector('.results'); // results display element inside over tablet
const shareButton = document.querySelector('.share-button'); // share button element inside over tablet

// counts block
const wpmDisplay = document.getElementById('wpm-display'); // words per minute display element
const cpmDisplay = document.getElementById('cpm-display'); // chars per minute display element
const accuracyDisplay = document.getElementById('accuracy-display'); // accuracy of input display element

const selectLanguage = document.getElementById('select-language'); // select language variable
const languages = { // languages object
    rus: ruGlossary,
    eng: engGlossary,
};

const engUnicodeCodes = []; // english unicode positions array
const ruKeys = [70, 188, 68, 85, 76, 84, 192, 186, 80, 66, 81, 82, 75, 86, 89, 74, 71, 72, 67, 78, 69, 65, 219, 87, 88, 73, 79, 221, 83, 77, 222, 190, 90, 189]; // codes of russian keys array, for event listener

/*           "let" VARIABLES           */
let time = 60; // timer variable
let intervalId; // interval ID for stop timer

let wpm = 0; // words per minute count
let cpm = 0; // chars per minute count
let accuracy = 100; // accuracy of input

let marg = document.body.clientWidth / 2; // this variable for calculate margin for first word on display

let languageNow = ruGlossary.split(/\t|\n/g); // selected language variable

let wrongLetters = 0; // wrong letters count
let wordNowIndex = 1; // index of word in display array
let wordNowLetterIndex = 0; // index of letter of word in display array
let wordWrited = false; // boolean checker for word writed or no
let writtenWord = ''; // written word

// preprocess for style
input.style.left = `${(document.body.clientWidth / 2) + 6}px`;
overTablet.style.left = `${(document.body.clientWidth / 2) - 250}px`;
overTablet.style.top = `${document.body.clientHeight / 2}px`;

/* preparatory part of the code */
for (let i = 65; i <= 90; i++) {
    engUnicodeCodes.push(i);
}

for (let i = 97; i <= 122; i++) {
    engUnicodeCodes.push(i);
}

engUnicodeCodes.push(189);

languageNow.shift();
/* ***************************** */

/*                          FUNCTIONS                                  */
// this function cleans up the decorative input asynchronously every 1ms
setInterval(() => {
    input.value = '';
}, 1);

function percentCorrectnessCalculationFunction(wrongLettersCount, correctLettersCount) { /* this function calculate percent of corectness of input */
if (correctLettersCount === 0) {
        return 100;
    }
    return Math.round(100 - (wrongLettersCount / correctLettersCount * 100));
}

function generateWordArray() { /* this function generate word array, and then displays the words */
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

function clearWordDisplay() { /* this function cleans display with words ( with small bugs :) ) */
    for (let i = 1; i < wordsDisplay.children.length; i++) {
        wordsDisplay.children[i].remove();
    }
}

function listener(evt) { /* this function to track keystrokes, and check for correct input */
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
                wrongLetters++;
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
                wrongLetters++;
                marg -= 11;
                writtenWord += evt.key;
            }
        }
    }
    
    if (writtenWord === wordNow) {
        wpm++;
        accuracy = percentCorrectnessCalculationFunction(wrongLetters, cpm);
    }

    if (writtenWord.length === wordNow.length) {
        wordWrited = true;
    }
    
    if (wordWrited) {
        writtenWord = '';
        wordNowIndex++;
        wordWrited = false;
        wordNowLetterIndex = 0;
        cpm += wordNow.length - 1;
        cpmDisplay.textContent = cpm;
        wpmDisplay.textContent = wpm;
        accuracyDisplay.textContent = `${accuracy}%`;
    }
    wordsDisplay.children[1].setAttribute('style', `margin-left:${marg}px;`);
}

function start() { /* this function starts test */
    blinkingTablet.style.display = 'none';
    input.focus();
    document.removeEventListener('keypress', start);
    document.addEventListener('keydown', listener);
    time = 60;
    timerBar.value = 60;
    wordsDisplay.children[1].setAttribute('style', 'margin-left: 50%;');
    marg = document.body.clientWidth / 2;
    // eslint-disable-next-line no-use-before-define
    intervalId = setInterval(startCount, 1000);
}

closeTabletButton.onclick = () => { /* this function reacts when the result pane is closed */
    overTablet.style.display = 'none';
    screenBlocker.style.display = 'none';
    cpm = 0;
    wpm = 0;
    accuracy = 100;
    // i dont know, how to fix bug with clearing display, and i do that)) Maybe I'll figure out how to rewrite this function later
    clearWordDisplay();
    clearWordDisplay();
    clearWordDisplay();
    clearWordDisplay();
    clearWordDisplay();
    generateWordArray();
    blinkingTablet.style.display = 'block';
    document.addEventListener('keypress', start);
    cpmDisplay.textContent = cpm;
    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = `${accuracy}%`;
};

shareButton.onclick = () => { /* this function reacts whet the share results button is clicked, and copy results to clipboard */
    navigator.clipboard.writeText(`You type with the speed of ${wpm} WPM (${cpm} CPM). Your accuracy was ${accuracy}%. Good job!`);
};

function tick() { /* this is the main function of the timer, which, depending on the remaining time, produces a tick of the timer (in seconds) */
    if (time === 0) {
        clearInterval(intervalId);
        document.removeEventListener('keydown', listener);
        wordsDisplay.children[1].setAttribute('style', 'transition: all 1s ease-in-out; margin-left: 50%;');
        resultsTablet.innerHTML = `
        <b id="tosel">Neat!</b>
        <br>
        You type with the speed of
        ${wpm} WPM (${cpm} CPM).
        <br>
        Your accuracy was ${accuracy}%. Good job!`;
        overTablet.style.display = 'flex';
        wordNowIndex = 1;
        wordNowLetterIndex = 0;
        wordWrited = false;
        writtenWord = '';
    }
    if (time > 0) {
        time--;
        timerBar.value--;
        // console.log(time);
    }
}

function startCount() { /* this function triggers ticks */
    tick();
}

generateWordArray();

selectLanguage.onchange = () => { /* this function selects the test language depending on the value of the select tag */
    languageNow = languages[`${selectLanguage.value}`].split(/\t|\n/g);
    languageNow.shift();
    if (selectLanguage.value === 'eng') {
        languageNow = languageNow.filter((elem) => engUnicodeCodes.includes(elem.charCodeAt()));
        languageNow = languageNow.join(' ').split(' ');
        languageNow = languageNow.filter((elem) => engUnicodeCodes.includes(elem.charCodeAt()));
        languageNow = languageNow.filter((elem) => !/[*()-]/g.test(elem.split('')));
    }
    while (wordsDisplay.children.length !== 1) {
        wordsDisplay.children[wordsDisplay.children.length - 1].remove();
    }
    clearWordDisplay();
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
    blinkingTablet.style.display = 'block';
};

document.addEventListener('keypress', start); // adding event listener to start test
