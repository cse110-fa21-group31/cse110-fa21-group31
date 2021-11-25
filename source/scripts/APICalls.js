const url = "http://127.0.0.1:3030/api"

/**
 * sends an HTTP request to the server to insert a single recipe to the database
 * @param {recipe} recipe the recipe object to insert
 */
export async function insertRecipe(recipe) {
    //for update, change the method of PUT
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(recipe)
    }).then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.err(err);
        });
    return response;
}

/**
 * sends an HTTP request to the server to delete a single recipe
 * @param {string} id the id of the desired recipe
 */
export async function deleteRecipe(id) {
    let queryURL = url + "?id=" + id;
    let response = await fetch(queryURL, {
        method: 'DEL',
    })
        .then((response) => response.json())
        .then((data) => {
            return data
        })
        .catch((err) => {
            console.err('Error deleting recipe: ' + err.message);
        });
    return response
}

/**
 * sends an HTTP request to the server to fetch a single recipe
 * @param {string} id the id of the desired recipe
 */
export async function fetchRecipeById(id) {
    let queryURL = url + "?id=" + id;
    let response = await fetch(queryURL, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => {
            return data
        })
        .catch((err) => {
            console.err('Error finding recipe: ' + err.message);
        });
    return response
}

/**
 * sends an HTTP request to the server to update a single recipe
 * @param {string} id the id of the desired recipe
 * @param {object} update the fields and corresponding values of the recipe to change
 */
export async function updateRecipeById(id, update) {
    let queryURL = url + "?id=" + id;
    let response = await fetch(queryURL, {
        method: 'PUT',
        body: JSON.stringify(update)
    })
        .then((response) => response.json())
        .then((data) => {
            return data
        })
        .catch((err) => {
            console.err('Error updating recipe: ' + err.message);
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
    let query = "name=" + keywords;
    if (tags) {
        query = query + '&' + "tags=" + JSON.stringify(tags);
    }
    let queryURL = url + "/search?" + query
    let response = await fetch(queryURL, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Search Results:");
            console.log(data);
            return data
        })
        .catch((err) => {
            console.err('Error searching for recipes: ' + err.message);
        });
    return response
}