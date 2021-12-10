/**
 * Skeleton page to populate the user info page
 * based on user profile json object.
 * 
 * @since 12.09.21
 */

import {
    routerAddCreatePage,
    routerNavigateWrapper,
} from "./index.js";
import { 
    EDIT_CREATE_ROUTE,
    createNodeClone,
} from "./util.js";

export default {};

/**
 * Link routing to the create recipe button
 * 
 * @param {*} profile User profile object defined in wiki
 */
export const populateUserInfoPage = (profile) => {
    const createPageUrl = EDIT_CREATE_ROUTE;

    //redirect to the create page
    createNodeClone("createRecipePageButton");
    const createRecipePageButton = document.getElementById(
        "createRecipePageButton"
    );

    createRecipePageButton.addEventListener("click", () => {
        routerAddCreatePage(createPageUrl);
        routerNavigateWrapper(createPageUrl);
    });
};
