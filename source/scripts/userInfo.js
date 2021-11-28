/**
 * This is the skeleton page to populate the user info page based on user profile json object
 */
window.addEventListener("DOMContentLoaded", init);

import getProfile from "/source/scripts/userLogin.js";
import { routerAddCreatePage, routerNavigateWrapper } from "./index.js";
import { EDIT_CREATE_ROUTE, USER_ROUTE } from "./util.js"
// import { fetchUserById } from "./APICalls.js"
export default {}
const recipeData = {};

async function init() {
    let userInfoGrid = document.getElementsByClassName("userInfoGridItem");
    console.log("Porofile");
    //window[getProfile]();
    console.log(getProfile());
}

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