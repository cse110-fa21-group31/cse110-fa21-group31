/* eslint-disable no-unused-vars*/
function createRecipe(recipe, recipeCollection) {
    const insertedId = await recipeCollection.insertOne(recipe).insertedId;
    recipe._id = insertedId;
    return recipe;
}
/* eslint-enable no-unused-vars*/

/* eslint-disable no-unused-vars*/
function deleteRecipe(id, recipeCollection) {}
/* eslint-enable no-unused-vars*/

/* eslint-disable no-unused-vars*/
function updateRecipe(id, recipe, recipeCollection) {}
/* eslint-enable no-unused-vars*/

/* eslint-disable no-unused-vars*/
function getAllRecipe(recipeCollection) {
    const allRecipes;
    const recipesCursor = recipeCollection.find();
    recipesCursor.foreach(recipe => {
        allRecipes.push(recipe);
    });
    return allRecipes;
}
/* eslint-enable no-unused-vars*/

/* eslint-disable no-unused-vars*/
function getRecipeById(id, recipeCollection) {

}
/* eslint-enable no-unused-vars*/

/* eslint-disable no-unused-vars*/
function getRecipeByIds(ids, recipeCollection) {}
/* eslint-enable no-unused-vars*/
