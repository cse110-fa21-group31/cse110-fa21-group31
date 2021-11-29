//This file is when the user searches a keyword in index.html page
export default {init}
if (typeof window === 'object') {
window.addEventListener("DOMContentLoaded", init);
}
import { submitSearch } from "./APICalls.js"
import { createRecipeCards } from "./index.js";

let allTags = ["Easy", "Intermediate", "Hard", "Vegetarian", "Breakfast", "Dinner", "Appetizer", "Lunch", "Beverage"];
let selectedTags = [];

/**
 * initializes search functionality through the frontend
 */
async function init() {
    let searchBar = document.querySelector("#searchBarHome");
    let searchButton = document.querySelector("#searchButtonHome");
    if (searchButton) {
        searchButton.addEventListener("click", async function () {
            let searchResults = await submitSearch(searchBar.value, selectedTags);
            createRecipeCards(searchResults);
        });
    }

    let tagsSelect = document.getElementById("tagsList");
    //console.log(tagsSelect);
    if (tagsSelect) {
        chooseTag(this);
        let tagButtons = document.getElementsByClassName("tagButton");
        for (let i = 0; i < tagButtons.length; i++) {
            //e.stopPropagation();
            tagButtons[i].addEventListener('click', (e) => {
                clickedOnATag(tagButtons[i]);
            });
        }
    }
}

function chooseTag(e) {
    let tagsList = document.querySelector("#tagsList");
    tagsList.style.display = "grid";
    for (let i = 0 ; i < allTags.length; i++) {
        let addTagButton = document.createElement("button");
        addTagButton.classList.add("tagButton");
        addTagButton.innerText = allTags[i];
        addTagButton.id = allTags[i];
        tagsList.appendChild(addTagButton);
    }
}

function clickedOnATag(e) {
    let index = selectedTags.indexOf(e.innerText);
    if (index > -1) {
        e.style.color = "white";
        selectedTags.splice(index,1);
    } else {
        e.style.color = "red";
        selectedTags.push(e.innerText);
    }
}
