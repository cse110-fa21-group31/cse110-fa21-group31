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
export function populateEditPage(recipeObj) {
    recipeId = recipeObj._id;

    fillOutEditPage(recipeObj);
    createNodeClone("editCancel");
    const cancelBtn = document.getElementById("editCancel");
    cancelBtn.addEventListener("click", () => {
        routerNavigateWrapper(HOME_ROUTER);
    });
    // Adding steps to the recipe
    /* eslint-disable no-unused-vars*/
    const addStepButton = document.querySelector("#addSteps button");
    /* eslint-enable no-unused-vars*/
    //addStepButton.addEventListener('click', appendRow);

    // Submitting the entire recipe

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

export const deleteRecipeButton = async (event) => {
    // await deleteRecipe(pageId);
};

let numSteps = 0;
let numIngredients = 0;

export const fillOutEditPage = (recipeObj) => {
    console.log("EDITTED RECIPE");

    // get recipe info and fill it out
    // let response = await fetchRecipeById(recipeId);
    //TODO: update the variable from response to recipeObj
    let response = recipeObj;
    console.log(response);
    // get ingredients from data
    document.getElementById("editName").innerHTML =
        '<label for="name">Recipe Name: *</label><input type="text" name="name" id="name" value="' +
        response.name +
        '" placeholder="A creative name" required>';
    //document.getElementById('picture').innerHTML = 'label for="picture">Picture:</label><input type="file" name="picture" id="picture" src="'+response.image+'">';
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

    //document.getElementById('difficulty').innerHTML = '<label for="difficulty">Difficulty:</label><select name="difficulty" id="difficulty"><option value="1">1 star</option><option value="2">2 stars</option><option value="3">3 stars</option><option value="4">4 stars</option><option value="5">5 stars</option></select>';
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

    // EUVIN: Added these so duplicate steps aren't added from previous sessions
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
        console.log(key);
        appendEIngredient(key, fillIngredients[key]);
    }

    //TODO: figure out a way to store/display image
    imageSrc = recipeObj.image;
};

/**
 *
 * @param {*} event
 */
const onUpdateRecipe = async (event) => {
    event.preventDefault();
    console.log("SUBMITTED NEW RECIPE");

    const recipeF = document.getElementById("editRecipeForm");
    let formData = new FormData(recipeF);

    // get ingredients from form
    let ingrArr = [];
    let ingrAmountArr = [];
    let stepsArr = [];
    let strTags = formData.get("tags")
        ? formData
              .get("tags")
              .replace(/\s+/g, "")
              .split(/[;,.]+/)
        : [];
    //let tagsArr = strTags.split(',');

    let ingArr = {};
    for (let i = 0; i < numIngredients; i++) {
        ingArr[formData.get("ingredient" + i)] = formData.get(
            "ingredientAmount" + i
        );
    }
    console.log(ingArr);

    // get steps from form
    for (let i = 0; i < numSteps; i++) {
        stepsArr.push(formData.get("step" + i));
        console.log(formData.get("step" + i));
    }

    // console.log(formData.get('picture'));
    // CREATE NEW RECIPE
    let newRecipe = {
        name: formData.get("name"),
        datePosted: Date.now(),
        image: formData.get("picture"),
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
    // console.log(newRecipe);
    // console.log("RECIPE ID AT UPDATERECIPE IS: " + recipeId);
    const updatedRecipe = await updateRecipeById(recipeId, newRecipe);
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

    // What does this function do overall?
    // ANSWER: This function serves to
};

/* eslint-disable no-unused-vars*/
const appendStep = () => {
    //let d = document.getElementById('steps');
    // d.innerHTML += "<input type='text' id='tst"+ x++ +"'><br >";
    console.log("append Step");
    var newTextBox = document.createElement("div");
    console.log("add Step");
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

/* eslint-disable no-unused-vars*/
const deleteStep = () => {
    console.log("delete Step");
    //newTextBox.classList.add('stepEntry');
    if (document.getElementById("editNewStepId").lastChild != null) {
        document
            .getElementById("editNewStepId")
            .removeChild(document.getElementById("editNewStepId").lastChild);
        numSteps--;
    }
};
/* eslint-disable no-unused-vars*/
const appendIngredient = () => {
    console.log("add Ingredient");
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

/* eslint-disable no-unused-vars*/
const deleteIngredient = () => {
    console.log("delete ingredient");
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

const appendEStep = (existingStep) => {
    //let d = document.getElementById('steps');
    // d.innerHTML += "<input type='text' id='tst"+ x++ +"'><br >";
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
