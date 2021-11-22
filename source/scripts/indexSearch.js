//This file is when the user searches a keyword in index.html page
window.addEventListener("DOMContentLoaded", init);

const tagsInput = {};

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

/**
 * sends an HTTP request to the server to fetch the search results
 * @param {string} keywords words to search for in the name of recipes
 * @param {Array<string>} tags tags to filter results by
 * @returns {Array<recipe>} the recipes returned by the search engine
 */
async function submitSearch(keywords, tags){
    console.log("Searching for: " + keywords);

    let params = "name=" + keywords;
    if(tags){
        params = params + '&' + "tags=" + JSON.stringify(tags);
    }
    console.log("params: " + params);
    const url='http://127.0.0.1:3030/api/search?'+params;
    await fetch(url, {
        method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("Search Results:");
        console.log(data);
        return data
    })
    .catch((err) => {
        console.log('Error searching for recipes');
        reject(err);
    });
}