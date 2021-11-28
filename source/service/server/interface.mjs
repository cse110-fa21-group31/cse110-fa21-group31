import { getUser } from "./userInterface.mjs";
import { userDB, recipeDB } from "./server.mjs";

const CARDS_PER_PAGE = 6;
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
    console.log("DELET RECIPE SLFHISJFD" + id);
}


/**
 * updates one recipe in the database
 * @param {string} id unique string identifier of the desired recipe
 * @param {*} recipe the recipe data (or subset thereof) to update
 * @param {*} recipeCollection the database to search in
 * @returns {Array<recipe>} the updated recipe
 */
export async function updateRecipe(id, recipe, recipeCollection) {
    recipe.author = recipe.author._id;
    let updatedRecipes = await new Promise((resolve, reject) => {
        recipeCollection.update({ _id: id },
            recipe, { returnUpdatedDocs: true },
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
    // console.log(updatedRecipes);
    // let recipes = [];
    // if(foundDocs){
    //     recipes.push(updatedRecipes);
    //     updatedRecipes = await convertUserIdToObj(recipes);
    //     updatedRecipes = updatedRecipes[0];
    // }
    return updatedRecipes;
}


/**
 * fetches all recipes
 * @param {*} recipeCollection the database to search in
 * @returns {Array<recipe>} all recipes in the database
 */
export async function getRecipeByPage(recipeCollection, page) {
    page = Math.max(page, 1);
    let skippedRecipe = CARDS_PER_PAGE * (page - 1);
    let foundDocs = new Promise((resolve, reject) => {
        recipeCollection.find({}).sort({ _id: 1 }).skip(skippedRecipe)
            .limit(CARDS_PER_PAGE).exec(function (err, docs) {
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
 * retrieves all recipes with overlap in the names and all tags match
 * @param {*} searchParams the content to search for
 * @param {*} recipeCollection the database to search in
 * @returns {Array<recipe>} the matching recipes
 */
export async function getRecipesByNameAndTags(searchParams, recipeCollection) {
    let filters = {}
    if (searchParams.name) {
        // TODO (Bjorn): Create a list of common words to ignore
        let keywords = [];
        for (let n of searchParams.name.split(" ")) {
            let pattern = new RegExp(n, 'i');
            keywords.push({ name: { $regex: pattern } });
        }
        filters.$or = keywords;
    }
    if (searchParams.tags) {
        let tags = [];
        for (let t of searchParams.tags.split(',')) {
            tags.push({ tags: t.toLowerCase() });
        }
        filters.$and = tags;
    }

    let foundDocs = new Promise((resolve, reject) => {
        recipeCollection.find(filters, (err, docs) => {
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
 * retrieves a single recipe based on id
 * @param {string} id unique string identifier of the desired recipe
 * @returns {recipe} the found recipe
 * @returns {null} if not found
 */
export async function getRecipeById(id, recipeCollection) {
    let foundDocs = await new Promise((resolve, reject) => {
        recipeCollection.findOne({ _id: id }, function (err, docs) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(docs);
            }
        });
    });
    // convert
    // let recipes = [];
    // if(foundDocs){
    //     recipes.push(foundDocs);
    //     foundDocs = await convertUserIdToObj(recipes);
    //     foundDocs = foundDocs[0];
    // }
    return foundDocs;
}


/**
 * retrieves a number of recipes based on their ids
 * @param {Array<string>} ids 
 * @returns {Array<recipe>} the recipes matching any of the given ids
 */
export async function getRecipesByIds(ids, recipeCollection) {
    let foundDocs = new Promise((resolve, reject) => {
        recipeCollection.find({ _id: { $in: ids } }, function (err, docs) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(docs);
            }
        });
    });
    return foundDocs
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
    // console.log("After convert: ");
    // console.log(recipes);
    
    return recipes;
}