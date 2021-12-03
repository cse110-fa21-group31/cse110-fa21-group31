import { CARDS_PER_PAGE } from "../util.js";
import { getUser } from "./userInterface.mjs";
import { userDB } from "./server.mjs";
/**
 * insert a single recipe to database
 * 
 * @param {recipe} recipe the recipe to insert
 * @param {*} recipeCollection the database to search in
 * @returns {Array<recipe>} the inserted recipe
 */
export async function createRecipe(recipe, recipeCollection) {
    let insertedDoc = new Promise((resolve, reject) => {
        recipeCollection.insert(recipe, function (err, doc) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(doc);
            }
        });
    });
    return insertedDoc;
}


/**
 * removes a single recipe from the database
 * 
 * @param {string} id unique string identifier of the desired recipe
 * @param {*} recipeCollection the database to search in
 */
export async function deleteRecipe(id, recipeCollection) {
    await recipeCollection.remove({ _id: id });
    console.log("DELETED RECIPE: " + id);
}


/**
 * updates one recipe in the database
 * 
 * @param {string} id unique string identifier of the desired recipe
 * @param {*} recipe the recipe data (or subset thereof) to update
 * @param {*} recipeCollection the database to search in
 * @returns {Array<recipe>} the updated recipe
 */
export async function updateRecipe(id, recipe, recipeCollection) {
    let updatedRecipes = await new Promise((resolve, reject) => {
        recipeCollection.update({ _id: id },
            recipe, { returnUpdatedDocs: true },
            function (err, numAffected, affectedDocs) {
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
}


/**
 * retrieves all recipes with overlap in the names and all tags match
 * 
 * @param {*} query the content to search for
 * @param {*} recipeCollection the database to search in
 * @returns {Array<recipe>} the matching recipes
 */
export async function getRecipesByQuery(query, recipeCollection) {
    let filter = getFilterFromQuery(query);
    let page = undefined;
    if (query.page) {
        page = query.page;
    }
    return await getRecipesByFilter(filter, recipeCollection, page);
}

/**
 * finds the number of pages of results returned by this query
 * 
 * @param {*} query the content to search for
 * @param {*} recipeCollection the database to search in
 * @returns {Array<recipe>} the matching recipes
 */
 export async function getPageCountByQuery(query, recipeCollection) {
    let filter = getFilterFromQuery(query);
    let numRecipes = await new Promise((resolve, reject) => {
        recipeCollection.count(filter, function (err, doc) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(doc);
            }
        });
    });
    return {
        results: numRecipes,
        pages: parseInt(numRecipes/CARDS_PER_PAGE + 1)
    };
}


/**
 * retrieves a single recipe based on id
 * 
 * @param {string} id unique string identifier of the desired recipe
 * @param {*} recipeCollection the database to search in
 * @returns {recipe} the found recipe
 * @returns {null} if not found
 */
export async function getRecipeById(id, recipeCollection) {
    let foundDoc = await new Promise((resolve, reject) => {
        recipeCollection.findOne({ _id: id }, function (err, doc) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(doc);
            }
        });
    });
    return foundDoc;
}


/**
 * sorts the db query results and returns results corresponding to correct
 * current page number
 * 
 * @param dbCursor the result of the db query
 * @param curr_page the current page of results to display
 * @returns {Array<recipe>} the recipes corresponding to the query
 */
export function sortAndPaginateResults(dbCursor, curr_page) {
    if(curr_page == undefined){
        curr_page = 1;
    }
    curr_page = Math.max(curr_page, 1);
    let resultsToSkip = CARDS_PER_PAGE * (curr_page - 1);
    let foundDocs = new Promise((resolve, reject) => {
        dbCursor
        .sort({ datePosted: -1 })
        .skip(resultsToSkip)
        .limit(CARDS_PER_PAGE)
        .exec(function (err, docs) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(docs);
            }
        });
    });
    return foundDocs;
}

/**
 * Changes all user ids in recipes into user object. 
 * 
 * @deprecated
 * @param recipes Recipes to convert user.
 * @returns recipes with converted user. 
 */
export async function convertUserIdToObj(recipes) {
    recipes = await Promise.all(recipes.map(async (recipe) => {
        recipe.author = await getUser(userDB, recipe.author);
        return recipe;
    }));
    
    return recipes;
}

/****************** Internal functions ************************/

/**
 * builds the filter object from a query
 * 
 * @param {*} query the content to search for
 * @returns {*} the filter to use in an actual db call
 */
function getFilterFromQuery(query){
    let filter = {}
    if (query.ids){
        let ids = query.ids.split(",");
        filter = { _id: { $in: ids }};
    }
    else {
        if (query.name) {
            // TODO (Bjorn): Create a list of common words to ignore
            let keywords = [];
            for (let n of query.name.split(" ")) {
                let pattern = new RegExp(n, 'i');
                keywords.push({ name: { $regex: pattern } });
            }
            filter.$or = keywords;
        }
        if (query.tags) {
            let tags = [];
            for (let t of query.tags.split(',')) {
                tags.push({ tags: new RegExp(t, 'i') });
            }
            filter.$and = tags;
        }
    }
    return filter;
}

/**
 * searches the db using a filter
 * 
 * @param {string} filter the filter to search the db with
 * @param {*} recipeCollection 
 * @param {int} page the database to search in
 * @returns {Array<recipe>} the recipes matching any of the given ids
 */
 async function  getRecipesByFilter(filter, recipeCollection, page) {
    let dbCursor = recipeCollection.find(filter);
    return sortAndPaginateResults(dbCursor, page);
}
