/**
 * Filename: createPage.js
 * Adds event listeners to the add and delete ingredint and save buttons,
 * in order have ingredient and step form elements behave correctly.
 * Adds event listeners and routers to cancel and save buttons.
 * Handles recipe object creation and saving to database on form submit with save button.
 * 
 * @file Tie api to save button, make form buttons funcitonal.
 * @since 12.09.21
 */

import { insertRecipe } from "./APICalls.js";
import {
    redirectRecipeDetail,
    routerNavigateWrapper,
    userData,
} from "./index.js";
import {
    RECIPE_ROUTE,
    HOME_ROUTER,
} from "./util.js";
export default { setupCreatePage };

/**
 * Adds event listeners to ingrent, step, cancel and save buttons,
 * in order to tie corresponding functions.
 */
export function setupCreatePage() {

    // Cancel button routes to home page
    const cancelBtn = document.getElementById("cancel");
    cancelBtn.addEventListener("click", () => {
        routerNavigateWrapper(HOME_ROUTER);
    });

    
    const recipeForm = document.getElementById("recipeForm");
    recipeForm.onsubmit = onSubmitRecipe;
    clearRecipePage();
    if (
        document
            .querySelector("#recipeForm #addIngr")
            .getAttribute("listener") !== "true"
    ) {
        document
            .querySelector("#recipeForm #addIngr")
            .setAttribute("listener", "true");
        document
            .querySelector("#recipeForm #addIngr")
            .addEventListener("click", function () {
                appendIngredient();
            });
        document
            .querySelector("#recipeForm #addStep")
            .addEventListener("click", function () {
                appendStep();
            });
        document
            .querySelector("#recipeForm #delIngr")
            .addEventListener("click", function () {
                deleteIngredient();
            });
        document
            .querySelector("#recipeForm #delStep")
            .addEventListener("click", function () {
                deleteStep();
            });
    }
}

let numSteps = 0;
let numIngredients = 0;

/**
 * Gathers the input fromt the form into a formData object,
 * and saves it to database.
 * 
 * @param event
 */
const onSubmitRecipe = async (event) => {

    event.preventDefault();
    const recipeF = document.getElementById("recipeForm");
    let formData = new FormData(recipeF);

    let stepsArr = [];

    //Pull tags from form
    let strTags = formData.get("tags")
        ? formData
              .get("tags")
              .replace(/\s+/g, "")
              .split(/[;,.]+/)
        : [];

    // Pull ingredients from form
    let ingWithAmountArr = {};
    for (let i = 0; i < numIngredients; i++) {
        ingWithAmountArr[formData.get("ingredient" + i)] = formData.get(
            "ingredientAmount" + i
        );
    }

    // Pull steps from form
    for (let i = 0; i < numSteps; i++) {
        stepsArr.push(formData.get("step" + i ));
    }

    // Upload image
    const recipeCard = document.createElement("recipe-card");

    let pic = null;
    let img = null;
    if (document.getElementsByName("picture")[0].files.length > 0) {
        pic = document.getElementsByName("picture")[0].files[0];
    }

    // Create new recipe object
    let newRecipe = {
        name: formData.get("name"),
        datePosted: Date.now(),
        image: formData.get("picture"),
        author: userData._id,
        description: formData.get("description"),
        tags: strTags,
        servingSize: formData.get("servingSize"),
        cookTime: formData.get("cookTime"),
        ingredients: ingWithAmountArr,
        difficulty: formData.get("difficulty"),
        steps: stepsArr,
    };
    
    // Get response from POST API, get the new recipe,
    const responseRecipe = await insertRecipe(newRecipe);
    responseRecipe.author = userData;
    redirectRecipeDetail(responseRecipe);
    userData.myRecipe.push(responseRecipe);
    const page = responseRecipe._id;
    const routeUrl = RECIPE_ROUTE + page;
    routerNavigateWrapper(routeUrl);
};

/**
 * Adds a new step form element.
 * Increments numSteps.
 */
const appendStep = () => {
    var newTextBox = document.createElement("div");

    newTextBox.innerHTML =
        "<textarea cols='40' rows='4' id='textAreaBox' name='step" +
        numSteps +
        "' placeholder='Step #" +
        numSteps +
        "'></textarea>";
    document.getElementById("newStepId").appendChild(newTextBox);
    
    numSteps++;
};

/**
 * Called when user deletes a step and reflects that on the page.
 * Removes step element and decreases numSteps.
 */
const deleteStep = () => {
    if (document.getElementById("newStepId").lastChild != null) {
        document
            .getElementById("newStepId")
            .removeChild(document.getElementById("newStepId").lastChild);
        numSteps--;
    }
};

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
    document.getElementById("newIngredientId").appendChild(newTextBox);

    var newAmountBox = document.createElement("div");
    newAmountBox.innerHTML =
        "<input type='text' id='newInputBox' name='ingredientAmount" +
        numIngredients +
        "' placeholder='amount (ie. 5 cups)'>";
    document.getElementById("newIngredientAmountId").appendChild(newAmountBox);
    numIngredients++;
};

/**
 * Called when user deletes an ingredient and reflects that on the page.
 * Removes ingredient and amount elements and decreases numIngredients.
 */
const deleteIngredient = () => {
    if (document.getElementById("newIngredientId").lastChild != null) {
        numIngredients--;

        document
            .getElementById("newIngredientId")
            .removeChild(document.getElementById("newIngredientId").lastChild);
        document
            .getElementById("newIngredientAmountId")
            .removeChild(
                document.getElementById("newIngredientAmountId").lastChild
            );
    }
};

/**
 * Remove form entries, steps and ingredients from previous page visit.
 */
const clearRecipePage = () => {
    document.getElementById("recipeForm").reset();
    
    for (let i = 0; i <= numSteps; i++) {
        deleteStep();
    }

    for (let i = 0; i <= numIngredients; i++) {
        deleteIngredient();
    }
};
