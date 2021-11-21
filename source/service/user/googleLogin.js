/**
 * Filename: googleLogin.js
 * Date: 11/18/2021
 * Description: functions for handling Google sign-in / log-out and related 
 *  changes of profile display.
 * Dependency: navBarWithGoogle.html
 * Note: Google Login doesn't work for 127.0.0.1. Type localhost instead. 
 */

/**
 * This function will be called by the front end function userLogin.js/onSignIn
 * when Google API returns sign-in success.
 * Simply print out user profile for now. 
 * 
 * @param {...object} profile User profile passed from front end. Includes: 
 *  { name, imageURL, email }
 */

 /* global gapi */
 
function userSignedIn(profile) {
  console.log('User login data passed to backend: ');
  console.log('name: ' + profile.name);
  console.log('imageURL: ' + profile.imageURL);
  // This is null if the 'email' scope is not present.
  console.log('email: ' + profile.email); 
}


/**
 * Checks whether a user already exists in the database. 
 * 
 * @param {...string} email 
 * @returns True if a user already exists, false if it's a new account.
 */
function hasUser(email) {
  console.log('hasUser("' + email + '") called');
  // Simply returns false for now
  return false;
}


/**
 * This function creates a new user in the database. 
 * 
 * @param {...object} profile The profile of the new user. 
 * @returns False for now.
 */
function createNewUser(profile) {
  console.log('Create new user ' + profile.email);
  return false;
}


/**
 * This function gets data of a user based on the email.
 * @param {...string} email The email of the user to get data for. 
 * @returns A json file of the user data. 
 */
/* eslint-disable no-unused-vars*/
function getUserData(email) {
  var data = {};
  return data.stringify();
}
/* eslint-enable no-unused-vars*/


/**
 * This function will be called by the front end function userLogin.js/signedOut 
 * when the user clicks sign-out button. 
 * Calls Google log-out api. 
 */
 function userSignedOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

export { userSignedIn, userSignedOut, hasUser, getUserData, createNewUser };
