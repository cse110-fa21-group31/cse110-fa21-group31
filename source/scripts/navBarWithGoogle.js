window.addEventListener("DOMContentLoaded", init);

async function init() {
    createHead();
    createLandingHeader();
}

function createHead() {
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
    googleScript2.src = "source/scripts/userLogin.js";
    googleScript2.type = "module";

    head.appendChild(googleMeta);
    head.appendChild(googleScript1);
    head.appendChild(googleScript2);
}

function createLandingHeader() {

    let landingHeader = document.getElementById("landingHeader");

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
    logo.href="/cse110-fa21-group31/index.html";
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