/**
 * Filename: editPage.js
 * 
 * Very similar to createPage.js:
 * Adds event listeners to the add and delete ingredint and save buttons,
 * in order have ingredient and step form elements behave correctly.
 * Adds event listeners and routers to cancel and save buttons.
 * Handles recipe object creation and saving to database on form submit with save button.
 * Additionally:
 * Populates page with pre-existing recipe by pre-filling form items and appending existing
 * steps and ingredient elements.
 * 
 * @file Populate form with recipe, tie api to save button, make form buttons funcitonal.
 * @since 12.09.21
 */
import { updateRecipeById } from "./APICalls.js";
import {
    redirectRecipeDetail,
    routerNavigateWrapper,
    userData,
} from "./index.js";
import { createNodeClone, HOME_ROUTER, RECIPE_ROUTE } from "./util.js";
let imageSrc = "";
let recipeId;
export default { populateEditPage };

/**
 * Adds event listeners to ingrent, step, and cancel buttons,
 * in order to tie corresponding functions.
 * 
 * @param recipeObj The recipe object to populate the form with
 */
export function populateEditPage(recipeObj) {
    recipeId = recipeObj._id;

    fillOutEditPage(recipeObj);
    createNodeClone("editCancel");
    const cancelBtn = document.getElementById("editCancel");
    cancelBtn.addEventListener("click", () => {
        routerNavigateWrapper(HOME_ROUTER);
    });

    const recipeForm = document.getElementById("editRecipeForm");
    recipeForm.onsubmit = onUpdateRecipe;
    if (
        document
            .querySelector("#editRecipeForm #addIngr")
            .getAttribute("listener") !== "true"
    ) {
        document
            .querySelector("#editRecipeForm #addIngr")
            .setAttribute("listener", "true");
        createNodeClone("#editRecipeForm #addIngr", true);
        document
            .querySelector("#editRecipeForm #addIngr")
            .addEventListener("click", function () {
                appendIngredient();
            });
        createNodeClone("#editRecipeForm #addStep", true);
        document
            .querySelector("#editRecipeForm #addStep")
            .addEventListener("click", function () {
                appendStep();
            });
        createNodeClone("#editRecipeForm #delIngr", true);
        document
            .querySelector("#editRecipeForm #delIngr")
            .addEventListener("click", function () {
                deleteIngredient();
            });
        createNodeClone("#editRecipeForm #delStep", true);
        document
            .querySelector("#editRecipeForm #delStep")
            .addEventListener("click", function () {
                deleteStep();
            });
    }
}


let numSteps = 0;
let numIngredients = 0;
/**
 * Removes any pre-existing items from previous sessions.
 * Fills form items with data from the recipe object.
 * 
 * @param recipeObj The recipe object to populate the form with
 */
