module.exports = { createRecipe, deleteRecipe, updateRecipe, getAllRecipe,getRecipesByNameAndTags, getRecipeById, getRecipesByIds }

/**
 * insert a single recipe to database
 * @param {recipe} recipe the recipe to insert
 * @param {*} recipeCollection the database to search in
 * @returns {Array<recipe>} the inserted recipe
 */
async function createRecipe(recipe, recipeCollection) {
    let insertedDoc = new Promise((resolve, reject) => {
        recipeCollection.insert(recipe, function (err, doc) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve(doc);
            }
        });
    });
    return insertedDoc;
}


/**
 * removes a single recipe from the database
 * @param {string} id unique string identifier of the desired recipe
 * @param {*} recipeCollection the database to search in
 */
async function deleteRecipe(id, recipeCollection) {
    recipeCollection.deleteOne({ _id: id });
}


/**
 * updates one recipe in the database
 * @param {string} id unique string identifier of the desired recipe
 * @param {*} recipe the recipe data (or subset thereof) to update
 * @param {*} recipeCollection the database to search in
 * @returns {Array<recipe>} the updated recipe
 */
/* eslint-disable no-unused-vars*/
async function updateRecipe(id, recipe, recipeCollection) {
    let updatedRecipes = new Promise((resolve, reject) => {
        recipeCollection.updateOne(
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

/**
 * fetches all recipes
 * @param {*} recipeCollection the database to search in
 * @returns {Array<recipe>} all recipes in the database
 */
 function getAllRecipe(recipeCollection) {
    let foundDocs = new Promise((resolve, reject) => {
        recipeCollection.find({}, function (err, docs) {
            if (err) {
                console.log(err);
                reject(err);
            }
            else{
                resolve(docs);
            }
        });
    });
    return foundDocs;
}


/**
 * retrieves all recipes with overlap in the names and all tags match
 * @param {*} searchParams the content to search for
 * @param {*} recipeCollection the database to search in
 * @returns {Array<recipe>} the matching recipes
 */
async function getRecipesByNameAndTags(searchParams, recipeCollection){
    filters = {}
    if (searchParams.name){
        // TODO (Bjorn): Make this general enough to catch any overlap between
        // search keywords and recipe name

        // let keywords = [];
        // for (n of searchParams.name.split(" ")) {
        //     keywords.push({name: n});
        // }
        // filters.$or = keywords;
        filters.name = searchParams.name;
    }
    if (searchParams.tags){
        let tags = [];
        for (t of searchParams.tags.split(',')) {
            tags.push({tags: t.toLowerCase()});
        }
        filters.$and = tags;
    }

    let foundDocs = new Promise((resolve, reject) => {
        recipeCollection.find(filters, (err, docs) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve(docs);
            }
        });
    });
    return foundDocs;
}

/**
 * retrieves a single recipe based on id
 * @param {string} id unique string identifier of the desired recipe
 * @returns {Array<recipe>} the found recipe
 * @returns {null} if not found
 */
function getRecipeById(id, recipeCollection) {
    return getRecipesByIds([id], recipeCollection);
}


/**
 * retrieves a number of recipes based on their ids
 * @param {Array<string>} ids 
 * @returns {Array<recipe>} the recipes matching any of the given ids
 */
function getRecipesByIds(ids, recipeCollection) {
    let foundDocs = new Promise((resolve, reject) => {
        recipeCollection.find({ _id: { $in: ids } }, function (err, docs) {
            if (err) {
                log(err);
                reject(err);
            }
            else {
                resolve(docs);
            }
        });
    });
    return foundDocs
}
