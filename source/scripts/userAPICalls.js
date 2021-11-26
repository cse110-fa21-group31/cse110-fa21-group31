export const url = "http://127.0.0.1:3030/api/user"

/**
 * sends an HTTP request to the server to fetch a single user
 * @param {string} id the id of the desired user
 */
export async function fetchUserById(id) {
    let queryURL = url + "?id=" + id;
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
    let queryURL = url + "?userId=" + userId + "?recipeId=" + recipeId;
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
    let queryURL = url + "?userId=" + userId + "?recipeId=" + recipeId;
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