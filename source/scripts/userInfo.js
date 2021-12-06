/**
 * This is the skeleton page to populate the user info page based on user profile json object
 */

import { routerAddCreatePage, routerNavigateWrapper } from "./index.js";
import { EDIT_CREATE_ROUTE, USER_ROUTE, createNodeClone } from "./util.js"
// import { fetchUserById } from "./APICalls.js"
export default {}
const recipeData = {};

/**
 * 
 * @param {*} profile user profile object defined in wiki
 */
export const populateUserInfoPage = (profile) => {
    const createPageUrl = EDIT_CREATE_ROUTE;
    //redirect to the create page
    createNodeClone('createRecipePageButton');
    const createRecipePageBut = document.getElementById("createRecipePageButton");
    //routerAddCreatePage(createPageUrl)

    createRecipePageBut.addEventListener('click', () => {
        routerAddCreatePage(createPageUrl);
        routerNavigateWrapper(createPageUrl);
    })
}