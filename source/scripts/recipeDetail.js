/**
 * Populate the recipe details using a recipe data object,
 * render the save button on login and handle save api calls,
 * render delete and edit buttons if recipe belongs to user,
 * handle delete api calls or route to edit page on click.
 * 
 * @since 12.09.21
 */


// The purpose of this JS file is to take API JSON files, create recipeClass objects with that info, and "send" them out to the website
export default { fillOutRecipe };

import {
    TEMP_EDIT_CREATE_ROUTE,
    createNodeClone,
    DISPLAY_BLOCK,
    DISPLAY_NONE,
    HOME_ROUTER,
} from "./util.js";

import {
    deleteRecipe,
    addSavedRecipeById,
    deleteSavedRecipeById,
} from "./APICalls.js";

import { 
    routerAddEditPage,
    routerNavigateWrapper,
    userData,
} from "./index.js";


const PLACEHOLDER_IMG =
    window.location.protocol +
    "//" +
    window.location.host +
    "/source/assets/Images/recipeCardPlaceholder.png";

let isSaved = false; // Local variable to keep track of saved status for current session

/**
 * Populates the recipe detail pages by filling in
 * properties in html components with a recipe object,
 * and checks user/saved status to show the correct buttons.
 * 
 * @param data The recipe object
 */
export async function fillOutRecipe(data) {
    if (!data) return;

    //Populate recipe title
    document.getElementById("recipeTitle").innerHTML = data.name;
    
    if (data.tags) {
        let tagList = document.getElementById("tags");

        //Clear old tags
        while (tagList.firstChild) {
            tagList.removeChild(tagList.firstChild);
        }

        //Add tags
        for (let i = 0; i < data.tags.length; i++) {
            let item = document.createElement("li");
            tagList.appendChild(item);
            item.innerHTML = data.tags[i];
        }
    }

    // If data.image not valid, use placeholder image
    const image =
        data.image == null || typeof data.image == "object" || data.image == ""
            ? PLACEHOLDER_IMG
            : data.image;
    // If data.image valid but image not exist, suppress error message and use placeholder image
    const imageErrorFunc = `this.onerror=null; this.src='${PLACEHOLDER_IMG}'`;
    document.getElementById("recipeImage").setAttribute("src", image);
    document
        .getElementById("recipeImage")
        .setAttribute("onerror", imageErrorFunc);
    
    // Populate date, description and serving size
    document.getElementById("date").innerHTML = new Date(
        data.datePosted * 1000
    );
    document.getElementById("description").innerHTML = data.description
        ? data.description
        : "";
    document.getElementById("servingSize").innerHTML = data.servingSize
        ? data.servingSize
        : "";

    // Now rendering username rather than user id
    if (data.author && data.author.username)
        document.getElementById("author").innerHTML = data.author.username;
    document.getElementById("cookTime").innerHTML = data.cookTime
        ? data.cookTime
        : "";
    if (data.ingredients) {
        let ingredientsList = document.getElementById("ingr");

        // Clear old ingredients
        while (ingredientsList.firstChild) {
            ingredientsList.removeChild(ingredientsList.firstChild);
        }
        // Populate ingredients
        for (let ingredient in data.ingredients) {
            let item = document.createElement("li");
            ingredientsList.appendChild(item);
            item.innerHTML = ingredient + ": " + data.ingredients[ingredient];
        }
    }

    // Clear old steps
    let stepsList = document.getElementById("stps");
    while (stepsList.firstChild) {
        stepsList.removeChild(stepsList.firstChild);
    }

    // Populate steps
    for (let i = 0; i < data.steps.length; i++) {
        let item = document.createElement("li");
        stepsList.appendChild(item);
        item.innerHTML = data.steps[i];
    }

    // Clone existing buttons for new event listeners
    createNodeClone("saveRecipeButton");
    createNodeClone("editRecipeButton");
    createNodeClone("deleteRecipeButton");


    const editRecipeButton = document.getElementById("editRecipeButton");
    const delRecipeButton = document.getElementById("deleteRecipeButton");
    const saveRecipeButton = document.getElementById("saveRecipeButton");
    const page = data._id;
    const routeUrl = TEMP_EDIT_CREATE_ROUTE + page;

    // If the user is logged in, display the appropriate buttons 
    if (userData) {
        editRecipeButton.style.display = DISPLAY_BLOCK;
        delRecipeButton.style.display = DISPLAY_BLOCK;
        saveRecipeButton.style.display = DISPLAY_BLOCK;
        routerAddEditPage(routeUrl, data);

        addSaveButton(data);

        //Check to see if this is a recipe created by current user
        if (userData.myRecipe.find((ele) => ele._id == data._id)) {
            editRecipeButton.addEventListener("click", () => {
                //redirect to edit page and populate the page
                routerNavigateWrapper(routeUrl);
            });
            delRecipeButton.addEventListener("click", async () => {

                //redirect to edit page and populate the page
                await deleteRecipe(data._id);
                if (userData && userData.myRecipe) {
                    userData.myRecipe = userData.myRecipe.filter(function (
                        recipe
                    ) {
                        return recipe._id != data._id;
                    });
                    userData.savedRecipe = userData.savedRecipe.filter(
                        function (recipe) {
                            return recipe._id != data._id;
                        }
                    );
                }
                routerNavigateWrapper(HOME_ROUTER);
            });
        } else {
            editRecipeButton.style.display = DISPLAY_NONE;
            delRecipeButton.style.display = DISPLAY_NONE;
        }
    } else {
        editRecipeButton.style.display = DISPLAY_NONE;
        delRecipeButton.style.display = DISPLAY_NONE;
        saveRecipeButton.style.display = DISPLAY_NONE;
    }
}

