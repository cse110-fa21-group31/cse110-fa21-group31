// This script will take the user's input with their recipe data in editCreate.html, and will send it to the server to be saved.
import { deleteRecipe, updateRecipeById } from "./APICalls.js"
import { RECIPE_ROUTE } from "./util.js"
import { redirectRecipeDetail, routerNavigateWrapper } from "./index.js";
const url = "http://127.0.0.1:3030/api"
//var pageId = 'TRLJBrD85YE6oS0b'; // Gojo page DO NOT DELETE
var pageId = 'zWLApN1kvM5MezgL'; // test page, delete if you want
let imageSrc = ''
export default {}
export function populateEditPage(recipeObj) {

    console.log("editCreate.js init called");

    fillOutEditPage(recipeObj);

    // Adding steps to the recipe
    /* eslint-disable no-unused-vars*/
    const addStepButton = document.querySelector("#addSteps button");
    /* eslint-enable no-unused-vars*/
    //addStepButton.addEventListener('click', appendRow);

    // Submitting the entire recipe

    const recipeForm = document.getElementById("editRecipeForm");
    recipeForm.onsubmit = onUpdateRecipe;
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
    document.getElementById("delete").addEventListener("click", function () {
        deleteRecipeButton();
    });
}

const deleteRecipeButton = async (event) => {
    await deleteRecipe(pageId);
}


let numSteps = 0;
let numIngredients = 0;

