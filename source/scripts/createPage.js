// This script will take the user's input with their recipe data in editCreate.html, and will send it to the server to be saved.
import { insertRecipe } from "./APICalls.js"
import { redirectRecipeDetail, routerNavigateWrapper, userData } from "./index.js";
import { RECIPE_ROUTE, HOME_ROUTER } from './util.js'
export default { setupCreatePage }
export function setupCreatePage() {
    // console.log("setupCreatePage() called");

    // Submitting the entire recipe
    const cancelBtn = document.getElementById("cancel")
    cancelBtn.addEventListener('click', () => {

        routerNavigateWrapper(HOME_ROUTER)
    })
    const recipeForm = document.getElementById("recipeForm");
    recipeForm.onsubmit = onSubmitRecipe;
    clearRecipePage();
    if (document.querySelector("#recipeForm #addIngr").getAttribute('listener') !== 'true') {
        document.querySelector("#recipeForm #addIngr").setAttribute('listener', 'true');
        document.querySelector("#recipeForm #addIngr").addEventListener("click", function() {
            appendIngredient();
        });
        document.querySelector("#recipeForm #addStep").addEventListener("click", function() {
            appendStep();
        });
        document.querySelector("#recipeForm #delIngr").addEventListener("click", function() {
            deleteIngredient();
        });
        document.querySelector("#recipeForm #delStep").addEventListener("click", function() {
            deleteStep();
        });
    }

}

let numSteps = 0;
let numIngredients = 0;
const onSubmitRecipe = async(event) => {

    // console.log("SUBMITTED NEW RECIPE");
    event.preventDefault();
    const recipeF = document.getElementById("recipeForm");
    let formData = new FormData(recipeF);

    // get ingredients from form
    let stepsArr = [];
    //should be empty array if no input
    let strTags = formData.get('tags') ? formData.get('tags').replace(/\s+/g, '').split(/[;,.]+/) : [];
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
        image: formData.get('picture'),
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
    responseRecipe.author = userData;
    redirectRecipeDetail(responseRecipe)
    userData.myRecipe.push(responseRecipe);
    const page = responseRecipe._id;
    const routeUrl = RECIPE_ROUTE + page
    routerNavigateWrapper(routeUrl)
};

const appendStep = () => {
    //let d = document.getElementById('steps');
    // d.innerHTML += "<input type='text' id='tst"+ x++ +"'><br >";
    console.log("APPEND STEP");
    var newTextBox = document.createElement("div");

    newTextBox.innerHTML =
        "<textarea cols='40' rows='4' id='textAreaBox' name='step" + numSteps + "' placeholder='Step #" +
        numSteps +
        "'></textarea>";
    document.getElementById("newStepId").appendChild(newTextBox);
    numSteps++;

};

const deleteStep = () => {
    //newTextBox.classList.add('stepEntry');
    console.log("DELETED STEP");
    if (document.getElementById("newStepId").lastChild != null) {
        document
            .getElementById("newStepId")
            .removeChild(document.getElementById("newStepId").lastChild);
        numSteps--;
    }
};

const appendIngredient = () => {
    console.log("APPEND INGREDIENT");
    var newTextBox = document.createElement("div");
    newTextBox.innerHTML =
        "<input type='text' id='newInputBox' name='ingredient" + numIngredients + "' placeholder='ingredient'>";
    document.getElementById("newIngredientId").appendChild(newTextBox);

    var newAmountBox = document.createElement("div");
    newAmountBox.innerHTML =
        "<input type='text' id='newInputBox' name='ingredientAmount" + numIngredients + "' placeholder='amount (ie. 5 cups)'>";
    document.getElementById("newIngredientAmountId").appendChild(newAmountBox);
    numIngredients++;
};

const deleteIngredient = () => {
    console.log("DELETE INGREDIENT");
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
