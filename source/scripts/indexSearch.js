//This file is when the user searches a keyword in index.html page
export default { init }
if (typeof window === 'object') {
    window.addEventListener("DOMContentLoaded", init);
}
import { submitSearch } from "./APICalls.js"
import { createRecipeCards } from "./index.js";

let allTags = ["Easy", "Intermediate", "Hard", "Vegetarian", "Breakfast", "Dinner", "Appetizer", "Lunch", "Vegan"];
let selectedTags = [];
/**
 * initializes search functionality through the frontend
 */
async function init() {
    // TODO: Make sure this works for both landing and home pages
    let searchBar = document.querySelector("#searchBar");
    let searchButton = document.querySelector("#searchButton");
    if (searchButton) {
        searchButton.addEventListener("click", async function() {
            let searchResults = await submitSearch(searchBar.value, selectedTags);
            createRecipeCards(searchResults);
        });
    }
    if (searchBar) {
        searchBar.addEventListener("keydown", async function(event) {
            // If enter key is pressed, suppress default rerouting and submit search
            if(event.keyCode === 13){
                event.preventDefault();
                let searchResults = await submitSearch(searchBar.value, selectedTags);
                createRecipeCards(searchResults);
            }
        });
    }
    let tagsSelect = document.getElementById("tagsList");
    // console.log(tagsSelect);
    if (tagsSelect) {
        chooseTag(this);
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

function chooseTag(e) {
    let tagsList = document.querySelector("#tagsList");
    tagsList.style.display = "grid";
    for (let i = 0; i < allTags.length; i++) {
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
        selectedTags.splice(index, 1);
        e.style.backgroundColor = "#fcaf58";
        e.style.borderColor = "#fcaf58";
        e.style.setProperty = "#f9c784";
    } else {
        e.style.backgroundColor = "#4e598c";
        e.style.borderColor = "#4e598c";
        selectedTags.push(e.innerText);
    }
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