export const fillOutEditPage = (recipeObj) => {

    console.log("EDITTED RECIPE");

    // get recipe info and fill it out
    // let response = await fetchRecipeById(pageId);
    //TODO: update the variable from response to recipeObj
    let response = recipeObj
    console.log(response);
    // get ingredients from data
    document.getElementById('editName').innerHTML = '<label for="name">Recipe Name: *</label><input type="text" name="name" id="name" value="' + response.name + '" required>';
    //document.getElementById('picture').innerHTML = 'label for="picture">Picture:</label><input type="file" name="picture" id="picture" src="'+response.image+'">';
    document.getElementById('editDescription').innerHTML = '<label for="description">Description:</label><textarea name="description" id="descriptionText"> ' + response.description + ' </textarea>';


    document.getElementById('editTags').innerHTML = '<label for="tags">Tags:</label><input type="text" name="tags" id="tags" value="' + response.tags.join(", ") + '">';

    document.getElementById('editCookTime').innerHTML = '<label for="cookTime">Cook Time:</label><input type="text" name="cookTime" id="prepTime" value="' + response.cookTime + '">';

    document.getElementById('editServingSize').innerHTML = '<label for="servingSize">Serving Size:</label><input type="text" name="servingSize" id="servingSize" value="' + response.servingSize + '">';

    //document.getElementById('difficulty').innerHTML = '<label for="difficulty">Difficulty:</label><select name="difficulty" id="difficulty"><option value="1">1 star</option><option value="2">2 stars</option><option value="3">3 stars</option><option value="4">4 stars</option><option value="5">5 stars</option></select>';
    let diff = response.difficulty.charAt(0);
    if (diff == '1') {
        document.getElementById('editDifficulty').innerHTML = '<label for="difficulty">Difficulty:</label><select name="difficulty" id="difficulty"><option selected value="1">1 star</option><option value="2">2 stars</option><option value="3">3 stars</option><option value="4">4 stars</option><option value="5">5 stars</option></select>';
    } else if (diff == '2') {
        document.getElementById('editDifficulty').innerHTML = '<label for="difficulty">Difficulty:</label><select name="difficulty" id="difficulty"><option value="1">1 star</option><option selected value="2">2 stars</option><option value="3">3 stars</option><option value="4">4 stars</option><option value="5">5 stars</option></select>';
    } else if (diff == '3') {
        document.getElementById('editDifficulty').innerHTML = '<label for="difficulty">Difficulty:</label><select name="difficulty" id="difficulty"><option value="1">1 star</option><option value="2">2 stars</option><option selected value="3">3 stars</option><option value="4">4 stars</option><option value="5">5 stars</option></select>';
    } else if (diff == '4') {
        document.getElementById('editDifficulty').innerHTML = '<label for="difficulty">Difficulty:</label><select name="difficulty" id="difficulty"><option value="1">1 star</option><option value="2">2 stars</option><option value="3">3 stars</option><option selected value="4">4 stars</option><option value="5">5 stars</option></select>';
    } else {
        document.getElementById('editDifficulty').innerHTML = '<label for="difficulty">Difficulty:</label><select name="difficulty" id="difficulty"><option value="1">1 star</option><option value="2">2 stars</option><option value="3">3 stars</option><option value="4">4 stars</option><option selected value="5">5 stars</option></select>';
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
    imageSrc = recipeObj.image

    /** 
    document.getElementById('').innerHTML = '';
    document.getElementById('').innerHTML = '';
    document.getElementById('').innerHTML = '';
    document.getElementById('').innerHTML = '';
    document.getElementById('').innerHTML = '';

    document.getElementById("recipeTitle").innerHTML = data.name;
    document.getElementById("tags").innerHTML= data.tags;
    document.getElementById("recipeImage").setAttribute("src", data.image);
    document.getElementById("date").innerHTML = new Date(data.datePosted * 1000);
    document.getElementById("description").innerHTML = data.description;
    document.getElementById("servingSize").innerHTML = data.servingSize;
    document.getElementById("author").innerHTML = data.author;
    document.getElementById("cookTime").innerHTML = data.cookTime;
    document.getElementById("ingredients").innerHTML = data.ingredients;
    document.getElementById("steps").innerHTML = data.steps;
    */
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
    let strTags = formData.get('tags').replace(/\s+/g, '').split(',');
    //let tagsArr = strTags.split(',');

    let ingArr = {};
    for (let i = 0; i < numIngredients; i++) {
        ingArr[formData.get('ingredient' + i)] = formData.get('ingredientAmount' + i);
    }
    console.log(ingArr);

    // get steps from form
    for (let i = 0; i < numSteps; i++) {
        stepsArr.push(formData.get('step' + i));
        console.log(formData.get('step' + i));
    }

    console.log(formData.get('picture'));
    // CREATE NEW RECIPE
    let newRecipe = {
        name: formData.get('name'),
        datePosted: Date.now(),
        //TODO: figure out the way to store image. Not update it for now
        // image: formData.get('picture'),
        image: imageSrc,
        author: "HZRfg63gUu5M8S0F",
        description: formData.get('description'),
        tags: strTags,
        servingSize: formData.get('servingSize'),
        cookTime: formData.get('cookTime'),
        ingredients: ingArr,
        difficulty: formData.get('difficulty'),
        ingredientAmounts: ingrAmountArr,
        steps: stepsArr,
        _id: pageId
    }
    console.log(newRecipe);
    const updatedRecipe = await updateRecipeById(pageId, newRecipe);
    //TODO: fix update API calls: not actually update so return undefined to us
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

const appendEIngredient = (existingIngredient, existingAmount) => {
    var newTextBox = document.createElement("div");
    newTextBox.innerHTML =
        "<input type='text' id='newInputBox' name='ingredient" + numIngredients + "' placeholder='ingredient' value=" + existingIngredient + ">";
    document.getElementById("editNewIngredientId").appendChild(newTextBox);

    var newAmountBox = document.createElement("div");
    newAmountBox.innerHTML =
        "<input type='text' id='newInputBox' name='ingredientAmount" + numIngredients + "' placeholder='amount' value=" + existingAmount + ">";
    document.getElementById("editNewIngredientAmountId").appendChild(newAmountBox);
    numIngredients++;
};
/* eslint-enable no-unused-vars*/

const appendEStep = (existingStep) => {
    //let d = document.getElementById('steps');
    // d.innerHTML += "<input type='text' id='tst"+ x++ +"'><br >";
    var newTextBox = document.createElement("div");

    newTextBox.innerHTML =
        "<textarea cols='40' rows='4' id='textAreaBox' name='step" + numSteps + "' placeholder='Step #" +
        numSteps +
        "'>" + existingStep + "</textarea>";
    document.getElementById("editNewStepId").appendChild(newTextBox);
    numSteps++;

};