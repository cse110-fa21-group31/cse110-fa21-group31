/* eslint-disable no-unused-vars*/
// append recipe id to user schema
module.exports.createRecipe = async function createRecipe(
    recipe,
    recipeCollection
) {
    let insertedDoc = new Promise((resolve, reject) => {
        recipeCollection.insert(recipe, function (err, doc) {
            if (!err) {
                resolve(doc);
            } else {
                reject(err);
            }
        });
    });
    return insertedDoc;
};
/* eslint-enable no-unused-vars*/

/* eslint-disable no-unused-vars*/
module.exports.deleteRecipe = async function deleteRecipe(
    id,
    recipeCollection
) {
    // Call Xin's function that unsaves recipe from specific user
};
/* eslint-enable no-unused-vars*/

/* eslint-disable no-unused-vars*/
module.exports.updateRecipe = async function updateRecipe(
    id,
    recipe,
    recipeCollection
) {
    let updatedRecipes = new Promise((resolve, reject) => {
        recipeCollection.update(
            { _id: id },
            recipe,
            { returnUpdatedDocs: true },
            function (err, numAffected, affectedDocs, upsert) {
                if (!err) {
                    console.log("Updated " + numAffected + " documents");
                    console.log(affectedDocs);
                    resolve(affectedDocs);
                } else {
                    reject(err);
                }
            }
        );
    });
    return updatedRecipes;
};
/* eslint-enable no-unused-vars*/

/* eslint-disable no-unused-vars*/
module.exports.getAllRecipe = function getAllRecipe(recipeCollection) {
    let allRecipes = new Promise((resolve, reject) => {
        const recipesCursor = recipeCollection.find({}, function (err, docs) {
            if (!err) {
                resolve(docs);
            } else {
                reject(err);
            }
        });
    });
    return allRecipes;
};
/* eslint-enable no-unused-vars*/

/* eslint-disable no-unused-vars*/
module.exports.getRecipeById = async function getRecipeById(
    id,
    recipeCollection
) {
    let recipe = new Promise((resolve, reject) => {
        recipeCollection.findOne({ _id: id }, function (err, doc) {
            if (!err) {
                console.log("noooooo");
                resolve(doc);
            } else {
                console.log("here");
                reject(err);
            }
        });
    });
    return recipe;
};
/* eslint-enable no-unused-vars*/

/* eslint-disable no-unused-vars*/
module.exports.getRecipeByIds = function getRecipeByIds(
    ids,
    recipeCollection
) { };
/* eslint-enable no-unused-vars*/

exports.getRecipeById = getRecipeById;