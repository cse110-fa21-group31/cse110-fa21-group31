/**
 * Filename: APICalls.js
 * 
 * @file Provides functions that calls backend API and returns the desired data.
 * @since 11.18.21
 */

import { API_URL, USER_URL, IMAGE_UPLOAD_URL } from "./util.js";
export default {
    insertRecipe,
    deleteRecipe,
    fetchRecipeByPage,
    fetchRecipeById,
    updateRecipeById,
    submitSearch,
    uploadImage,
    getUserData,
    fetchRecipesByIds,
};
/**
 *
 * want the return json object from server:
 * const response = await <api call>
 * Otherwise
 * (await) <api call>
 */

/**
 * sends an HTTP request to the server to insert a single recipe to the database
 * @param {recipe} recipe the recipe object to insert
 * @returns {recipe} The inserted recipe object
 */
export async function insertRecipe(recipe) {
    // save image and convert to local relative path
    if (recipe.image.size != 0) {
        const imageURL = await uploadImage(recipe.image);
        // console.log(imageURL);
        recipe.image = imageURL;
    } else {
        recipe.image = "";
    }
    //for update, change the method of PUT
    const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(recipe),
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.error(err);
        });
    return response;
}

/**
 * sends an HTTP request to the server to delete a single recipe
 * @param {string} id the id of the desired recipe
 * @returns {recipe} The updated recipe object
 */
export async function deleteRecipe(id) {
    let queryURL = API_URL + "?id=" + id;
    let response = await fetch(queryURL, {
        method: "DELETE",
        "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    }).catch((err) => {
        console.error("Error deleting recipe: " + err.message);
    });

    // console.log("Step Return");
    return response;
}

/**
 * @deprecated
 * sends an HTTP request to the server to fetch a single recipe
 * @param {string} id the id of the desired recipe
 * @returns {Array<recipe>} Array of recipe objects of this page
 */
export async function fetchRecipeByPage(page) {
    return await fetchResults(API_URL + "?", page);
}

/**
 * sends an HTTP request to the server to fetch a single recipe
 * @param {string} id the id of the desired recipe
 * @returns {recipe} The desired recipe object
 */
export async function fetchRecipeById(id) {
    let queryURL = API_URL + "?id=" + id;
    return await fetchResults(queryURL)[0];
}

/**
 * sends an HTTP request to the server to fetch recipes
 * @param {Array<string>} ids the ids of the desired recipes
 * @returns Array of recipe objects of corresponding IDs
 */
export async function fetchRecipesByIds(ids, page) {
    let queryURL = API_URL + "?ids=" + ids.join(",");
    return await fetchResults(queryURL, page);
}

/**
 * sends an HTTP request to the server to update a single recipe
 * @param {string} id the id of the desired recipe
 * @param {object} update the fields and corresponding values of the recipe to change
 * @returns {recipe} The updated recipe objct
 */
export async function updateRecipeById(newImageUpdated, update) {
    let queryURL = API_URL;
    // save image and convert to relative local path
    if (newImageUpdated && update.image.size != 0) {
        const imageURL = await uploadImage(update.image);
        console.log(imageURL);
        update.image = imageURL;
    }
    // console.log(update);
    // console.log(JSON.stringify(update));
    let response = await fetch(queryURL, {
        method: "PUT",
        body: JSON.stringify(update),
    })
        .then((response) => {
            // console.log(response);
            return response.json();
        })
        .then((data) => {
            // console.log(data);
            return data;
        })
        .catch((err) => {
            console.error("Error updating recipe: " + err.message);
        });

    return response;
}

/**
 * sends an HTTP request to the server to fetch the search results
 * @param {string} keywords words to search for in the name of recipes
 * @param {Array<string>} tags tags to filter results by
 * @returns {Array<recipe>} the recipes returned by the search engine
 */
export async function submitInitialSearch(keywords, tags) {
    let query = "?";
    if (keywords) {
        query = query + "name=" + keywords;
    }
    if (tags) {
        query = query + "&" + "tags=" + tags.join(",");
    }
    let queryURL = API_URL + query;
    let searchResults = await fetchResults(queryURL);
    let pageCount = await getPageCount(queryURL);
    return {
        results: searchResults,
        pages: pageCount,
    };
}

/**
 * sends an HTTP request to the server to fetch the search results
 * @param {string} keywords words to search for in the name of recipes
 * @param {Array<string>} tags tags to filter results by
 * @param {int} page the page of results to fetch
 * @returns {Array<recipe>} the recipes returned by the search engine
 */
