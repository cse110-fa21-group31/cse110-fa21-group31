module.exports = { createRecipe, deleteRecipe, updateRecipe, getAllRecipe,getRecipesByNameAndTags, getRecipeById, getRecipesByIds }

/**
 * insert a single recipe to database
 * @param {recipe} recipe 
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
 * @param {string} id 
 */
async function deleteRecipe(id, recipeCollection) {
    recipeCollection.deleteOne({ _id: id });
}


/**
 * updates one recipe in the database
 * @param {string} id 
 * @param {*} recipe 
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
 * @returns all recipes in the database
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
 * @param {*} searchParams 
 * @returns 
 */
async function getRecipesByNameAndTags(searchParams){
    filters = {}
    if (searchParams.name){
        let keywords = searchParams.name.toLowerCase().split(" ");
        // TODO (Bjorn): Make sure this is enough to catch all overlapping names
        filters.name = { $in: keywords }
    }
    if (searchParams.tags){
        let tags = tags.map(t => t.toLowerCase());
        filters.name = { $all: tags }
    }

    let foundDocs = []
    // TODO (Bjorn): sort the returned results
    recipeDB.find(filters, (err, docs) => {
        if (err) {
        log(err);
        }
        foundDocs = docs;
    });
    return foundDocs;
}

/**
 * retrieves a single recipe based on id
 * @param {string} id the id used to look up a recipe
 * @returns recipe matching the id
 * @returns null if not found
 */
function getRecipeById(id, recipeCollection) {
    return getRecipesByIds([id], recipeCollection);
}


/**
 * retrieves a number of recipes based on their ids
 * @param {Array[string]} ids 
 * @returns recipes matching any of the given ids
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
