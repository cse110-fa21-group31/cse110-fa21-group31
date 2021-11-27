import { CARDS_PER_PAGE } from "../util.js";
/**
 * insert a single recipe to database
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
 * @param {string} id unique string identifier of the desired recipe
 * @param {*} recipeCollection the database to search in
 */
export async function deleteRecipe(id, recipeCollection) {
    recipeCollection.remove({ _id: id });
}


/**
 * updates one recipe in the database
 * @param {string} id unique string identifier of the desired recipe
 * @param {*} recipe the recipe data (or subset thereof) to update
 * @param {*} recipeCollection the database to search in
 * @returns {Array<recipe>} the updated recipe
 */
export async function updateRecipe(id, recipe, recipeCollection) {
    let updatedRecipes = new Promise((resolve, reject) => {
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
 * @param {*} query the content to search for
 * @param {*} recipeCollection the database to search in
 * @returns {Array<recipe>} the matching recipes
 */
export async function getRecipesByQuery(query, recipeCollection) {
    let filters = {}
    if (query.name) {
        // TODO (Bjorn): Create a list of common words to ignore
        let keywords = [];
        for (let n of query.name.split(" ")) {
            let pattern = new RegExp(n, 'i');
            keywords.push({ name: { $regex: pattern } });
        }
        filters.$or = keywords;
    }
    if (query.tags) {
        let tags = [];
        for (let t of query.tags.split(',')) {
            tags.push({ tags: t.toLowerCase() });
        }
        filters.$and = tags;
    }
    let page = undefined;
    if (query.page) {
        page = query.page;
    }
    let dbCursor = recipeCollection.find(filters);
    return sortAndPaginateResults(dbCursor, page);
}


/**
 * retrieves a single recipe based on id
 * @param {string} id unique string identifier of the desired recipe
 * @returns {Array<recipe>} the found recipe
 * @returns {null} if not found
 */
export function getRecipeById(id, recipeCollection) {
    let foundDoc = new Promise((resolve, reject) => {
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
 * retrieves a number of recipes based on their ids
 * @param {Array<string>} ids 
 * @returns {Array<recipe>} the recipes matching any of the given ids
 */
export function getRecipesByIds(ids, recipeCollection) {
    let dbCursor = recipeCollection.find({ _id: { $in: ids } });
    return sortAndPaginateResults(dbCursor);
}


/**
 * sorts the db query results and returns results corresponding to correct
 * current page number
 * @param dbCursor the result of the db query
 * @param curr_page the current page of results to display
 * @returns 
 */
export function sortAndPaginateResults(dbCursor, curr_page){
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