// This script will take the user's input with their recipe data in editCreate.html, and will send it to the server to be saved.
window.addEventListener('DOMContentLoaded', init);

function init() {
    console.log('editCreate.js init called') 

    // Adding steps to the recipe
    const addStepButton = document.querySelector('#addSteps button');
    //addStepButton.addEventListener('click', appendRow);
    
    // Submitting the entire recipe
    const recipeForm = document.getElementById("recipeForm");
    recipeForm.onsubmit = onSubmitRecipe;
}

const onSubmitRecipe = (event) => {
    console.log('SUBMITTED THINGY');
    event.preventDefault();
}

let numSteps = 1;
const appendStep = () => {
   //let d = document.getElementById('steps');
   // d.innerHTML += "<input type='text' id='tst"+ x++ +"'><br >";
   var newTextBox = document.createElement('div');
   newTextBox.innerHTML = "<input type='textarea' cols='40' rows='5' id='newInputBox' placeholder='Step #"+numSteps+"'>";
   document.getElementById("newStepId").appendChild(newTextBox);
   numSteps++;
}

const deleteStep = () => {
    //newTextBox.classList.add('stepEntry');
    if (document.getElementById("newStepId").lastChild != null){
    document.getElementById("newStepId").removeChild(document.getElementById("newStepId").lastChild);
    numSteps--;
    }

}

const appendIngredient = () => {
    var newTextBox = document.createElement('div');
    newTextBox.innerHTML = "<input type='text' id='newInputBox' placeholder='ingredient'>";
    document.getElementById("newIngredientId").appendChild(newTextBox);


    var newAmountBox = document.createElement('div');
    newAmountBox.innerHTML = "<input type='text' id='newInputBox' placeholder='amount'>";
    document.getElementById("newIngredientAmountId").appendChild(newAmountBox);
 }
 
 const deleteIngredient= () => {
     if (document.getElementById("newIngredientId").lastChild != null){
     document.getElementById("newIngredientId").removeChild(document.getElementById("newIngredientId").lastChild);
     document.getElementById("newIngredientAmountId").removeChild(document.getElementById("newIngredientAmountId").lastChild);
     }
 
 }