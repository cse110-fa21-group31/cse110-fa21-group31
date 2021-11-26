// import RecipeClass from "./recipeClass";
// The purpose of this JS file is to take API JSON files, create recipeClass objects with that info, and "send" them out to the website

// RecipeExpand.js
window.addEventListener("DOMContentLoaded", init);

// THESE SHOULD BE GIVEN VIA API
import { Router } from './router/Router.js'
import { url, fetchRecipeByPage } from './APICalls.js'
import { ELE_ID_PROFILE_WRAPPER, RECIPE_ROUTE, USER_ROUTE } from './util.js'
import { fillOutRecipe } from './recipeDetail.js'
var recipeData = [];
const NumRecipePerPage = 6
const currPage = 1

const homePage = document.getElementById('homePage')
const recipeDetailPage = document.getElementById('recipeDetail')
const userInfoPage = document.getElementById('userInfo')


window.addEventListener('DOMContentLoaded', init);

const router = new Router(function () {
    console.log("Test router");
    // TODO: array and for loop in the future
    homePage.classList.add("shown");
    recipeDetailPage.classList.remove("shown");
    userInfoPage.classList.remove("shown");
});

async function init() {
    try {
        await createRecipes();
    } catch (err) {
        console.log(`Error fetching recipes: ${err}`);
        return;
    }
    await fetchRecipes();
    createRecipeCards();
    bindEscKey();
    bindPopstate();
}

//fills the recipes into the recipes Array
//should help pull info from the api call, or makes the api call here
async function createRecipes() {
    //do nothing for now!
}

async function fetchRecipes() {
    let response = await fetchRecipeByPage(currPage)
    recipeData = response;
}


/**
 * Generates the <recipeCard> elements from the fetched recipes and
 * appends them to the page
 */
function createRecipeCards() {
    // Makes new recipe cards
    recipeData.forEach(recipeObj => {

        if (!recipeObj) return
        const recipeCard = document.createElement('recipe-card');
        // console.log("Created recipe-card");
        recipeCard.data = recipeObj;
        // console.log(recipeCard.data);
        const page = recipeObj._id;
        const routeUrl = RECIPE_ROUTE + page
        router.addPage(routeUrl, function () {
            homePage.classList.remove("shown");
            recipeDetailPage.classList.add("shown");
            recipeDetailPage.data = recipeObj;
            // console.log(recipeDetailPage.data)
            fillOutRecipe(recipeObj)
        });
        // click event
        recipeCard.addEventListener('click', e => {
            // if (e.path[0].nodeName == 'A') return;
            router.navigate(routeUrl);
        });

        document.querySelector('.myRecipeCardGridContainer').appendChild(recipeCard);
    })
}

/**
 * Binds the click event listener to the <recipe-card> elements added to the page
 * so that when they are clicked, their card expands into the full recipe view mode
 * @param {Element} recipeCard the <recipe-card> element you wish to bind the event
 *                             listeners to
 * @param {String} pageName the name of the page to navigate to on click
 */
function bindRecipeCard(recipeCard, pageName) {
    recipeCard.addEventListener('click', e => {
        if (e.path[0].nodeName == 'A') return;
        router.navigate(pageName);
    });
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
        userInfoPage.classList.add("shown");
        userInfoPage.data = profile
        console.log(userInfoPage.data)
        fillOutRecipe(recipeObj)
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
function bindEscKey() {
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
function bindPopstate() {
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

