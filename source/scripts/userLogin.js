/**
 * Filename: userLogin.js
 * Date: 11/18/2021
 * Description: functions for handling front end element changes for user
 * sign-in and log-out
 * Dependency: navBarWithGoogle.html
 */

import {
    ELE_CLASS_PROFILE_IMAGE,
    ELE_ID_PROFILE,
    ELE_ID_PROFILE_WRAPPER,
    SIGN_IN_BUTTON_ID,
    SIGN_OUT_BUTTON_ID,
} from "./util.js";
import { userSignedIn, userSignedOut } from "../service/user/googleLogin.js";

// Constant variables
const DISPLAY_NONE = "none";
const DISPLAY_BLOCK = "block";
const HTML_ELE_IMG = "img";
const HTML_ELE_A = "a";
const IMG_NO_REFERRER = "no-referrer";

// Set functions onSignIn and signOut to global scope, otherwise they're not
// accessible in html
window.onSignIn = onSignIn;
window.signOut = signOut;

window.addEventListener("DOMContentLoaded", init);

async function init() {
    if (document.getElementById("header")) {
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
    let profile = {
        name: googleUser.getBasicProfile().getName(),
        imageURL: googleUser.getBasicProfile().getImageUrl(),
        email: googleUser.getBasicProfile().getEmail(),
    };

    console.log("User login activity caught by frontend:");
    // Since email is unique, we won't need ID token for identification
    // console.log('ID token: ' + googleUser.getAuthResponse().id_token);
    console.log("Name: " + profile.name);
    console.log("Image URL: " + profile.imageURL);
    console.log("Email: " + profile.email);

    // Send data to backend: service/user/googleLogin.js
    userSignedIn(profile);

    // When logged in, show profile image and sign-out button, remove sign-in
    // button
    document.getElementById(SIGN_IN_BUTTON_ID).style.display = DISPLAY_NONE;
    document.getElementById(SIGN_OUT_BUTTON_ID).style.display = DISPLAY_BLOCK;
    let profileImage = document.getElementById(ELE_ID_PROFILE);
    profileImage.style.display = DISPLAY_BLOCK;
    // Display profile image
    let image = document.createElement(HTML_ELE_IMG);
    image.src = profile.imageURL;
    image.classList.add(ELE_CLASS_PROFILE_IMAGE);
    image.referrerpolicy = IMG_NO_REFERRER;
    // Create a wrapper of type <a> for image, in preparing for linking to
    // profile page
    let imageWrapper = document.createElement(HTML_ELE_A);
    imageWrapper.id = ELE_ID_PROFILE_WRAPPER;
    imageWrapper.onclick = () => {
        window.location.replace("/source/pages/userInfo.html");
    };

    imageWrapper.append(image);
    profileImage.append(imageWrapper);

    if (window.location.href.endsWith("index.html")) {
        window.location.replace("/source/pages/homePage.html");
    }
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
    var profileImage = document.getElementById(ELE_ID_PROFILE);
    profileImage.removeChild(profileImage.firstChild);
    profileImage.style.display = DISPLAY_NONE;
}

/**
 * The function that's called to create the nav bar containing Google login
 */
function createNavBarWithGoogle() {
    // Imports scripts/src for head
    let head = document.querySelector("head");
    //Font imports
    let googleFonts = document.createElement('link');
    googleFonts.rel = "preconnect";
    googleFonts.href = "https://fonts.googleapis.com";

    let moreFonts = document.createElement('link');
    moreFonts.rel = "preconnect";
    moreFonts.href = "https://fonts.gstatic.com";

    let rammettoFont = document.createElement('link');
    rammettoFont.href = "https://fonts.googleapis.com/css2?family=Rammetto+One&display=swap";
    rammettoFont.rel = "stylesheet";

    head.appendChild(googleFonts);
    head.appendChild(moreFonts);
    head.appendChild(rammettoFont);   
    
    //Google sign in imports
    let googleMeta = document.createElement('meta');
    googleMeta.name = "google-signin-client_id";
    googleMeta.content = "693762448631-0tvigeijomhobgb0hj5c0di2dn0ppj5n.apps.googleusercontent.com";

    let googleScript1 = document.createElement('script');
    googleScript1.src = "https://apis.google.com/js/platform.js?onload=renderButton";
    googleScript1.defer = true;
    googleScript1.async = true;
    
    let googleScript2 = document.createElement('script');
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
    let landingHeader = document.getElementById("header");

    let navBar = document.createElement("nav");
    navBar.id = "navbar";

    let navList = document.createElement("ul");
    navList.id = "navList"
    navList.className = "topRight";

    let navLogo = document.createElement("li");
    navLogo.id = "navLogo";

    //Logo nav link button
    let logo = document.createElement("a");
    logo.className = "logo";
    logo.href="/source/pages/homePage.html";
    logo.innerText="Olive U";
    navLogo.appendChild(logo);

    //Google sign in
    let navSignIn = document.createElement("li");
    navSignIn.id = "signInButton";

    let signInButton = document.createElement("div");
    signInButton.className = "g-signin2";
    signInButton.setAttribute("data-onsuccess", "onSignIn");
    navSignIn.appendChild(signInButton);
     
    let profile = document.createElement("li");
    profile.id = "profile";

    navList.appendChild(navLogo);
    navList.appendChild(navSignIn);
    navList.appendChild(profile);
    navBar.appendChild(navList);

    let signOutButton = document.createElement("div");
    signOutButton.id = "signOutButton";

    let signOut = document.createElement("a");
    signOut.href = "#";
    signOut.onclick = "signOut()";
    signOut.innerText = "Sign Out";

    signOutButton.appendChild(signOut);

    landingHeader.prepend(navBar);
    landingHeader.appendChild(signOutButton);
}