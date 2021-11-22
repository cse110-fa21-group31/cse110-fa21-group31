/* eslint-disable no-unused-vars*/
function createRecipe(recipe) { }
/* eslint-enable no-unused-vars*/

/* eslint-disable no-unused-vars*/
function deleteRecipe(id) { }
/* eslint-enable no-unused-vars*/

/* eslint-disable no-unused-vars*/
function updateRecipe(id, recipe) { }
/* eslint-enable no-unused-vars*/

/* eslint-disable no-unused-vars*/
function getAllRecipe() { }
/* eslint-enable no-unused-vars*/

/* eslint-disable no-unused-vars*/
async function getRecipeById(collection, id) {
    let recipe = {}
    console.log("finding recipe with id", id)
    recipe = new Promise((resolve, reject) => {
        collection.findOne({ _id: id }, function (err, doc) {
            if (!err) {
                // console.log("finding doc", doc)
                // recipe = doc
                resolve(doc);
            }
        });
    });
    console.log("recipe", recipe)
    return recipe
}
/* eslint-enable no-unused-vars*/

/* eslint-disable no-unused-vars*/
function getRecipeByIds(ids) { }
/* eslint-enable no-unused-vars*/

exports.getRecipeById = getRecipeById;