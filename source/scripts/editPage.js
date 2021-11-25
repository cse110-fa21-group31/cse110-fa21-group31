// This script will take the user's input with their recipe data in editCreate.html, and will send it to the server to be saved.
window.addEventListener("DOMContentLoaded", init);

const url = "http://127.0.0.1:3030/api"
    //var pageId = 'TRLJBrD85YE6oS0b'; // Gojo page DO NOT DELETE
var pageId = 'cVDGPZ40HpJBFSxU'; // test page, delete if you want
function init() {
    console.log("editCreate.js init called");

    editRecipe();

    // Adding steps to the recipe
    /* eslint-disable no-unused-vars*/
    const addStepButton = document.querySelector("#addSteps button");
    /* eslint-enable no-unused-vars*/
    //addStepButton.addEventListener('click', appendRow);

    // Submitting the entire recipe

    const recipeForm = document.getElementById("recipeForm");
    recipeForm.onsubmit = onSubmitRecipe;
}

let numSteps = 0;
let numIngredients = 0;
const deleteRecipe = async(event) => {

    console.log("DELETING");
    let response = await fetch(url + '?id=' + pageId, {
            method: 'DEL', // *GET, POST, PUT, DELETE, etc.
        }).then((response) => response.json())
        .then((data) => {
            // This grabs the data return by the server
            return data
        })
        .catch((err) => {});
}

const editRecipe = async(event) => {

    console.log("EDITTED RECIPE");

    // get recipe info and fill it out
    let recipeID = pageId;
    let response = await fetch(url + '?id=' + pageId, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
        }).then((response) => response.json())
        .then((data) => {
            // This grabs the data return by the server
            return data
        })
        .catch((err) => {});
    //the recipe object received from backend server

    console.log(response)


    // get ingredients from data
    document.getElementById('name').innerHTML = '<label for="name">Recipe Name: *</label><input type="text" name="name" id="name" value="' + response.name + '" required>';
    //document.getElementById('picture').innerHTML = 'label for="picture">Picture:</label><input type="file" name="picture" id="picture" src="'+response.image+'">';
    document.getElementById('description').innerHTML = '<label for="description">Description:</label><textarea name="description" id="descriptionText"> ' + response.description + ' </textarea>';

    document.getElementById('tags').innerHTML = '<label for="tags">Tags:</label><input type="text" name="tags" id="tags" value="' + response.tags.join(", ") + '">';

    document.getElementById('cookTime').innerHTML = '<label for="cookTime">Cook Time:</label><input type="text" name="cookTime" id="prepTime" value="' + response.cookTime + '">';

    document.getElementById('servingSize').innerHTML = '<label for="servingSize">Serving Size:</label><input type="text" name="servingSize" id="servingSize" value="' + response.servingSize + '">';

    //document.getElementById('difficulty').innerHTML = '<label for="difficulty">Difficulty:</label><select name="difficulty" id="difficulty"><option value="1">1 star</option><option value="2">2 stars</option><option value="3">3 stars</option><option value="4">4 stars</option><option value="5">5 stars</option></select>';
    let diff = response.difficulty.charAt(0);
    if (diff == '1') {
        document.getElementById('difficulty').innerHTML = '<label for="difficulty">Difficulty:</label><select name="difficulty" id="difficulty"><option selected value="1">1 star</option><option value="2">2 stars</option><option value="3">3 stars</option><option value="4">4 stars</option><option value="5">5 stars</option></select>';
    } else if (diff == '2') {
        document.getElementById('difficulty').innerHTML = '<label for="difficulty">Difficulty:</label><select name="difficulty" id="difficulty"><option value="1">1 star</option><option selected value="2">2 stars</option><option value="3">3 stars</option><option value="4">4 stars</option><option value="5">5 stars</option></select>';
    } else if (diff == '3') {
        document.getElementById('difficulty').innerHTML = '<label for="difficulty">Difficulty:</label><select name="difficulty" id="difficulty"><option value="1">1 star</option><option value="2">2 stars</option><option selected value="3">3 stars</option><option value="4">4 stars</option><option value="5">5 stars</option></select>';
    } else if (diff == '4') {
        document.getElementById('difficulty').innerHTML = '<label for="difficulty">Difficulty:</label><select name="difficulty" id="difficulty"><option value="1">1 star</option><option value="2">2 stars</option><option value="3">3 stars</option><option selected value="4">4 stars</option><option value="5">5 stars</option></select>';
    } else {
        document.getElementById('difficulty').innerHTML = '<label for="difficulty">Difficulty:</label><select name="difficulty" id="difficulty"><option value="1">1 star</option><option value="2">2 stars</option><option value="3">3 stars</option><option value="4">4 stars</option><option selected value="5">5 stars</option></select>';
    }

    let fillSteps = response.steps;
    for (let i = 0; i < fillSteps.length; i++) {
        appendEStep(fillSteps[i]);
    }

    let fillIngredients = response.ingredient;
    for (let key in fillIngredients) {
        console.log(key);
        appendEIngredient(key, fillIngredients[key]);
    }

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


const onSubmitRecipe = async(event) => {

    console.log("SUBMITTED NEW RECIPE");
    event.preventDefault();
    const recipeF = document.getElementById("recipeForm");
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
    let newRecipe = {
        name: formData.get('name'),
        datePosted: Date.now(),
        image: formData.get('picture'),
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
    console.log(newRecipe)

    //for update, change the method of PUT
    let response = await fetch(url, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(newRecipe) // body data type must match "Content-Type" header
        }).then((response) => response.json())
        .then((data) => {
            // This grabs the data return by the server
            return data
        })
        .catch((err) => {});
    //the recipe object received from backend server

    console.log(response)

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
    document.getElementById("newIngredientId").appendChild(newTextBox);

    var newAmountBox = document.createElement("div");
    newAmountBox.innerHTML =
        "<input type='text' id='newInputBox' name='ingredientAmount" + numIngredients + "' placeholder='amount' value=" + existingAmount + ">";
    document.getElementById("newIngredientAmountId").appendChild(newAmountBox);
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
    document.getElementById("newStepId").appendChild(newTextBox);
    numSteps++;

};