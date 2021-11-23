// This script will take the user's input with their recipe data in editCreate.html, and will send it to the server to be saved.
window.addEventListener("DOMContentLoaded", init);

const url = "http://127.0.0.1:3030/api"

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
let numSteps = 0;
let numIngredients = 0;

const onSubmitRecipe = async (event) => {
    console.log("SUBMITTED THINGY");
    event.preventDefault();
    event.preventDefault();
    const recipeF = document.getElementById("recipeForm");
    let formData = new FormData(recipeF);
  
    // get ingredients from form
    let ingrArr = [];
    let ingrAmountArr = [];
    let stepsArr = [];
    let strTags = formData.get('tags').split(',');
    strTags.push(formData.get('difficulty')+'*');
    //let tagsArr = strTags.split(',');
    for (let i = 0; i<numIngredients;i++){
        ingrArr.push(formData.get('ingredient'+i));
        ingrAmountArr.push(formData.get('ingredientAmount'+i));
        console.log(formData.get('ingredient'+i));
        console.log(formData.get('ingredientAmount'+i));
    }

    // get steps from form
    for (let i = 0; i<numSteps;i++){
        stepsArr.push(formData.get('step'+i));
        console.log(formData.get('step'+i));
    }
    
    const recipeCard = document.createElement('recipe-card');
    
    // CREATE NEW RECIPE
    let newRecipe = {
        name: formData.get('name'),
        datePosted: Date.now(),
        coverImage: formData.get('picture'),
        authorID: "HZRfg63gUu5M8S0F",
        description: formData.get('description'),
        tags: strTags,
        servingSize: formData.get('servingSize'),
        cookTime: formData.get('cookTime'),
        ingredients: ingrArr,
        ingredientAmounts: ingrAmountArr,
        steps: stepsArr
    }
    console.log(newRecipe)

    let response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(newRecipe) // body data type must match "Content-Type" header
    }).then((response) => response.json())
        .then((data) => {
            // This grabs the data return by the server
            return data
        })
        .catch((err) => {
            console.log(`Error loading the ${recipe} recipe`);
            reject(err);
        });
    //the recipe object received from backend server

    console.log(response)

};


/* eslint-disable no-unused-vars*/
const appendStep = () => {
    //let d = document.getElementById('steps');
    // d.innerHTML += "<input type='text' id='tst"+ x++ +"'><br >";
    var newTextBox = document.createElement("div");
    
    newTextBox.innerHTML =
        "<textarea cols='40' rows='4' id='textAreaBox' name='step"+numSteps+"' placeholder='Step #" +
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
        "<input type='text' id='newInputBox' name='ingredient"+numIngredients+"' placeholder='ingredient'>";
    document.getElementById("newIngredientId").appendChild(newTextBox);

    var newAmountBox = document.createElement("div");
    newAmountBox.innerHTML =
        "<input type='text' id='newInputBox' name='ingredientAmount"+numIngredients+"' placeholder='amount'>";
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
