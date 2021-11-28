//This file is when the user searches a keyword in index.html page
export default {init}
if (typeof window === 'object') {
window.addEventListener("DOMContentLoaded", init);
}
import { submitSearch } from "./APICalls.js"

let allTags = ["Easy", "Intermediate", "Hard", "Vegetarian", "Breakfast", "Dinner", "Appetizer", "Lunch", "Beverage"];
let selectedTags = [];

/**
 * initializes search functionality through the frontend
 */
async function init() {
    let searchBar = document.querySelector("#searchBar");
    let searchButton = document.querySelector("#searchButton");
    if (searchButton) {
        searchButton.addEventListener("click", function () {
            // TODO: Add a tags field to the search bar and make use of it
            submitSearch(searchBar.value);
        });
    }

    let tagsSelect = document.getElementById("selectTagButton");
    //console.log(tagsSelect);
    if (tagsSelect) {
        //console.log("found tag");
        tagsSelect.addEventListener("click", (event) => {
            chooseTag(this);
            event.stopPropagation();
            let tagButtons = document.getElementsByClassName("tagButton");
            for (let i = 0; i < tagButtons.length; i++) {
                //e.stopPropagation();
                tagButtons[i].addEventListener('click', (e) => {
                    e.stopPropagation();
                    clickedOnATag(tagButtons[i]);
                });
            }
        });
    }
}

function chooseTag(e) {
    let tagsList = document.querySelector("#tagsList");
    if (document.getElementsByClassName("tagButton").length > 0) {
        //remove tag options
        tagsList = document.getElementsByClassName("tagButton");
        let tagsLength = tagsList.length;
        for (let i = 0 ; i < tagsLength; i++) {
            tagsList[0].remove();
        }
    } else {
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
    return Promise.resolve(tagsList);
}

function clickedOnATag(e) {
    console.log("Clicked on tag");
    selectedTags.push(e.innerText);
    console.log(selectedTags);
}
