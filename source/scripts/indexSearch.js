//This file is when the user searches a keyword in index.html page
window.addEventListener("DOMContentLoaded", init);

var typeInput = null;
const tagsInput = {};

/**
 * initializes search functionality through the frontend
 */
async function init() {
    let searchBar = document.querySelector("#searchBar");
    let searchButton = document.querySelector("#searchButton");
    searchButton.addEventListener("click", function(){
        updateKeywords(searchBar.value);
        submitSearch();
    });
}

/**
 * updates internal query state to be ready to execute the search
 * @param {string} inputText the search bar content
 */
function updateKeywords(inputText) {
    // TODO (Bjorn): extend search so we can use an array
    // of keywords instead of a string to search by name

    // e = String(e.target.value);
    // e = e.split(" ");
    // // console.log(type(e));
    // for (let i = 0; i < e.length; i++) {
    //     typeInput[i] = e[i];
    // }
    typeInput = inputText;
}

/**
 * sends an HTTP request to the server to fetch the search results
 */
async function submitSearch(){
    console.log("Searching for: " + typeInput);

    const Http = new XMLHttpRequest();
    const url='http://127.0.0.1:3030/api/search?name='+typeInput;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
    }

    // TODO: assign a "score" to how matching the input + tags is to a recipe's title + tags and sort based on this

    // window.location.href='/source/pages/homePage.html';
}