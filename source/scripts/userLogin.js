/**
 * Filename: userLogin.js
 * Date: 11/18/2021
 * Description: functions for handling front end element changes for user
 * sign-in and log-out
 * Dependency: navBarWithGoogle.html
 */
export default { onSignIn }
import {
    ELE_CLASS_PROFILE_IMAGE,
    ELE_ID_PROFILE,
    ELE_ID_PROFILE_WRAPPER,
    SIGN_IN_BUTTON_ID,
    SIGN_OUT_BUTTON_ID,
    SAVE_BUTTON_ID,
    EDIT_BUTTON_ID,
    DELETE_BUTTON_ID,
} from "./util.js";

import { populateUserInfoPage } from './userInfo.js'
import { bindUserProfile, setGlobalUserData, clearGlobalUserData } from "./index.js";
import { fetchRecipeByIds, getUserData } from "./APICalls.js";

// Constant variables
const DISPLAY_NONE = "none";
const DISPLAY_BLOCK = "block";
const HTML_ELE_IMG = "img";
//const HTML_ELE_A = "a";
const IMG_NO_REFERRER = "no-referrer";
//const HTML_ELE_LI = "li";
const HTML_ELE_LINK = "link";
const HTML_ELE_DIV = "div";
const HTML_ELE_HEAD = "head";
const HTML_ELE_UL = "ul";
const HTML_ELE_META = "meta";
const HTML_ELE_SCRIPT = "script";

const ELE_ID_NAV = "nav";
const ELE_ID_NAVBAR = "navbar";
const ELE_ID_NAVLIST = "navList";
const ELE_ID_NAVLOGO = "navLogo";
const ELE_ID_LOGO = "logo";
const ELE_ID_HEADER = "header";

/* global gapi */

// Set functions onSignIn and signOut to global scope, otherwise they're not
// accessible in html
if (typeof window === 'object') {
    window.onSignIn = onSignIn;
    window.signOut = signOut;
}

/**
 * Prevents Google auto login. If we use this, every time user refreshes the 
 * page he/she will be logged out. So DON'T use it. 
 * 
 * @param {event} e Event of onbeforeunload
 */
// window.onbeforeunload = function(e){
//     gapi.auth2.getAuthInstance().signOut();
//   };

/**
 * The function that's called when sign-in button is clicked and success.
 * Passes user profile to backend and displays user profile in html.
 *
 * @param {*} googleUser User profile provided by Google sign-in API.
 */
async function onSignIn(googleUser) {

    var profile = {
        username: googleUser.getBasicProfile().getName(),
        imageURL: googleUser.getBasicProfile().getImageUrl(),
        email: googleUser.getBasicProfile().getEmail(),
    };
    // Fetch or create user profile in database
    profile = await getUserData(profile);

    // Fetch saved and created recipe, save to user profile
    if (profile.savedRecipe.length > 0) {
        profile.savedRecipe = await fetchRecipeByIds(profile.savedRecipe);
    }
    // console.log(savedRecipeObject)
    if (profile.myRecipe.length > 0) {
        profile.myRecipe = await fetchRecipeByIds(profile.myRecipe);
    }

    // Since email is unique, we won't need ID token for identification
    console.log("User login activity caught:");
    // console.log('ID token: ' + googleUser.getAuthResponse().id_token);
    console.log(profile)

    // When logged in, show profile image and sign-out button, remove sign-in
    // button
    document.getElementById(SIGN_IN_BUTTON_ID).style.display = DISPLAY_NONE;
    document.getElementById(SIGN_OUT_BUTTON_ID).style.display = DISPLAY_BLOCK;

    //Show Edit, delete and save buttons
    document.getElementById(EDIT_BUTTON_ID).style.display = DISPLAY_BLOCK;
    document.getElementById(DELETE_BUTTON_ID).style.display = DISPLAY_BLOCK;
    document.getElementById(SAVE_BUTTON_ID).style.display = DISPLAY_BLOCK;
    
    // Display profile wrapper section
    let profileWrapper = document.getElementById(ELE_ID_PROFILE_WRAPPER);
    profileWrapper.style.display = DISPLAY_BLOCK;
    // prepend profile image to image wrapper
    let image = document.createElement(HTML_ELE_IMG);
    image.src = profile.imageURL;
    image.classList.add(ELE_CLASS_PROFILE_IMAGE);
    image.referrerpolicy = IMG_NO_REFERRER;
    profileWrapper.prepend(image);

    //TODO: call backend getUserByEmail
    const userObj = {

    }

    await bindUserProfile(profile);
    setGlobalUserData(profile);
    populateUserInfoPage();
}

/**
 * The function that's called when the sign-out button is clicked.
 * Calls backend function that handles sign-out API calls, then remove profile
 * in html.
 */
async function signOut() {
    // Call helper Google sign out function
    await userSignedOut();

    // Clear global user data stored in index.js
    clearGlobalUserData();

    // When logged out, show sign-in button, remove profile image and
    // sign-out button
    document.getElementById(SIGN_IN_BUTTON_ID).style.display = DISPLAY_BLOCK;
    document.getElementById(SIGN_OUT_BUTTON_ID).style.display = DISPLAY_NONE;

    //Hide Edit, delete and save buttons
    document.getElementById(EDIT_BUTTON_ID).style.display = DISPLAY_NONE;
    document.getElementById(DELETE_BUTTON_ID).style.display = DISPLAY_NONE;
    document.getElementById(SAVE_BUTTON_ID).style.display = DISPLAY_NONE;

    const profileWrapper = document.getElementById(ELE_ID_PROFILE_WRAPPER);
    profileWrapper.removeChild(profileWrapper.firstChild);
    profileWrapper.style.display = DISPLAY_NONE;
}

/**
 * Helper function that calls Google API for sign-out.
 */
async function userSignedOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log("User signed out.");
    });
}