export async function submitSearch(keywords, tags, page) {
    let query = "?";
    if (keywords) {
        query = query + "name=" + keywords;
    }
    if (tags) {
        query = query + "&" + "tags=" + tags.join(",");
    }
    let queryURL = API_URL + query;
    return await fetchResults(queryURL, page);
}

/**
 * sends an HTTP request to the server to fetch a single user
 * @param {string} id the id of the desired user
 * @return {object} The user object
 */
export async function fetchUserById(id) {
    let queryURL = USER_URL + "?id=" + id;
    let response = await fetch(queryURL, {
        method: "GET",
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.error("Error finding user: " + err.message);
        });
    return response;
}

/**
 * Adds a recipe id to user's savedRecipe array
 * @param {string} userId The user id to save the recipe
 * @param {string} recipeId The recipe id to be saved
 * @returns The updated user object
 */
export async function addSavedRecipeById(userId, recipeId) {
    let queryURL =
        USER_URL + "/saved?userId=" + userId + "&recipeId=" + recipeId;
    let response = await fetch(queryURL, {
        method: "PUT",
    })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((err) => {
            console.error("Error updating recipe: " + err.message);
        });

    return response;
}

/**
 * Remove a recipe id from user's savedRecipe array
 * @param {string} userId The user id to unsave the recipe
 * @param {string} recipeId The recipe id to be unsaved
 * @returns The updated user object
 */
export async function deleteSavedRecipeById(userId, recipeId) {
    let queryURL =
        USER_URL + "/saved?userId=" + userId + "&recipeId=" + recipeId;
    let response = await fetch(queryURL, {
        method: "DELETE",
        "Access-Control-Allow-Origin": "*",
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.error("Error deleting recipe: " + err.message);
        });
    return response;
}

/**
 * Gets the total page count of the current query. 
 * @param {string} queryURL The query to recipes to count pages. 
 * @returns page count
 */
export async function getPageCount(queryURL) {
    queryURL = queryURL + "&counts=1";
    let response = await fetch(queryURL, {
        method: "GET",
    })
        .then((response) => response.json())
        .then(async (data) => {
            return data;
        })
        .catch((err) => {
            console.error("Error counting results: " + err.message);
        });
    return response;
}

/**
 * sends an HTTP request to the server to save an image to the images folder.
 * Returns the url of the image.
 * @param {string} recipeId the recipeId to be used as image filename.
 * @param {File} imageFile the image file to be saved.
 * @returns {string} Image path to be saved in the recipe object
 */
export async function uploadImage(imageFile) {
    const URL = IMAGE_UPLOAD_URL;
    let data = new FormData();
    data.append("file", imageFile);
    // let formData = new FormData();
    // for (const name in imageFile) {
    //     formData.append(name, imageFile[name]);
    // }
    //for update, change the method of PUT
    const response = await fetch(URL, {
        method: "POST",
        // headers: {
        //     "Content-Type": "multipart/form-data; charset=utf-8; boundary='a very cool boundary'"
        // },
        body: data,
    })
        .then((response) => response.json())
        .catch((err) => {
            console.error(err);
        });
    return response.path;
}

/**
 * Sends an HTTP request to fetch the complete user profile by email. If user
 * doesn't exist in the database, create new user document and return the new object.
 * @param {object} userProfile
 * @returns user object
 */
export async function getUserData(userProfile) {
    let queryURL = USER_URL + "?email=" + userProfile.email;
    // console.log(update);
    // console.log(JSON.stringify(update));
    let response = await fetch(queryURL, {
        method: "POST",
        body: JSON.stringify(userProfile),
    })
        .then((response) => {
            // console.log(response);
            return response.json();
        })
        .catch((err) => {
            console.error("Error getting user data: " + err.message);
        });

    return response;
}

/****************** Internal functions ************************/

/**
 * Fetch the result recipe array of the url on the specified page 
 * @param {*} queryURL The url for querying the desired recipes
 * @param {*} page The specific page of recipes to fetch
 * @returns Array of recipes based on the query
 */
async function fetchResults(queryURL, page) {
    if (page) {
        queryURL = queryURL + "&page=" + page;
    }
    let response = await fetch(queryURL, {
        method: "GET",
    })
        .then((response) => response.json())
        .then(async (data) => {
            data.forEach(async (recipe) => {
                recipe.author = await fetchUserById(recipe.author);
            });
            return data;
        })
        .catch((err) => {
            console.error("Error finding recipes: " + err.message);
        });
    return response;
}
