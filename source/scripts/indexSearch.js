/**
 * Populates tags and binds search functionality 
 * to the search bar and tags.
 * 
 * @since 12.09.21
 */
import { createNodeClone } from "./util.js";
export default { init, initialRecipeCards };
if (typeof window === "object") {
    window.addEventListener("DOMContentLoaded", init);
}
import {
    submitSearch,
    submitInitialSearch,
 } from "./APICalls.js";

import { createRecipeCards } from "./index.js";

const difficultyTags = ["Easy", "Intermediate", "Hard"];
const mealTimeTags = ["Breakfast", "Lunch", "Dinner", "Appetizer", "Dessert"];
const dietaryTags = ["Vegetarian", "Vegan"];
let selectedTags = [];
let curr_page = 1;
let max_page = 1;

/**
 * Ties search functionality to the search bar, buttons and tags,
 * populates tags and adds click event listener for styling and search.
 */
async function init() {
    
    //Search bar and button
    createNodeClone("#searchBar", true);
    createNodeClone("#searchButton", true);
    let searchBar = document.querySelector("#searchBar");
    let searchButton = document.querySelector("#searchButton");

    searchButton.addEventListener("click", async function () {
        submitNewSearch();
    });

    searchBar.addEventListener("keydown", async function (event) {
        // If enter key is pressed, suppress default rerouting and submit search
        if (event.keyCode === 13) {
            event.preventDefault();
            submitNewSearch();
        }
    });

    //Page scroll buttons
    let scrollLeftButton = document.querySelector("#scrollLeft");
    let scrollRightButton = document.querySelector("#scrollRight");

    scrollRightButton.addEventListener("click", async function () {
        if (curr_page < max_page) {
            curr_page++;
            let results = await submitSearch(
                searchBar.value,
                selectedTags,
                curr_page
            );
            createRecipeCards(results);
            document.getElementById("homePageNum").innerHTML =
                "Page: " + curr_page + " / " + max_page;
        }
    });

    scrollLeftButton.addEventListener("click", async function () {
        if (curr_page > 1) {
            curr_page--;
            let results = await submitSearch(
                searchBar.value,
                selectedTags,
                curr_page
            );
            createRecipeCards(results);
            document.getElementById("homePageNum").innerHTML =
                "Page: " + curr_page + " / " + max_page;
        }
    });

    //Populate tags
    let tagsSelect = document.getElementById("tagsTitles");
    if (tagsSelect) {
        addTags();
        let tagButtons = document.getElementsByClassName("tagButton");
        for (let i = 0; i < tagButtons.length; i++) {
            tagButtons[i].addEventListener("click", () => {
                clickedOnATag(tagButtons[i]);
            });
        }
    }
}

/**
 * Refreshes displayed recipes with new search results.
 */
async function submitNewSearch() {
    /* eslint-disable no-undef */
    let searchResults = await submitInitialSearch(
        searchBar.value,
        selectedTags
    );
    /* eslint-enable no-undef */
    createRecipeCards(searchResults.results);
    curr_page = 1;
    max_page = searchResults.pages.pages;
    document.getElementById("homePageNum").innerHTML =
        "Page: " + curr_page + " / " + max_page;
}

/**
 * Populates the tags into a grid by category.
 */
function addTags() {
    
    //Difficulty
    let tagsList = document.getElementById("tagsListDiff");
    tagsList.style.display = "grid";
    for (let name of difficultyTags) {
        let addTagButton = document.createElement("button");
        addTagButton.classList.add("tagButton");
        addTagButton.innerText = name;
        addTagButton.id = name;
        tagsList.appendChild(addTagButton);
    }

    //Meal Time
    tagsList = document.getElementById("tagsListMt");
    tagsList.style.display = "grid";
    for (let name of mealTimeTags) {
        let addTagButton = document.createElement("button");
        addTagButton.classList.add("tagButton");
        addTagButton.innerText = name;
        addTagButton.id = name;
        tagsList.appendChild(addTagButton);
    }

    //Dietary
    tagsList = document.getElementById("tagsListDiet");
    tagsList.style.display = "grid";
    for (let name of dietaryTags) {
        let addTagButton = document.createElement("button");
        addTagButton.classList.add("tagButton");
        addTagButton.innerText = name;
        addTagButton.id = name;
        tagsList.appendChild(addTagButton);
    }
}

/**
 * Populates the tags into a grid by category.
 * 
 * @param e The tag element
 */
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
 * Initial render of recipe cards.
 */
export async function initialRecipeCards() {
    submitNewSearch();
}
