// the file that used to put reusable helper methods and/or constants
//eg: PORT, neDB storage File Path, etc
// DOM
export const SIGN_IN_BUTTON_ID = "signInButton";
export const SIGN_OUT_BUTTON_ID = "signOutButton";
export const ELE_ID_PROFILE = "profile";
export const ELE_ID_PROFILE_WRAPPER = "profileWrapper";
export const ELE_CLASS_PROFILE_IMAGE = "profileImage";
export const DISPLAY_NONE = "none";
export const DISPLAY_BLOCK = "block";
export const HTML_ELE_IMG = "img";
export const IMG_NO_REFERRER = "no-referrer";

// Routes
export const RECIPE_ROUTE = "recipe/";
export const USER_ROUTE = "user/";
export const EDIT_CREATE_ROUTE = "create/";
// TODO: change editcreate route name
export const API_URL = "/api";
export const USER_URL = "/api/user";
export const IMAGE_UPLOAD_URL = "/api/imageUpload";
export const CARDS_PER_PAGE = 6;
export const HOME_ROUTER = "home";
/**
 * Clone a node to clear all eventListener.
 * @param {*} selector
 */
export function createNodeClone(selector, isQuerySelector) {
    let original;
    if (isQuerySelector) {
        original = document.querySelector(selector);
    } else {
        original = document.getElementById(selector);
    }
    let clone = original.cloneNode(true);
    original.parentNode.replaceChild(clone, original);
}
export const TEMP_EDIT_CREATE_ROUTE = "edit/";
