/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-console */

// eslint-disable-next-line import/extensions
import ruGlossary from './glossaries/ruGlossary.js';
// eslint-disable-next-line import/extensions
import engGlossary from './glossaries/engGlossary.js';

// const ruUnicodeCodes = [];
const engUnicodeCodes = [];

// for (let i = 1040; i <= 1103; i++) {
//     ruUnicodeCodes.push(i);
// }
// ruUnicodeCodes.push(1025, 1105);

for (let i = 65; i <= 90; i++) {
    engUnicodeCodes.push(i);
}
for (let i = 97; i <= 122; i++) {
    engUnicodeCodes.push(i);
}

let languageNow = ruGlossary;

const languages = {
    rus: ruGlossary,
    eng: engGlossary,
};

const selectLanguage = document.getElementById('select-language');
const wordsDisplay = document.getElementById('wordsDisplay');

selectLanguage.onchange = function() {
    languageNow = languages[`${selectLanguage.value}`].split(/\t|\n/g);
    languageNow.shift();
    if (selectLanguage.value === 'eng') {
        languageNow = languageNow.filter((elem) => engUnicodeCodes.includes(elem.charCodeAt()));
    }
    console.log(languageNow);
};

function listener(evt) {
    console.log(evt.key);
}

function start() {
    document.removeEventListener('keypress', start);
    console.log('removed');
    document.addEventListener('keypress', listener);
}

document.addEventListener('keypress', start);