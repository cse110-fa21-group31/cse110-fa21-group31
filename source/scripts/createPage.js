// This script will take the user's input with their recipe data in editCreate.html, and will send it to the server to be saved.
import { insertRecipe } from "./APICalls.js"
import { redirectRecipeDetail, routerNavigateWrapper, userData } from "./index.js";
import { RECIPE_ROUTE } from './util.js'
export default { setupCreatePage }
export function setupCreatePage() {
    // console.log("setupCreatePage() called");

    // Submitting the entire recipe

    const recipeForm = document.getElementById("recipeForm");
    recipeForm.onsubmit = onSubmitRecipe;
    //document.getElementById("addIngr").onclick = appendIngredient();
    clearRecipePage();
    if (document.getElementById("addIngr").getAttribute('listener') !== 'true') {
        document.getElementById("addIngr").setAttribute('listener', 'true');

        document.getElementById("addIngr").addEventListener("click", function() {
            appendIngredient();
        });
        document.getElementById("addStep").addEventListener("click", function() {
            appendStep();
        });
        document.getElementById("delIngr").addEventListener("click", function() {
            deleteIngredient();
        });
        document.getElementById("delStep").addEventListener("click", function() {
            deleteStep();
        });
    }

}

let numSteps = 0;
let numIngredients = 0;
//TODO: update/find a way to assign value to this variable
let isUpdate = false
const onSubmitRecipe = async(event) => {

    // console.log("SUBMITTED NEW RECIPE");
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

    let ingWithAmountArr = {};
    for (let i = 0; i < numIngredients; i++) {
        ingWithAmountArr[formData.get('ingredient' + i)] = formData.get('ingredientAmount' + i);
        /** 
        ingrArr.push(formData.get('ingredient'+i));
        ingrAmountArr.push(formData.get('ingredientAmount'+i));
        console.log(formData.get('ingredient'+i));
        console.log(formData.get('ingredientAmount'+i));
        */
    }
    // console.log(ingArr);

    // get steps from form
    for (let i = 0; i < numSteps; i++) {
        stepsArr.push(formData.get('step' + i));
        console.log(formData.get('step' + i));
    }

    // DANICA's attempt in uploading image
    const recipeCard = document.createElement('recipe-card');
    //console.log(document.getElementsByName('picture')[0].files[0]);
    let pic = null;
    let img = null
    if (document.getElementsByName('picture')[0].files.length > 0) {
        pic = document.getElementsByName('picture')[0].files[0];
        // img = window.URL.createObjectURL(fileObj);
    }

    // CREATE NEW RECIPE
    let newRecipe = {
        name: formData.get('name'),
        datePosted: Date.now(),
        //TODO: how to store image
        image: formData.get('picture'),
        // image: formData.get('fileBuffer'),
        //TODO: get user ID from a global variable, is it working?
        author: userData._id,
        description: formData.get('description'),
        tags: strTags,
        servingSize: formData.get('servingSize'),
        cookTime: formData.get('cookTime'),
        ingredients: ingWithAmountArr,
        difficulty: formData.get('difficulty'),
        steps: stepsArr
    }
    console.log(newRecipe);
    // get response from POST API, get the new recipe, 
    const responseRecipe = await insertRecipe(newRecipe);
    redirectRecipeDetail(responseRecipe)
    console.log(responseRecipe);
    const page = responseRecipe._id;
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
const clearRecipePage = () => {

    console.log("CLEARED");

    document.getElementById('recipeForm').reset();

    for (let i = 0; i <= numSteps; i++) {
        deleteStep();
    }

    for (let i = 0; i <= numIngredients; i++) {
        deleteIngredient();
    }
};
/* eslint-enable no-unused-vars*/