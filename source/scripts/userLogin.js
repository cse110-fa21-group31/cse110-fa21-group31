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
} from "./util.js";

import { populateUserInfoPage } from './userInfo.js'
import { bindUserProfile, setGlobalUserData, clearGlobalUserData } from "./index.js";
import { fetchRecipeByIds } from "./APICalls.js";

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
 * The function that's called when sign-in button is clicked and success.
 * Passes user profile to backend and displays user profile in html.
 *
 * @param {*} googleUser User profile provided by Google sign-in API.
 */
async function onSignIn(googleUser) {
    // TODO: fake user for now, dynamically get user info here. 
    const profile = {
        username: googleUser.getBasicProfile().getName(),
        imageURL: googleUser.getBasicProfile().getImageUrl(),
        email: googleUser.getBasicProfile().getEmail(),
        _id: "MMAfv3oCQDiL4u10",
        savedRecipe: ["LFYO9W0pzoSxcxFy", "c5nBWLYL4TQPCGVq"],
        myRecipe: [],
    };
    if (profile.savedRecipe.length > 0)
        profile.savedRecipe = await fetchRecipeByIds(profile.savedRecipe)
    // console.log(savedRecipeObject)
    if (profile.myRecipe.length > 0)
        profile.myRecipe = await fetchRecipeByIds(profile.myRecipe)

    console.log(profile)

    console.log("User login activity caught by frontend:");
    // Since email is unique, we won't need ID token for identification
    // console.log('ID token: ' + googleUser.getAuthResponse().id_token);
    console.log("Name: " + profile.name);
    console.log("Image URL: " + profile.imageURL);
    console.log("Email: " + profile.email);

    // When logged in, show profile image and sign-out button, remove sign-in
    // button
    document.getElementById(SIGN_IN_BUTTON_ID).style.display = DISPLAY_NONE;
    // Display profile image
    let profileWrapper = document.getElementById(ELE_ID_PROFILE_WRAPPER);
    profileWrapper.class = "shown";

    let profileImage = document.getElementById(ELE_ID_PROFILE);
    let image = document.createElement(HTML_ELE_IMG);
    image.src = profile.imageURL;
    image.classList.add(ELE_CLASS_PROFILE_IMAGE);
    image.referrerpolicy = IMG_NO_REFERRER;
    profileImage.appendChild(image);

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
    // call backend sign out function
    await userSignedOut();

    // When logged out, show sign-in button, remove profile image and
    // sign-out button
    document.getElementById(SIGN_IN_BUTTON_ID).style.display = DISPLAY_BLOCK;
    document.getElementById(SIGN_OUT_BUTTON_ID).style.display = DISPLAY_NONE;
    const profileImage = document.getElementById(ELE_ID_PROFILE);
    profileImage.removeChild(profileImage.firstChild);
    profileImage.style.display = DISPLAY_NONE;
}

async function userSignedOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log("User signed out.");
        clearGlobalUserData();
    });
}