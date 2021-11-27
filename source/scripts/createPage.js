// This script will take the user's input with their recipe data in editCreate.html, and will send it to the server to be saved.
import { insertRecipe } from "./APICalls.js"
import { redirectRecipeDetail, routerNavigateWrapper, userData } from "./index.js";
import { RECIPE_ROUTE } from './util.js'
export default {}
export function setupCreatePage() {
    console.log("setupCreatePage() called");



    // Adding steps to the recipe
    /* eslint-disable no-unused-vars*/
    const addStepButton = document.querySelector("#addSteps button");
    /* eslint-enable no-unused-vars*/
    //addStepButton.addEventListener('click', appendRow);

    // Submitting the entire recipe

    const recipeForm = document.getElementById("recipeForm");
    recipeForm.onsubmit = onSubmitRecipe;
    //document.getElementById("addIngr").onclick = appendIngredient();

    document.getElementById("addIngr").addEventListener("click", function () {
        appendIngredient();
    });
    document.getElementById("addStep").addEventListener("click", function () {
        appendStep();
    });
    document.getElementById("delIngr").addEventListener("click", function () {
        deleteIngredient();
    });
    document.getElementById("delStep").addEventListener("click", function () {
        deleteIngredient();
    });

}

let numSteps = 0;
let numIngredients = 0;
//TODO: update/find a way to assign value to this variable
let isUpdate = false
const onSubmitRecipe = async (event) => {

    console.log("SUBMITTED NEW RECIPE");
    event.preventDefault();
    const recipeF = document.getElementById("recipeForm");
    let formData = new FormData(recipeF);

    // get ingredients from form
    let ingrArr = [];
    let ingrAmountArr = [];
    let stepsArr = [];
    //should be empty array if no input
    let strTags = formData.get('tags') ? formData.get('tags').replace(/\s+/g, '').split(',') : [];
    //let tagsArr = strTags.split(',');

    let ingArr = {};
    for (let i = 0; i < numIngredients; i++) {
        ingArr[formData.get('ingredient' + i)] = formData.get('ingredientAmount' + i);
        /** 
        ingrArr.push(formData.get('ingredient'+i));
        ingrAmountArr.push(formData.get('ingredientAmount'+i));
        console.log(formData.get('ingredient'+i));
        console.log(formData.get('ingredientAmount'+i));
        */
    }
    console.log(ingArr);

    // get steps from form
    for (let i = 0; i < numSteps; i++) {
        stepsArr.push(formData.get('step' + i));
        console.log(formData.get('step' + i));
    }

    const recipeCard = document.createElement('recipe-card');
    console.log(formData.get('picture'));
    // CREATE NEW RECIPE
    console.log("test global user data", userData)
    let newRecipe = {
        name: formData.get('name'),
        datePosted: Date.now(),
        //TODO: how to store image
        image: formData.get('picture'),
        //TODO: get user ID from a global variable
        author: "HZRfg63gUu5M8S0F",

        description: formData.get('description'),
        tags: strTags,
        servingSize: formData.get('servingSize'),
        cookTime: formData.get('cookTime'),
        ingredients: ingArr,
        difficulty: formData.get('difficulty'),
        ingredientAmounts: ingrAmountArr,
        steps: stepsArr
    }
    console.log(newRecipe);
    await insertRecipe(newRecipe);
    redirectRecipeDetail(newRecipe)
    const page = newRecipe._id;
    const routeUrl = RECIPE_ROUTE + page
    routerNavigateWrapper(routeUrl)
};


/* eslint-disable no-unused-vars*/
const appendStep = () => {
    //let d = document.getElementById('steps');
    // d.innerHTML += "<input type='text' id='tst"+ x++ +"'><br >";
    var newTextBox = document.createElement("div");

    newTextBox.innerHTML =
        "<textarea cols='40' rows='4' id='textAreaBox' name='step" + numSteps + "' placeholder='Step #" +
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
/* eslint-disable no-unused-vars*/
const appendIngredient = () => {
    var newTextBox = document.createElement("div");
    newTextBox.innerHTML =
        "<input type='text' id='newInputBox' name='ingredient" + numIngredients + "' placeholder='ingredient'>";
    document.getElementById("newIngredientId").appendChild(newTextBox);

    var newAmountBox = document.createElement("div");
    newAmountBox.innerHTML =
        "<input type='text' id='newInputBox' name='ingredientAmount" + numIngredients + "' placeholder='amount'>";
    document.getElementById("newIngredientAmountId").appendChild(newAmountBox);
    numIngredients++;
};
/* eslint-enable no-unused-vars*/

/* eslint-disable no-unused-vars*/
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
/* eslint-enable no-unused-vars*/