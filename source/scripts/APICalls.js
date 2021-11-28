import { API_URL, USER_URL } from "./util.js";
export default {insertRecipe, deleteRecipe, fetchRecipeByPage, fetchRecipeById,
    updateRecipeById, submitSearch}
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
 */
export async function insertRecipe(recipe) {
    //for update, change the method of PUT
    const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(recipe)
    }).then((response) => response.json())
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
 */
export async function deleteRecipe(id) {
    let queryURL = API_URL + "?id=" + id;
    let response = await fetch(queryURL, {
        method: 'DELETE',
        "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    })
        .catch((err) => {
            console.error('Error deleting recipe: ' + err.message);
        });
    
    // console.log("Step Return");
    return response
}

/**
 * sends an HTTP request to the server to fetch a single recipe
 * @param {string} id the id of the desired recipe
 */
export async function fetchRecipeByPage(pageNum) {
    let queryURL = API_URL + "?page=" + pageNum;
    let response = await fetch(queryURL, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then(async (data) => {
            data.forEach(async (recipe) => {
                recipe.author = await fetchUserById(recipe.author);
            });
            return data;
        })
        .catch((err) => {
            console.error('Error finding recipes: ' + err.message);
            console.error(err);
        });
    return response
}


/**
 * sends an HTTP request to the server to fetch a single recipe
 * @param {string} id the id of the desired recipe
 */
export async function fetchRecipeById(id) {
    let queryURL = API_URL + "?id=" + id;
    let response = await fetch(queryURL, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then(async (data) => {
            data.author = await fetchUserById(data.author);
            return data
        })
        .catch((err) => {
            console.error('Error finding recipe: ' + err.message);
        });
    return response
}

/**
 * sends an HTTP request to the server to fetch recipes
 * @param {Array<string>} ids the ids of the desired recipes
 */
 export async function fetchRecipesByIds(ids) {
    let queryURL = API_URL + "?ids=" + ids.join(",");
    let response = await fetch(queryURL, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => {
            return data
        })
        .catch((err) => {
            console.error('Error finding recipes: ' + err.message);
        });
    return response
}

/**
 * sends an HTTP request to the server to update a single recipe
 * @param {string} id the id of the desired recipe
 * @param {object} update the fields and corresponding values of the recipe to change
 */
export async function updateRecipeById(id, update) {
    let queryURL = API_URL;
    let response = await fetch(queryURL, {
        method: 'PUT',
        body: JSON.stringify(update)
    })
        .then((response) => { console.log(response); return response.json() })
        .then((data) => {
            console.log(data);
            return data

        })
        .catch((err) => {
            console.error('Error updating recipe: ' + err.message);
        });

    return response
}

/**
 * sends an HTTP request to the server to fetch the search results
 * @param {string} keywords words to search for in the name of recipes
 * @param {Array<string>} tags tags to filter results by
 * @returns {Array<recipe>} the recipes returned by the search engine
 */
export async function submitSearch(keywords, tags) {
    let query = "?name=" + keywords;
    if (tags) {
        query = query + '&' + "tags=" + JSON.stringify(tags);
    }
    let queryURL = API_URL + query
    let response = await fetch(queryURL, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then(async (data) => {
            data.forEach(async (recipe) => {
                recipe.author = await fetchUserById(recipe.author);
            });
            console.log("Search Results:");
            console.log(data);
            return data
        })
        .catch((err) => {
            console.error('Error searching for recipes: ' + err.message);
        });
    return response
}

/**
 * sends an HTTP request to the server to fetch a single user
 * @param {string} id the id of the desired user
 */
export async function fetchUserById(id) {
    let queryURL = USER_URL + "?id=" + id;
    let response = await fetch(queryURL, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => {
            return data
        })
        .catch((err) => {
            //console.error('Error finding recipe: ' + err.message);
        });
    return response
}

export async function addSavedRecipeById(userId, recipeId) {
    let queryURL = USER_URL + "?userId=" + userId + "?recipeId=" + recipeId;
    let response = await fetch(queryURL, {
        method: 'PUT'
    })
        .then((response) => { console.log(response); return response.json() })
        .then((data) => {
            console.log(data);
            return data

        })
        .catch((err) => {
            //console.error('Error updating recipe: ' + err.message);
        });

    return response
}

export async function deleteSavedRecipeById(userId, recipeId) {
    let queryURL = USER_URL + "?userId=" + userId + "?recipeId=" + recipeId;
    let response = await fetch(queryURL, {
        method: 'DEL',
        "Access-Control-Allow-Origin": "*",
        mode: 'no-cors'
    })
        .then((response) => response.json())
        .then((data) => {
            return data
        })
        .catch((err) => {
            //console.error('Error deleting recipe: ' + err.message);
        });
    return response
}