// import { RECIPE_DB_PATH } from "../util";

module.exports = { getRecipesByNameAndTags }

/**
 * Guide to test neDB
 * 1. run `npm install`
 * 2. cd to current folder
 * 3. run `node interface.js`
 */
const Datastore = require('nedb');

// const { RECIPE_DB_PATH } = require('../util');
// var db = new Datastore({ filename: 'data/demo' });
const RECIPE_DB_PATH = "../data/recipes"
const recipeDB = new Datastore({ filename: RECIPE_DB_PATH, autoload: true })

/**
 * insert a single recipe to database
 * @param {recipe} recipe 
 */
function createRecipe(recipe) {
    let id = undefined;
    recipeDB.insert(recipe, function (err, newDoc) {   // Callback is optional
        // newDoc is the newly inserted document, including its _id
        // newDoc has no key called notToBeSaved since its value was undefined
        if (err) {
            //debug usage, log any possible error
            log(err);
        }
        else {
            id = newDoc._id;
        }
    });
    return id;
}

async function getRecipesByNameAndTags(searchParams){
    filters = {}
    if (searchParams.name){
        let keywords = searchParams.name.toLowerCase().split(" ");
        filters.name = { $in: keywords }
    }
    if (searchParams.tags){
        let tags = tags.map(t => t.toLowerCase());
        filters.name = { $in: tags }
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
 * 
 * @param {string} id 
 */
function deleteRecipe(id) {

}

/**
 * 
 * @param {string} id 
 * @param {*} recipe 
 */
function updateRecipe(id, recipe) {

}

/**
 * 
 * @returns all recipes in the database
 */
function getAllRecipe() {
    let foundDocs = []
    recipeDB.find({}, function (err, docs) {
        if (err) {
            //debug usage, log any possible error
            log(err);
        }
        foundDocs = docs;
    });
    return foundDocs;
}

/**
 * 
 * @param {string} id the id used to look up a recipe
 * @returns recipe matching the id
 * @returns null if not found
 */
function getRecipeById(id) {
    return getRecipesByIds([id]);
}

/**
 * 
 * @param {Array[string]} ids 
 * @returns recipes matching any of the given ids
 */
function getRecipesByIds(ids) {
    let foundDocs = []
    recipeDB.find({ _id: { $in: ids } }, function (err, docs) {
        // If no document is found, docs is null
        if (err) {
            //debug usage, log any possible error
            log(err);
        }
        foundDocs = docs;
    });
    return foundDocs
}
