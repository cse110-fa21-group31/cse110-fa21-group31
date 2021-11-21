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

/**
 * The function that's called when sign-in button is clicked and success.
 * Passes user profile to backend and displays user profile in html.
 *
 * @param {*} googleUser User profile provided by Google sign-in API.
 */
function onSignIn(googleUser) {
    var profile = {
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
    var profileImage = document.getElementById(ELE_ID_PROFILE);
    profileImage.style.display = DISPLAY_BLOCK;
    // Display profile image
    var image = document.createElement(HTML_ELE_IMG);
    image.src = profile.imageURL;
    image.classList.add(ELE_CLASS_PROFILE_IMAGE);
    image.referrerpolicy = IMG_NO_REFERRER;
    // Create a wrapper of type <a> for image, in preparing for linking to
    // profile page
    var imageWrapper = document.createElement(HTML_ELE_A);
    imageWrapper.id = ELE_ID_PROFILE_WRAPPER;
    imageWrapper.onclick = () => {
        alert("Test: Profile Picture Clicked");
    };

    imageWrapper.append(image);
    profileImage.append(imageWrapper);
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
