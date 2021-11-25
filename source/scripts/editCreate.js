// This script will take the user's input with their recipe data in editCreate.html, and will send it to the server to be saved.
window.addEventListener("DOMContentLoaded", init);

import { insertRecipe } from "./APICalls.js"

function init() {
    console.log("editCreate.js init called");

    // Adding steps to the recipe
    /* eslint-disable no-unused-vars*/
    const addStepButton = document.querySelector("#addSteps button");
    /* eslint-enable no-unused-vars*/
    //addStepButton.addEventListener('click', appendRow);

    // Submitting the entire recipe
    const recipeForm = document.getElementById("recipeForm");
    recipeForm.onsubmit = onSubmitRecipe;
}

const onSubmitRecipe = async (event) => {
    console.log("SUBMITTED THINGY");
    event.preventDefault();
    event.preventDefault();
    console.log("SUBMITTED THINGY");
    const recipeF = document.getElementById("recipeForm");
    let formData = new FormData(recipeF);
    /** 
    console.log(formData.get('name'));
    console.log(formData.get('picture'));
    console.log(formData.get('description'));
    console.log(formData.get('tags'));
    console.log(formData.get('prepTime'));
    console.log(formData.get('cookTime'));
    console.log(formData.get('servingSize'));
    console.log(formData.get('difficulty'));
    console.log(formData.get('ingredients'));
    console.log(formData.get('ingredientAmounts'));
    console.log(formData.get('steps'));
    */
    const recipeCard = document.createElement('recipe-card');

    recipeCard.name = formData.get('name');
    recipeCard.authorId = 'HZRfg63gUu5M8S0F';
    recipeCard.datePosted = Date.now();
    recipeCard.coverImage = formData.get('picture');
    recipeCard.cookingTime = formData.get('cookTime');
    //recClass.servingSize =
    recipeCard.difficulty = formData.get('difficulty');
    recipeCard.tags = formData.get('tags');

    let newRecipe = {
        name: formData.get('name'), datePosted: Date.now(),
        cookTime: formData.get('cookTime'),
        author: "HZRfg63gUu5M8S0F", steps: ["step 1", "step 2"]
    }
    console.log(newRecipe);
    insertRecipe(newRecipe);
};

let numSteps = 1;
/* eslint-disable no-unused-vars*/
const appendStep = () => {
    //let d = document.getElementById('steps');
    // d.innerHTML += "<input type='text' id='tst"+ x++ +"'><br >";
    var newTextBox = document.createElement("div");
    newTextBox.innerHTML =
        "<textarea cols='40' rows='4' id='textAreaBox' placeholder='Step #" +
        numSteps +
        "'></textarea>";
    document.getElementById("newStepId").appendChild(newTextBox);
    numSteps++;
};
/* eslint-enable no-unused-vars*/

/* eslint-disable no-unused-vars*/
const deleteStep = () => {
    //newTextBox.classList.add('stepEntry');
    if (document.getElementById("newStepId").lastChild != null) {
        document
            .getElementById("newStepId")
            .removeChild(document.getElementById("newStepId").lastChild);
        numSteps--;
    }
};
/* eslint-enable no-unused-vars*/

/* eslint-disable no-unused-vars*/
const appendIngredient = () => {
    var newTextBox = document.createElement("div");
    newTextBox.innerHTML =
        "<input type='text' id='newInputBox' placeholder='ingredient'>";
    document.getElementById("newIngredientId").appendChild(newTextBox);

    var newAmountBox = document.createElement("div");
    newAmountBox.innerHTML =
        "<input type='text' id='newInputBox' placeholder='amount'>";
    document.getElementById("newIngredientAmountId").appendChild(newAmountBox);
};
/* eslint-enable no-unused-vars*/

/* eslint-disable no-unused-vars*/
const deleteIngredient = () => {
    if (document.getElementById("newIngredientId").lastChild != null) {
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
/* eslint-enable no-unused-vars*/
