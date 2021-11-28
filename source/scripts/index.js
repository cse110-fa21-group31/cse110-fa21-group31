// import RecipeClass from "./recipeClass";
// The purpose of this JS file is to take API JSON files, create recipeClass objects with that info, and "send" them out to the website
export default {createRecipeCards, redirectRecipeDetail, bindRecipeCard, 
routerAddCreatePage, routerAddEditPage, routerNavigateWrapper,
bindUserProfile, bindEscKey, bindPopstate, setGlobalUserData, clearGlobalUserData}
// RecipeExpand.js
if (typeof window !== "undefined") {
    window.addEventListener("DOMContentLoaded", init);

}


// THESE SHOULD BE GIVEN VIA API
import { Router } from './router/Router.js'
import { fetchRecipeByPage } from './APICalls.js'
import { ELE_ID_PROFILE_WRAPPER, RECIPE_ROUTE, USER_ROUTE } from './util.js'
import { fillOutRecipe } from './recipeDetail.js'
import { populateUserInfoPage } from './userInfo.js'
import { setupCreatePage } from './createPage.js'
import { populateEditPage } from './editPage.js'
var recipeData = [];
const NumRecipePerPage = 6
const currPage = 1
export var userData = null;

let homePage = null; // = document.getElementById('homePage')
let recipeDetailPage = null; // = document.getElementById('recipeDetail')
let userInfoPage = null; // = document.getElementById('userInfo')
let createRecipePage = null; // = document.getElementById('createRecipe')
let editRecipePage = null; // = document.getElementById('editRecipe')

if (typeof window === 'object') {
    if (typeof window.document === 'object') {
       homePage = document.getElementById('homePage')
       recipeDetailPage = document.getElementById('recipeDetail')
       userInfoPage = document.getElementById('userInfo')
       createRecipePage = document.getElementById('createRecipe')
       editRecipePage = document.getElementById('editRecipe')
    }
}




export const router = new Router(function () {
    // console.log("Test router");
    // TODO: array and for loop in the future
    homePage.classList.add("shown");
    recipeDetailPage.classList.remove("shown");
    userInfoPage.classList.remove("shown");
    createRecipePage.classList.remove("shown");
    editRecipePage.classList.remove("shown");
    updateRecipeListInfo(currPage);
});

export async function init() {
    try {
        await createRecipes();
    } catch (err) {
        console.log(`Error fetching recipes: ${err}`);
        return;
    }
    updateRecipeListInfo(currPage);
    bindEscKey();
    bindPopstate();
}

// TODO: fetch and update homepage recipe by pageID
export async function updateRecipeListInfo(pageId) {
    await fetchRecipes()
    createRecipeCards();
}

//fills the recipes into the recipes Array
//should help pull info from the api call, or makes the api call here
export async function createRecipes() {
    //do nothing for now!
}

export async function fetchRecipes() {
    let response = await fetchRecipeByPage(currPage)
    recipeData = response;
}


// the jankiest solution to ever exist (sorry)
// any suggestion to make this better or placed somewhere else is welcome
let observedMutationEvent = new Event('observedMutation')
let observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (!mutation.addedNodes) return;
        // something was added
        document.dispatchEvent(observedMutationEvent);
    });
});

const waitForSelector = (selectorStr) => {
    // Use the previously defined observer to watch for the selectorStr to return something not null
    return new Promise((resolve, reject) => {
        const element = document.querySelector(selectorStr);
        if (element) {
            resolve(element);
        } else {
            document.addEventListener('observedMutation', () => {
                const element = document.querySelector(selectorStr);
                if (element) {
                    resolve(element);
                }
            });
        }
    });
}

observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false,
});

/**
 * Generates the <recipeCard> elements from the fetched recipes and
 * appends them to the page
 */
export function createRecipeCards() {
    // Makes new recipe cards
    // Wait until the gridContainer is loaded
    waitForSelector('.myRecipeCardGridContainer')
        .then(gridContainer => {
            while (gridContainer.firstChild) {
                gridContainer.removeChild(gridContainer.firstChild);
            }
            recipeData.forEach(recipeObj => {
                if (!recipeObj) return
                const recipeCard = document.createElement('recipe-card');
                // console.log("Created recipe-card");
                recipeCard.data = recipeObj;
                // console.log(recipeCard.data);
                redirectRecipeDetail(recipeObj)
                // click event
                const page = recipeObj._id;
                const routeUrl = RECIPE_ROUTE + page
                recipeCard.addEventListener('click', e => {
                    // if (e.path[0].nodeName == 'A') return;
                    router.navigate(routeUrl);
                });
                gridContainer.appendChild(recipeCard);
            })
        });
}

/**
 * Adds the function in Router that redirects to recipeDetail
 * @param recipeObj The object of the created recipe. 
 */
