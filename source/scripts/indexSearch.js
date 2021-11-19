//This file is when the user searches a keyword in index.html page
window.addEventListener('DOMContentLoaded', init);

const typeInput = {};
const tagsInput = {};

async function init() {

    console.log(window.location);

    if (document.querySelector('#keywordSearch')) {
        document.querySelector('#keywordSearch').querySelector('input').addEventListener('change', updateKeywords);
    }

    if ( document.querySelector('#submit')) {
        document.querySelector('#submit').querySelector('input').addEventListener('click', submitSearch);
    }
}

function updateKeywords(e) {
    e = String(e.target.value);
    e = e.split(' ');
    // console.log(type(e));
    for (let i = 0; i < e.length; i++) {
        typeInput[i] = e[i];
    }
}

async function submitSearch(e) {
    // assign a "score" to how matching the input + tags is to a recipe's title + tags
    // window.location.href='/source/pages/homePage.html';
    console.log(e);
    // e.preventDefault();
}