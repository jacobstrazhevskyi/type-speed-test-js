/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-console */

// eslint-disable-next-line import/extensions
import ruGlossary from './glossaries/ruGlossary.js';

let languageNow = ruGlossary;

const languages = {
    rus: ruGlossary,
};

const selectLanguage = document.getElementById('select-language');
const wordsDisplay = document.getElementById('wordsDisplay');

selectLanguage.onchange = function() {
    languageNow = languages[`${selectLanguage.value}`].split('\n');
    if (selectLanguage.value === 'rus') {
        languageNow.shift();
    }
    console.log(languageNow);
};

document.addEventListener('keypress', listener);

function start() {

}

function listener(evt) {
    console.log(evt.key);
}
