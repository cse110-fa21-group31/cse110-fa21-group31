/**
 * Filename: userLogin.js
 * Date: 11/18/2021
 * Description: functions for handling front end element changes for user
 * sign-in and log-out
 * Dependency: navBarWithGoogle.html
 */
export default {onSignIn}
import {
    ELE_CLASS_PROFILE_IMAGE,
    ELE_ID_PROFILE,
    ELE_ID_PROFILE_WRAPPER,
    SIGN_IN_BUTTON_ID,
    SIGN_OUT_BUTTON_ID,
} from "./util.js";

import { populateUserInfoPage } from './userInfo.js'
import { bindUserProfile, setGlobalUserData, clearGlobalUserData } from "./index.js";

// Constant variables
const DISPLAY_NONE = "none";
const DISPLAY_BLOCK = "block";
const DISPLAY_GRID = "grid";
const HTML_ELE_IMG = "img";
const HTML_ELE_A = "a";
const HTML_ELE_LI = "li";
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
const IMG_NO_REFERRER = "no-referrer";

/* global gapi */

// Set functions onSignIn and signOut to global scope, otherwise they're not
// accessible in html
if (typeof window === 'object') {
window.onSignIn = onSignIn;
window.signOut = signOut;
}

window.addEventListener("DOMContentLoaded", init);

async function init() {
    if (document.getElementById(ELE_ID_HEADER)) {
        createNavBarWithGoogle();
    }
}

/**
 * The function that's called when sign-in button is clicked and success.
 * Passes user profile to backend and displays user profile in html.
 *
 * @param {*} googleUser User profile provided by Google sign-in API.
 */
function onSignIn(googleUser) {
    // TODO: fake user for now, dynamically get user info here. 
    const profile = {
        username: googleUser.getBasicProfile().getName(),
        imageURL: googleUser.getBasicProfile().getImageUrl(),
        email: googleUser.getBasicProfile().getEmail(),
        _id: "MMAfv3oCQDiL4u10",
        savedRecipe: ["VZsAA6HuzytdIQT2"],
        myRecipe: ["AJlpmnCbp6gry18v", "uYaCV6U4XGfQHYg2"],
    };

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
    profileWrapper.style.display = DISPLAY_GRID;

    let profileImage = document.getElementById(ELE_ID_PROFILE);
    let image = document.createElement(HTML_ELE_IMG);
    image.src = profile.imageURL;
    image.classList.add(ELE_CLASS_PROFILE_IMAGE);
    image.referrerpolicy = IMG_NO_REFERRER;
    image.onclick = () => {
        window.location.replace("/source/pages/userInfo.html");
    };
    profileImage.appendChild(image);

    let signOutButton = document.getElementById("signOutButton");
    let signOut = document.createElement("a");
    signOut.href = "#";
    signOut.onclick = "signOut()";
    signOut.innerText = "Sign Out";

    signOutButton.appendChild(signOut);

    if (window.location.href.endsWith("index.html")) {
        window.location.replace("/source/pages/homePage.html");
    }
    //TODO: call backend getUserByEmail
    const userObj = {

    }
    
    bindUserProfile(profile);
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

/**
 * The function that's called to create the nav bar containing Google login
 */
function createNavBarWithGoogle() {
    // Imports scripts/src for head
    let head = document.getElementById(ELE_ID_HEADER);
    //Font imports
    let googleFonts = document.createElement(HTML_ELE_LINK);
    googleFonts.rel = "preconnect";
    googleFonts.href = "https://fonts.googleapis.com";

    let moreFonts = document.createElement(HTML_ELE_LINK);
    moreFonts.rel = "preconnect";
    moreFonts.href = "https://fonts.gstatic.com";

    let rammettoFont = document.createElement(HTML_ELE_LINK);
    rammettoFont.href = "https://fonts.googleapis.com/css2?family=Rammetto+One&display=swap";
    rammettoFont.rel = "stylesheet";

    head.appendChild(googleFonts);
    head.appendChild(moreFonts);
    head.appendChild(rammettoFont);   
    
    //Google sign in imports
    let googleMeta = document.createElement(HTML_ELE_META);
    googleMeta.name = "google-signin-client_id";
    googleMeta.content = "693762448631-0tvigeijomhobgb0hj5c0di2dn0ppj5n.apps.googleusercontent.com";

    let googleScript1 = document.createElement(HTML_ELE_SCRIPT);
    googleScript1.src = "https://apis.google.com/js/platform.js?onload=renderButton";
    googleScript1.defer = true;
    googleScript1.async = true;
    
    let googleScript2 = document.createElement(HTML_ELE_SCRIPT);
    if(window.location.href.endsWith("index.html")) {
        googleScript2.src = "/source/scripts/userLogin.js";
    }
    else {
        googleScript2.src = "../scripts/userLogin.js";
    }
    
    googleScript2.type = "module";

    head.appendChild(googleMeta);
    head.appendChild(googleScript1);
    head.appendChild(googleScript2);

    // Fills the header
    let landingHeader = document.getElementById(ELE_ID_HEADER);

    let navBar = document.createElement(ELE_ID_NAV);
    navBar.id = ELE_ID_NAVBAR;

    let navList = document.createElement(HTML_ELE_UL);
    navList.id = ELE_ID_NAVLIST;
    navList.className = "topRight";

    let navLogo = document.createElement(HTML_ELE_LI);
    navLogo.id = ELE_ID_NAVLOGO;

    //Logo nav link button
    let logo = document.createElement(HTML_ELE_A);
    logo.className = ELE_ID_LOGO;
    logo.href="/source/pages/homePage.html";
    logo.innerText="Olive U";
    navLogo.appendChild(logo);

    //Google sign in
    let navSignIn = document.createElement(HTML_ELE_LI);
    navSignIn.id = SIGN_IN_BUTTON_ID;

    let signInButton = document.createElement(HTML_ELE_DIV);
    signInButton.className = "g-signin2";
    signInButton.setAttribute("data-onsuccess", "onSignIn");
    navSignIn.appendChild(signInButton);

    let profileWrapper = document.createElement(HTML_ELE_LI);
    profileWrapper.id = ELE_ID_PROFILE_WRAPPER;
    profileWrapper.style.display = DISPLAY_NONE;

    let profile = document.createElement(HTML_ELE_LI);
    profile.id = ELE_ID_PROFILE;

    let signOutButton = document.createElement(HTML_ELE_LI);
    signOutButton.id = SIGN_OUT_BUTTON_ID;

    profileWrapper.appendChild(profile);
    profileWrapper.appendChild(signOutButton);

    navList.appendChild(navLogo);
    navList.appendChild(navSignIn);
    navList.appendChild(profileWrapper);
    navBar.appendChild(navList);
    landingHeader.prepend(navBar);
}

async function userSignedOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log("User signed out.");
        clearGlobalUserData();
    });
}