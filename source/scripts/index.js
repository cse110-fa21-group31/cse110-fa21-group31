// import RecipeClass from "./recipeClass";
// The purpose of this JS file is to take API JSON files, create recipeClass objects with that info, and "send" them out to the website

// RecipeExpand.js
window.addEventListener("DOMContentLoaded", init);

// THESE SHOULD BE GIVEN VIA API
import { url, fetchRecipeByPage } from './APICalls.js'
let recipeData = [];
const NumRecipePerPage = 6
const currPage = 1
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
        const recipeCard = document.createElement('recipe-card');
        // console.log("Created recipe-card");
        recipeCard.data = recipeObj;
        // console.log(recipeCard.data);
        document.querySelector('.myRecipeCardGridContainer').appendChild(recipeCard);
    })

    // for (let i in recipes) {
    //     const json = recipes[i];
    //     const recipeCard = document.createElement('recipe-card');
    //     console.log("Created recipe-card");
    //     recipeCard.data = recipeData[json];
    //     console.log(recipeCard.data);
    //     /*
    //     const page = recipeData[json]['page-name'];
    //     router.addPage(page, function () {
    //       document.querySelector('.section--recipe-cards').classList.remove('shown');
    //       document.querySelector('.section--recipe-expand').classList.add('shown');
    //       document.querySelector('recipe-expand').data = recipeData[json];
    //     });
    //     if (i > 2) {
    //       recipeCard.classList.add('hidden');
    //     }
    //     */
    //     //bindRecipeCard(recipeCard, page);
    //     document.querySelector('.myRecipeCardGridContainer').appendChild(recipeCard);
    // }
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
            router.navigate(event.state, true);
        } else {
            router.navigate('home', true);
        }
    });
}

function fillOutRecipe(data) {
    console.log(getTitle(data));
    console.log(getYield(data));
    console.log(getCategories(data));
    console.log(getDescription(data));
    console.log(getImage(data));
    console.log(getOrganization(data));
    console.log(getIngredients(data));
    console.log(getInstructions(data));
    document.getElementById("recipeTitle").innerHTML = getTitle(data);
    //document.getElementById("tags").innerHTML=getCategories(data);
    document.getElementById("recipeImage").setAttribute("src", getImage(data));
    document.getElementById("description").innerHTML = getDescription(data);
    document.getElementById("servingSize").innerHTML = getYield(data);
    document.getElementById("author").innerHTML = getOrganization(data);
    document.getElementById("cookTime").innerHTML = convertTime(
        searchForKey(data, "totalTime")
    );
    document.getElementById("dateOfCreation").innerHTML = searchForKey(
        data,
        "datePublished"
    ).split("T")[0];

    const tagss = getCategories(data).split(",");
    tagss.forEach((tag) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = tag;
        document.getElementById("tags").append(listItem);
    });

    const ingredients = getIngredients(data);
    ingredients.forEach((ingredient) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = ingredient;
        document.getElementById("ingredients").append(listItem);
    });

    const instructions = getInstructions(data);
    instructions.forEach((instruction) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = instruction;
        document.getElementById("steps").append(listItem);
    });
}