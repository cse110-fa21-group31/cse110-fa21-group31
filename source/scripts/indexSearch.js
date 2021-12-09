//This file is when the user searches a keyword in index.html page
import { createNodeClone } from './util.js';
export default { init, initialRecipeCards }
if (typeof window === 'object') {
    window.addEventListener("DOMContentLoaded", init);
}
import { submitSearch, submitInitialSearch } from "./APICalls.js"
import { createRecipeCards } from "./index.js";

let allTags = ["Easy", "Intermediate", "Hard", "Vegetarian", "Breakfast", "Lunch", "Dinner", "Appetizer", "Dessert", "Vegan"];
let difficultyTags = ["Easy", "Intermediate", "Hard"];
let mealTimeTags = ["Breakfast", "Lunch", "Dinner", "Appetizer", "Dessert"];
let dietaryTags = ["Vegetarian", "Vegan"];
let selectedTags = [];
let curr_page = 1;
let max_page = 1;
/**
 * initializes search functionality through the frontend
 */
async function init() {
    // TODO: Make sure this works for both landing and home pages
    createNodeClone('#searchBar', true);
    let searchBar = document.querySelector("#searchBar");
    createNodeClone('#searchButton', true);
    let searchButton = document.querySelector("#searchButton");
    let scrollLeftButton = document.querySelector("#scrollLeft");
    let scrollRightButton = document.querySelector("#scrollRight");

    searchButton.addEventListener("click", async function() {
        submitNewSearch();

    });

    searchBar.addEventListener("keydown", async function(event) {
        // If enter key is pressed, suppress default rerouting and submit search
        if (event.keyCode === 13) {
            event.preventDefault();
            submitNewSearch();
        }
    });

    scrollRightButton.addEventListener("click", async function() {
        if (curr_page < max_page) {
            curr_page++;
            let results = await submitSearch(searchBar.value, selectedTags, curr_page);
            createRecipeCards(results);
            document.getElementById('homePageNum').innerHTML = 'Page: ' + curr_page + ' / ' + max_page;
        }
    });

    scrollLeftButton.addEventListener("click", async function() {
        if (curr_page > 1) {
            curr_page--;
            let results = await submitSearch(searchBar.value, selectedTags, curr_page);
            createRecipeCards(results);
            document.getElementById('homePageNum').innerHTML = 'Page: ' + curr_page + ' / ' + max_page;
        }
    });

    let tagsSelect = document.getElementById("tagsTitles");
    // console.log(tagsSelect);
    if (tagsSelect) {
        addTags(this);
        let tagButtons = document.getElementsByClassName("tagButton");
        for (let i = 0; i < tagButtons.length; i++) {
            //e.stopPropagation();
            tagButtons[i].addEventListener('click', (e) => {
                clickedOnATag(tagButtons[i]);
            });
            /** 
                        tagButtons[i].addEventListener('mouseover', (e) => {
                            onHover(tagButtons[i]);
                        });
                        tagButtons[i].addEventListener('mouseout', (e) => {
                            offHover(tagButtons[i]);
                        });
                        */

        }
    }
}

async function submitNewSearch() {
    let searchResults = await submitInitialSearch(searchBar.value, selectedTags);
    createRecipeCards(searchResults.results);
    curr_page = 1;
    max_page = searchResults.pages.pages;
    document.getElementById('homePageNum').innerHTML = 'Page: ' + curr_page + ' / ' + max_page;
}

function addTags(e) {
    
    //Difficulty
    let tagsList = document.getElementById("tagsListDiff");
    tagsList.style.display = "grid";
    for (let i of difficultyTags) {
        let addTagButton = document.createElement("button");
        addTagButton.classList.add("tagButton");
        addTagButton.innerText = i;
        addTagButton.id = i;
        tagsList.appendChild(addTagButton);
    }

    //Meal Time
    tagsList = document.getElementById("tagsListMt");
    tagsList.style.display = "grid";
    for (let i of mealTimeTags) {
        let addTagButton = document.createElement("button");
        addTagButton.classList.add("tagButton");
        addTagButton.innerText = i;
        addTagButton.id = i;
        tagsList.appendChild(addTagButton);
    }

    //Dietary
    tagsList = document.getElementById("tagsListDiet");
    tagsList.style.display = "grid";
    for (let i of dietaryTags) {
        let addTagButton = document.createElement("button");
        addTagButton.classList.add("tagButton");
        addTagButton.innerText = i;
        addTagButton.id = i;
        tagsList.appendChild(addTagButton);
    }
}

function clickedOnATag(e) {
    let index = selectedTags.indexOf(e.innerText);
    if (index > -1) {
        e.style.color = "white";
        selectedTags.splice(index, 1);
        e.style.backgroundColor = "#fcaf58";
        e.style.borderColor = "#fcaf58";
        e.style.setProperty = "#f9c784";
    } else {
        e.style.backgroundColor = "#4e598c";
        e.style.borderColor = "#4e598c";
        selectedTags.push(e.innerText);
    }
    submitNewSearch();
}
/** 
function onHover(e) {
    let index = selectedTags.indexOf(e.innerText);
    if (index > -1) {
        e.style.backgroundColor = "#f9c784";
        e.style.borderColor = "#f9c784";
    } else {
        e.style.backgroundColor = "#4e598c";
        e.style.borderColor = "#4e598c";
    }
}

function offHover(e) {
    let index = selectedTags.indexOf(e.innerText);
    if (index > -1) {
        e.style.backgroundColor = "#fcaf58";
        e.style.borderColor = "#fcaf58";
    } 
}
*/

/**
 * Initial render of recipe cards. 
 */
export async function initialRecipeCards() {
    submitNewSearch();
}