window.addEventListener("DOMContentLoaded", init);

import getProfile from "/source/scripts/userLogin.js";

async function init() {
    let userInfoGrid = document.getElementsByClassName("userInfoGridItem");
    console.log("Porofile");
    //window[getProfile]();
    console.log(getProfile());
}

function loadUserInformation() {

}