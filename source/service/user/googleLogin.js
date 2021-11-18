/**
 * File Name: googleLogin.js
 * Description: functions for handling Google sign-in / log-out and related 
 *  changes of profile display.
 * Dependency: navBarWithGoogle.html
 * Note: Google Login doesn't work for 127.0.0.1. Type localhost instead. 
 */

// Get user info on sign in
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  // When logged in, show profile image and sign-out button, remove sign-in 
  // button
  document.getElementById("signInButton").style.display = "none";
  document.getElementById("signOutButton").style.display = "block";
  var profileImage = document.getElementById("profile");
  profileImage.style.display = "inline";
  // Display profile image
  var image = document.createElement("img");
  image.src = profile.getImageUrl();
  image.classList.add("profileImage");
  image.referrerpolicy="no-referrer";
  // Create a wrapper of type <a> for image, in preparing for linking to 
  // profile page
  var imageWrapper = document.createElement("a");
  imageWrapper.id = "profileWrapper";
  imageWrapper.onclick = () => {alert("Profile Picture Clicked")};

  imageWrapper.append(image);
  profileImage.append(imageWrapper);
}

// Sign out user
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });

  // When logged out, show sign-in button, remove profile image and 
  // sign-out button
  document.getElementById("signInButton").style.display = "inline";
  document.getElementById("signOutButton").style.display = "none";
  var profileImage = document.getElementById("profile");
  profileImage.removeChild(profileImage.firstChild);
  profileImage.style.display = "none";

}
