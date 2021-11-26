/**
 * This is the skeleton page to populate the user info page based on user profile json object
 */

import { routerAddCreatePage, routerNavigateWrapper } from "./index.js";
import { EDIT_CREATE_ROUTE, USER_ROUTE } from "./util.js"
// import { fetchUserById } from "./APICalls.js"
const recipeData = {};

/**
 * 
 * @param {*} profile user profile object defined in wiki
 */
export const populateUserInfoPage = (profile) => {
    const createPageUrl = EDIT_CREATE_ROUTE
    //redirect to the create page
    const createRecipePageBut = document.getElementById("createRecipePageButton")
    routerAddCreatePage(createPageUrl)
    createRecipePageBut.addEventListener('click', () => {
        routerNavigateWrapper(createPageUrl)
    })
}

/**
 * Populates the recipe detail pages by fetching recipe json and filling in 
 * properties in html components. 
 */
// export async function populateRecipeDetail() {
//     const url = parent.document.URL;
//     let recipeID = url.substring(url.indexOf('#') + RECIPE_ROUTE.length + 1, url.length);
//     // let recipeID = "AJlpmnCbp6gry18v";
//     let recipe = await fetchRecipeById(recipeID);
//     fillOutRecipe(recipe);
// }


export function fillOutProfile(profile) {
    document.getElementById("recipeTitle").innerHTML = data.name;
    if (data.tags) document.getElementById("tags").innerHTML = data.tags;
    document.getElementById("recipeImage").setAttribute("src", data.image);
    document.getElementById("date").innerHTML = new Date(data.datePosted * 1000);
    if (data.description) document.getElementById("description").innerHTML = data.description;
    if (data.servingSize) document.getElementById("servingSize").innerHTML = data.servingSize;
    document.getElementById("author").innerHTML = data.author;
    if (data.cookTime) document.getElementById("cookTime").innerHTML = data.cookTime;
    if (data.ingredients) document.getElementById("ingredients").innerHTML = data.ingredients;
    document.getElementById("steps").innerHTML = data.steps;

    function convertTime(time) {
        let timeStr = '';

        // Remove the 'PT'
        time = time.slice(2);

        let timeArr = time.split('');
        if (time.includes('H')) {
            for (let i = 0; i < timeArr.length; i++) {
                if (timeArr[i] == 'H') return `${timeStr} hr`;
                timeStr += timeArr[i];
            }
        } else {
            for (let i = 0; i < timeArr.length; i++) {
                if (timeArr[i] == 'M') return `${timeStr} min`;
                timeStr += timeArr[i];
            }
        }

        return '';
    }
}