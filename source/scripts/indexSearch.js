//This file is when the user searches a keyword in index.html page
export default {init}
if (typeof window === 'object') {
window.addEventListener("DOMContentLoaded", init);
}
import { submitSearch } from "./APICalls.js"

/**
 * initializes search functionality through the frontend
 */
async function init() {
    let searchBar = document.querySelector("#searchBar");
    let searchButton = document.querySelector("#searchButton");
    searchButton.addEventListener("click", async function () {
        // TODO: Add a tags field to the search bar and make use of it
        let results = await submitSearch(searchBar.value);
        console.log("Search Results:");
        console.log(results);
    });
}