// import RecipeClass from "./recipeClass";
// The purpose of this JS file is to take API JSON files, create recipeClass objects with that info, and "send" them out to the website

// RecipeExpand.js
const url = "http://127.0.0.1:3030/api"
window.addEventListener("DOMContentLoaded", init);

import { fetchRecipeById } from "./APICalls.js"

// THESE SHOULD BE GIVEN VIA API
const recipeIDs = [
    "FDZwXzmQa5J7tYbn"
]
const recipeData = {};

async function init() {
    let recipeID = 'FDZwXzmQa5J7tYbn';
    let recipe = await fetchRecipeById(recipeID);

    fillOutRecipe(recipe);
    //fetchRecipes();
}

/** 
async function fetchRecipes() {
    for (let id of recipeIDs) {
        let recipe = await fetchRecipeById(id);
        recipeData[id] = recipe;
    }
}
*/

/**
 * Generates the <recipeCard> elements from the fetched recipes and
 * appends them to the page
 */
function createRecipeCards() {
    // Makes a new recipe card
    const recipeCard = document.createElement('recipeCard');
    // Inputs the data for the card. This is just the first recipe in the recipes array,
    // being used as the key for the recipeData object
    recipeCard.data = recipeData[recipeIDs[0]];

    for (let id of recipeIDs) {
        const recipeCard = document.createElement('recipe-card');
        console.log("Created recipe-card");
        recipeCard.data = recipeData[id];
        console.log(recipeCard.data);
        /*
        const page = recipeData[json]['page-name'];
        router.addPage(page, function () {
          document.querySelector('.section--recipe-cards').classList.remove('shown');
          document.querySelector('.section--recipe-expand').classList.add('shown');
          document.querySelector('recipe-expand').data = recipeData[json];
        });
        if (i > 2) {
          recipeCard.classList.add('hidden');
        }
        */
        //bindRecipeCard(recipeCard, page);
        document.querySelector('.myRecipeCardGridContainer').appendChild(recipeCard);
    }
}

function fillOutRecipe(data) {
    document.getElementById("recipeTitle").innerHTML = data.name;

    document.getElementById("tags").innerHTML = data.tags;
    //document.getElementById("recipeImage").setAttribute("src", data.image);
    document.getElementById("date").innerHTML = new Date(data.datePosted * 1000);
    document.getElementById("description").innerHTML = data.description;
    document.getElementById("servingSize").innerHTML = data.servingSize;
    document.getElementById("author").innerHTML = data.author;
    document.getElementById("cookTime").innerHTML = data.cookTime;
    document.getElementById("ingredients").innerHTML = data.ingredients;
    document.getElementById("steps").innerHTML = data.steps;


    /** 
    console.log(getTitle(data));
    console.log(getYield(data));
    console.log(getCategories(data));
    console.log(getDescription(data));
    console.log(getImage(data));
    console.log(getOrganization(data));
    console.log(getIngredients(data));
    console.log(getInstructions(data));
    document.getElementById("recipeTitle").innerHTML = getTitle(data);
    //document.getElementById("tags").innerHTML=getCategories(data);
    document.getElementById("recipeImage").setAttribute("src", getImage(data));
    document.getElementById("description").innerHTML = getDescription(data);
    document.getElementById("servingSize").innerHTML = getYield(data);
    document.getElementById("author").innerHTML = getOrganization(data);
    document.getElementById("cookTime").innerHTML = convertTime(
        searchForKey(data, "totalTime")

        
    );
    */

    /** 
    document.getElementById("dateOfCreation").innerHTML = searchForKey(
        data,
        "datePublished"
    ).split("T")[0];

    const tagss = getCategories(data).split(",");
    tagss.forEach((tag) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = tag;
        document.getElementById("tags").append(listItem);
    });

    const ingredients = getIngredients(data);
    ingredients.forEach((ingredient) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = ingredient;
        document.getElementById("ingredients").append(listItem);
    });

    const instructions = getInstructions(data);
    instructions.forEach((instruction) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = instruction;
        document.getElementById("steps").append(listItem);
    });
    */
    function convertTime(time) {
        let timeStr = '';

        // Remove the 'PT'
        time = time.slice(2);

        let timeArr = time.split('');
        if (time.includes('H')) {
            for (let i = 0; i < timeArr.length; i++) {
                if (timeArr[i] == 'H') return `${timeStr} hr`;
                timeStr += timeArr[i];
            }
        } else {
            for (let i = 0; i < timeArr.length; i++) {
                if (timeArr[i] == 'M') return `${timeStr} min`;
                timeStr += timeArr[i];
            }
        }

        return '';
    }
}