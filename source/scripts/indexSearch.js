//This file is when the user searches a keyword in index.html page
window.addEventListener("DOMContentLoaded", init);

import {submitSearch} from "./APICalls.js"

/**
 * initializes search functionality through the frontend
 */
async function init() {
    let searchBar = document.querySelector("#searchBar");
    let searchButton = document.querySelector("#searchButton");
    searchButton.addEventListener("click", function(){
        // TODO: Add a tags field to the search bar and make use of it
        submitSearch(searchBar.value);
    });
}