/**
 * Handles adding/deleting from saved recipe on click event
 * 
 * @param data The recipe object
 */
const saveRecipe = (data) => () => {

    // Delete recipe from saved and update button
    if (isSaved) {
        /* eslint-disable no-undef */

        //Styling
        saveRecipeButton.style.background =
            "url(/source/assets/Images/Empty_Heart.svg)";
        saveRecipeButton.style.backgroundRepeat = "no-repeat";

        //Update database
        if (userData && userData.savedRecipe) {
            userData.savedRecipe = userData.savedRecipe.filter(function (
                recipe
            ) {
                return recipe._id != data._id;
            });
        }
        isSaved = false;
        deleteSavedRecipeById(userData._id, data._id);
    }
    
    else {

        //Styling
        saveRecipeButton.style.background =
            "url(/source/assets/Images/Filled_Heart.svg)";
        saveRecipeButton.style.backgroundRepeat = "no-repeat";
        /* eslint-enable no-undef */

        //Update database
        if (userData && userData.savedRecipe) {
            userData.savedRecipe.push(data);
        }
        isSaved = true;
        addSavedRecipeById(userData._id, data._id);
    }
};

/**
 * Renders the save button depending on save status,
 * and adds event listener.
 * 
 * @param data The recipe object
 */

function addSaveButton(data) {
    const saveRecipeButton = document.getElementById("saveRecipeButton");

    // Check for recipe in current user's saved recipes
    isSaved = false;
    for (let i = 0; i < userData.savedRecipe.length; i++) {
        if (userData.savedRecipe[i]._id == data._id) {
            isSaved = true;
            break;
        }
    }

    // Inital render/styling
    if (isSaved) {
        saveRecipeButton.style.background =
            "url(/source/assets/Images/Filled_Heart.svg)";
    } else {
        saveRecipeButton.style.background =
            "url(/source/assets/Images/Empty_Heart.svg)";
    }
    saveRecipeButton.style.backgroundRepeat = "no-repeat";

    saveRecipeButton.addEventListener("click", saveRecipe(data, isSaved));
}