export const fillOutEditPage = (recipeObj) => {


    let response = recipeObj;


    document.getElementById("editName").innerHTML =
        '<label for="name">Recipe Name: *</label><input type="text" name="name" id="name" value="' +
        response.name +
        '" placeholder="A creative name" required>';

    document.getElementById("editDescription").innerHTML =
        '<label for="description">Description:</label><textarea name="description" id="descriptionText" placeholder="Tell us about your recipe!">' +
        response.description +
        " </textarea>";

    document.getElementById("editTags").innerHTML =
        '<label for="tags">Tags:</label><input type="text" name="tags" id="tags" value="' +
        response.tags.join(", ") +
        '" placeholder="tag1, tag2, tag3">';

    document.getElementById("editCookTime").innerHTML =
        '<label for="cookTime">Cook Time:</label><input type="text" name="cookTime" id="prepTime" value="' +
        response.cookTime +
        '" placeholder="x hours">';

    document.getElementById("editServingSize").innerHTML =
        '<label for="servingSize">Serving Size:</label><input type="text" name="servingSize" id="servingSize" value="' +
        response.servingSize +
        '" placeholder="x people">';

    let diff = response.difficulty.charAt(0);
    if (diff == "1") {
        document.getElementById("editDifficulty").innerHTML =
            '<label for="difficulty">Difficulty:</label><select name="difficulty" id="difficulty"><option selected value="1">1 star</option><option value="2">2 stars</option><option value="3">3 stars</option><option value="4">4 stars</option><option value="5">5 stars</option></select>';
    } else if (diff == "2") {
        document.getElementById("editDifficulty").innerHTML =
            '<label for="difficulty">Difficulty:</label><select name="difficulty" id="difficulty"><option value="1">1 star</option><option selected value="2">2 stars</option><option value="3">3 stars</option><option value="4">4 stars</option><option value="5">5 stars</option></select>';
    } else if (diff == "3") {
        document.getElementById("editDifficulty").innerHTML =
            '<label for="difficulty">Difficulty:</label><select name="difficulty" id="difficulty"><option value="1">1 star</option><option value="2">2 stars</option><option selected value="3">3 stars</option><option value="4">4 stars</option><option value="5">5 stars</option></select>';
    } else if (diff == "4") {
        document.getElementById("editDifficulty").innerHTML =
            '<label for="difficulty">Difficulty:</label><select name="difficulty" id="difficulty"><option value="1">1 star</option><option value="2">2 stars</option><option value="3">3 stars</option><option selected value="4">4 stars</option><option value="5">5 stars</option></select>';
    } else {
        document.getElementById("editDifficulty").innerHTML =
            '<label for="difficulty">Difficulty:</label><select name="difficulty" id="difficulty"><option value="1">1 star</option><option value="2">2 stars</option><option value="3">3 stars</option><option value="4">4 stars</option><option selected value="5">5 stars</option></select>';
    }

    // Remove steps and ingredients from previous page sessions
    for (let i = 0; i <= numSteps; i++) {
        deleteStep();
    }

    for (let i = 0; i <= numIngredients; i++) {
        deleteIngredient();
    }

    let fillSteps = response.steps;
    for (let i = 0; i < fillSteps.length; i++) {
        appendEStep(fillSteps[i]);
    }

    let fillIngredients = response.ingredients;
    for (let key in fillIngredients) {
        appendEIngredient(key, fillIngredients[key]);
    }

    imageSrc = response.image;
    const currImage = document.getElementById("editPictureFile");
    if (currImage.value) currImage.value = '';
};

/**
 * Gathers the input fromt the form into a formData object,
 * and saves it to database as an update.
 * 
 * @param {*} event
 */
const onUpdateRecipe = async (event) => {
    event.preventDefault();

    const recipeF = document.getElementById("editRecipeForm");
    let formData = new FormData(recipeF);

    // get ingredients from form
    let ingrAmountArr = [];
    let stepsArr = [];
    let strTags = formData.get("tags")
        ? formData
            .get("tags")
            .replace(/\s+/g, "")
            .split(/[;,.]+/)
        : [];

    let ingArr = {};
    for (let i = 0; i < numIngredients; i++) {
        ingArr[formData.get("ingredient" + i)] = formData.get(
            "ingredientAmount" + i
        );
    }

    // get steps from form
    for (let i = 0; i < numSteps; i++) {
        stepsArr.push(formData.get("step" + i));
    }
    let newImageUpdate = formData.get("picture").size ? true : false;
    // CREATE NEW RECIPE
    let newRecipe = {
        name: formData.get("name"),
        datePosted: Date.now(),
        image: formData.get("picture").size ? formData.get("picture") : imageSrc,
        // default to be 'admin' id
        author: userData ? userData._id : "MMAfv3oCQDiL4u10",
        description: formData.get("description"),
        tags: strTags,
        servingSize: formData.get("servingSize"),
        cookTime: formData.get("cookTime"),
        ingredients: ingArr,
        difficulty: formData.get("difficulty"),
        ingredientAmounts: ingrAmountArr,
        steps: stepsArr,
        _id: recipeId,
    };
    const updatedRecipe = await updateRecipeById(newImageUpdate, newRecipe);
    //update the userData
    if (userData && userData.myRecipe) {
        userData.myRecipe = userData.myRecipe.map(function (recipe) {
            if (recipe._id == updatedRecipe._id) return updatedRecipe;
            return recipe;
        });
        userData.savedRecipe = userData.savedRecipe.filter(function (recipe) {
            if (recipe._id == updatedRecipe._id) return updatedRecipe;
            return recipe;
        });
    }
    updatedRecipe.author = userData;
    redirectRecipeDetail(updatedRecipe);
    const page = updatedRecipe._id;
    const routeUrl = RECIPE_ROUTE + page;
    routerNavigateWrapper(routeUrl);
};