export function redirectRecipeDetail(recipeObj) {
    const page = recipeObj._id;
    const routeUrl = RECIPE_ROUTE + page
    router.addPage(routeUrl, function () {
        homePage.classList.remove("shown");
        recipeDetailPage.classList.add("shown");
        userInfoPage.classList.remove("shown");
        createRecipePage.classList.remove("shown");
        editRecipePage.classList.remove("shown");
        recipeDetailPage.data = recipeObj;
        // console.log(recipeDetailPage.data)
        fillOutRecipe(recipeObj)
    });
}
/**
 * Binds the click event listener to the <recipe-card> elements added to the page
 * so that when they are clicked, their card expands into the full recipe view mode
 * @param {Element} recipeCard the <recipe-card> element you wish to bind the event
 *                             listeners to
 * @param {String} pageName the name of the page to navigate to on click
 */
export function bindRecipeCard(recipeCard, pageName) {
    recipeCard.addEventListener('click', e => {
        if (e.path[0].nodeName == 'A') return;
        router.navigate(pageName);
    });
}

/**
 * 
 * @param {*} pageName 
 * @param {*} callback function
 */
export function routerAddCreatePage(pageName, recipeObj, isUpdate) {
    if (isUpdate) {
        router.addPage(pageName, function () {
            homePage.classList.remove("shown");
            recipeDetailPage.classList.remove("shown");
            userInfoPage.classList.remove("shown");
            createRecipePage.classList.remove("shown");
            editRecipePage.classList.add("shown");
            populateEditPage(recipeObj)
        })
    }
    else router.addPage(pageName, function () {
        homePage.classList.remove("shown");
        recipeDetailPage.classList.remove("shown");
        userInfoPage.classList.remove("shown");
        createRecipePage.classList.add("shown");
        editRecipePage.classList.remove("shown");
        setupCreatePage()
    })
}

/**
 * 
 * @param {*} pageName 
 * @param {*} callback function
 */
export function routerAddEditPage(pageName, recipeObj) {
    router.addPage(pageName, function () {
        homePage.classList.remove("shown");
        recipeDetailPage.classList.remove("shown");
        userInfoPage.classList.remove("shown");
        createRecipePage.classList.remove("shown");
        editRecipePage.classList.add("shown");
        populateEditPage(recipeObj)
    })
}

export function routerNavigateWrapper(pageName) {
    router.navigate(pageName);
}
/**
 * Binds the click event listener to the <profileWrapper> elements added to the page
 * so that when they are clicked, their card expands into the full recipe view mode
 * @param {Element} profile the user profile json file
 */
export function bindUserProfile(profile) {
    const pageName = USER_ROUTE + profile._id
    router.addPage(pageName, function () {
        homePage.classList.remove("shown");
        recipeDetailPage.classList.remove("shown");
        createRecipePage.classList.remove("shown");
        editRecipePage.classList.remove("shown");
        userInfoPage.classList.add("shown");
        userInfoPage.data = profile
        // TODO: populate user data in userInfo page 
    });

    const profileButton = document.getElementById(ELE_ID_PROFILE_WRAPPER)
    profileButton.addEventListener('click', e => {
        if (e.path[0].nodeName == 'A') return;
        router.navigate(pageName);
    });
}

/**
 * Binds the 'keydown' event listener to the Escape key (esc) such that when
 * it is clicked, the home page is returned to
 */
export function bindEscKey() {
    /**
     * TODO - Part 1 Step 5
     * For this step, add an event listener to document for the 'keydown' event,
     * if the escape key is pressed, use your router to navigate() to the 'home'
     * page. This will let us go back to the home page from the detailed page.
     */
    document.addEventListener('keydown', function (e) {
        if (e.key == "Escape") {
            router.navigate("home", false);
        }
    });
}

/**
 * Binds the 'popstate' event on the window (which fires when the back &
 * forward buttons are pressed) so the navigation will continue to work 
 * as expected. (Hint - you should be passing in which page you are on
 * in your Router when you push your state so you can access that page
 * info in your popstate function)
 */
export function bindPopstate() {
    /**
     * TODO - Part 1 Step 6
     * Finally, add an event listener to the window object for the 'popstate'
     * event - this fires when the forward or back buttons are pressed in a browser.
     * If your event has a state object that you passed in, navigate to that page,
     * otherwise navigate to 'home'.
     * 
     * IMPORTANT: Pass in the boolean true as the second argument in navigate() here
     * so your navigate() function does not add your going back action to the history,
     * creating an infinite loop
     */
    window.addEventListener('popstate', (event) => {
        if (event.state) {
            router.navigate(event.state.page, true);
        } else {
            router.navigate('home', true);
        }
    });
}


/**
 * Save profile to global variable userData in index.js.
 * @param profile The json file of the user data
 */
export function setGlobalUserData(profile) {
    userData = profile;
}

/**
 * Clear global variable userData in index.js.
 */
export function clearGlobalUserData() {
    userData = null;
}