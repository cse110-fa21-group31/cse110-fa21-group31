const userSchema = {
    username: "",
    email: "",
    imageURL: "",
    savedRecipe: [],
    myRecipe: [],
};

/**
 * Create a new user based on the profile.
 *
 * @param {*} userDB The database to insert user in.
 * @param {...string} profile The user profile for creating new user.
 * @returns The user Json.
 */
export async function createUser(userDB, profile) {
    // set up new user object
    let newUser = userSchema;
    newUser.username = profile.username;
    newUser.email = profile.email;
    newUser.imageURL = profile.imageURL;

    // save user to db
    let data = new Promise((resolve, reject) => {
        userDB.insert(newUser, function (err, doc) {
            if (!err) {
                resolve(doc);
            } else {
                reject(err);
            }
        });
    });
    return data;
}
/* eslint-enable no-unused-vars*/

/**
 * This function checks whether a user with specific email exists in
 * the database.
 *
 * @param {*} userDB The database to search in.
 * @param {...string} email The email to check whether there's a user
 * @returns The user Json if exists, false if doesn't exist.
 */
export async function hasUser(userDB, email) {
    let hasUser = new Promise((resolve, reject) => {
        userDB.findOne({ email }, function (err, doc) {
            if (!err) {
                // return false if no such user exists
                resolve(doc == null ? false : doc);
            } else {
                reject(err);
            }
        });
    });
    return hasUser;
}
/* eslint-enable no-unused-vars*/

/**
 * Get a user data by id.
 *
 * @param userDB The user database to search in.
 * @param id The id of the user to search for.
 * @return The json file of the user found, or null if not found.
 */
export async function getUser(userDB, id) {
    let userData = new Promise((resolve, reject) => {
        userDB.findOne({ _id: id }, function (err, doc) {
            if (!err) {
                resolve(doc);
            } else {
                reject(err);
            }
        });
    });
    return userData;
}

/**
 * Save a recipe to a user's myRecipe.
 *
 * @param userDB The user database to update in.
 * @param id The id of the user to update recipe.
 * @param recipeId The id of the recipe to add.
 * @return 1 if save success, 0 if recipe already saved.
 */
export async function addMyRecipe(userDB, id, recipeId) {
    let data = await getUser(userDB, id);
    if (!recipeSaved(data.myRecipe, recipeId)) {
        // update in db
        data = new Promise((resolve, reject) => {
            userDB.update(
                { _id: id },
                { $push: { myRecipe: recipeId } },
                {},
                function (err, doc) {
                    if (!err) {
                        console.log(doc);
                        resolve(doc);
                    } else {
                        reject(err);
                    }
                }
            );
        });
    } else {
        data = 0;
    }
    return data;
}

/**
 * Unsave a recipe from a user's savedRecipe.
 *
 * @param userDB The user database to update in.
 * @param id The id of the user to update recipe.
 * @param recipeId The id of the recipe to remove.
 * @return 1 if save success, 0 if recipe not saved.
 */
export async function removeMyRecipe(userDB, id, recipeId) {
    let data = await getUser(userDB, id);
    if (recipeSaved(data.myRecipe, recipeId)) {
        // remove the recipe from array
        data.myRecipe = data.myRecipe.filter((rep) => rep != recipeId);
        // update in db
        data = new Promise((resolve, reject) => {
            userDB.update(
                { _id: id },
                { $set: { myRecipe: data.myRecipe } },
                {},
                function (err, doc) {
                    if (!err) {
                        console.log(doc);
                        resolve(doc);
                    } else {
                        reject(err);
                    }
                }
            );
        });
    } else {
        data = 0;
    }
    return data;
}
/* eslint-enable no-unused-vars*/

/**
 * Save a recipe to a user's savedRecipe.
 *
 * @param userDB The user database to update in.
 * @param id The id of the user to update recipe.
 * @param recipeId The id of the recipe to add.
 * @return 1 if save success, 0 if recipe already saved.
 */
export async function saveRecipe(userDB, id, recipeId) {
    let data = await getUser(userDB, id);
    if (!recipeSaved(data.savedRecipe, recipeId)) {
        // update in db
        data = new Promise((resolve, reject) => {
            userDB.update(
                { _id: id },
                { $push: { savedRecipe: recipeId } },
                {},
                function (err, doc) {
                    if (!err) {
                        console.log(doc);
                        resolve(doc);
                    } else {
                        reject(err);
                    }
                }
            );
        });
    } else {
        data = 0;
    }
    return data;
}

/**
 * Unsave a recipe from a user's savedRecipe.
 *
 * @param userDB The user database to update in.
 * @param id The id of the user to update recipe.
 * @param recipeId The id of the recipe to remove.
 * @return 1 if save success, 0 if recipe not saved.
 */
export async function unsaveRecipe(userDB, id, recipeId) {
    let data = await getUser(userDB, id);
    if (recipeSaved(data.savedRecipe, recipeId)) {
        // remove the recipe from array
        data.savedRecipe = data.savedRecipe.filter((rep) => rep != recipeId);
        // update in db
        data = new Promise((resolve, reject) => {
            userDB.update(
                { _id: id },
                { $set: { savedRecipe: data.savedRecipe } },
                {},
                function (err, doc) {
                    if (!err) {
                        console.log(doc);
                        resolve(doc);
                    } else {
                        reject(err);
                    }
                }
            );
        });
    } else {
        data = 0;
    }
    return data;
}

/**
 * Helper function that returns whether a recipe is saved in the user's
 * recipe array.
 *
 * @param {...array} recipeArray savedRecipe array of the user.
 * @param {...string} recipeId The recipe to search for.
 *
 * @return TRUE if the recipe is saved, FALSE if not.
 */
export function recipeSaved(recipeArray, recipeId) {
    for (let i = 0; i < recipeArray.length; i++) {
        if (recipeArray[i] == recipeId) {
            return true;
        }
    }
    return false;
}

// export default {
//     createUser,
//     hasUser,
//     getUser,
//     addMyRecipe,
//     removeMyRecipe,
//     saveRecipe,
//     unsaveRecipe,
// };