/**
 * Adds a new step form element.
 * Increments numSteps.
 */
/* eslint-disable no-unused-vars*/
const appendStep = () => {
    var newTextBox = document.createElement("div");
    newTextBox.innerHTML =
        "<textarea cols='40' rows='4' id='textAreaBox' name='step" +
        numSteps +
        "' placeholder='Step #" +
        numSteps +
        "'></textarea>";
    document.getElementById("editNewStepId").appendChild(newTextBox);
    numSteps++;
};
/* eslint-enable no-unused-vars*/

/**
 * Called when user deletes a step and reflects that on the page.
 * Removes step element and decreases numSteps.
 */
/* eslint-disable no-unused-vars*/
const deleteStep = () => {
    if (document.getElementById("editNewStepId").lastChild != null) {
        document
            .getElementById("editNewStepId")
            .removeChild(document.getElementById("editNewStepId").lastChild);
        numSteps--;
    }
};
/* eslint-disable no-unused-vars*/

/**
 * Adds a new ingredient and ingredient amounts form elements.
 * Increments numIngredients.
 */
const appendIngredient = () => {
    var newTextBox = document.createElement("div");
    newTextBox.innerHTML =
        "<input type='text' id='newInputBox' name='ingredient" +
        numIngredients +
        "' placeholder='ingredient'>";
    document.getElementById("editNewIngredientId").appendChild(newTextBox);

    var newAmountBox = document.createElement("div");
    newAmountBox.innerHTML =
        "<input type='text' id='newInputBox' name='ingredientAmount" +
        numIngredients +
        "' placeholder='amount (ie. 5 cups)'>";
    document
        .getElementById("editNewIngredientAmountId")
        .appendChild(newAmountBox);
    numIngredients++;
};
/* eslint-enable no-unused-vars*/



/**
 * Called when user deletes an ingredient and reflects that on the page.
 * Removes ingredient and amount elements and decreases numIngredients.
 */
/* eslint-disable no-unused-vars*/
const deleteIngredient = () => {
    if (document.getElementById("editNewIngredientId").lastChild != null) {
        numIngredients--;
        document
            .getElementById("editNewIngredientId")
            .removeChild(
                document.getElementById("editNewIngredientId").lastChild
            );
        document
            .getElementById("editNewIngredientAmountId")
            .removeChild(
                document.getElementById("editNewIngredientAmountId").lastChild
            );
    }
};

/**
 * For appending a pre-existing ingredient to the form
 * 
 * @param {string} existingIngredient
 * @param {string} existingAmount
 */
const appendEIngredient = (existingIngredient, existingAmount) => {
    var newTextBox = document.createElement("div");
    newTextBox.innerHTML =
        "<input type='text' id='newInputBox' name='ingredient" +
        numIngredients +
        "' placeholder='ingredient' value=" +
        existingIngredient +
        ">";
    document.getElementById("editNewIngredientId").appendChild(newTextBox);

    var newAmountBox = document.createElement("div");
    newAmountBox.innerHTML =
        "<input type='text' id='newInputBox' name='ingredientAmount" +
        numIngredients +
        "' placeholder='amount' value=" +
        existingAmount +
        ">";
    document
        .getElementById("editNewIngredientAmountId")
        .appendChild(newAmountBox);
    numIngredients++;
};
/* eslint-enable no-unused-vars*/

/**
 * For appending a pre-existing step to the form
 * 
 * @param {string} existingStep
 */
const appendEStep = (existingStep) => {
    var newTextBox = document.createElement("div");

    newTextBox.innerHTML =
        "<textarea cols='40' rows='4' id='textAreaBox' name='step" +
        numSteps +
        "' placeholder='Step #" +
        numSteps +
        "'>" +
        existingStep +
        "</textarea>";
    document.getElementById("editNewStepId").appendChild(newTextBox);
    numSteps++;
};