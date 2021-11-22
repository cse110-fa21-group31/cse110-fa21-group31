// import RecipeClass from "./recipeClass";
// The purpose of this JS file is to take API JSON files, create recipeClass objects with that info, and "send" them out to the website

// RecipeExpand.js
window.addEventListener("DOMContentLoaded", init);

// THESE SHOULD BE GIVEN VIA API
const recipes = [
    "/source/assets/exampleJSON/example1.json"
];
const recipeData = {};

async function init() {
    try {
        await createRecipes();
    } catch (err) {
        console.log(`Error fetching recipes: ${err}`);
        return;
    }
    await fetchRecipes();
    //const data = recipeData[recipes[0]];
    //fillOutRecipe(data);
    createRecipeCards();
}

//fills the recipes into the recipes Array
//should help pull info from the api call, or makes the api call here
async function createRecipes() {
    //do nothing for now!
}

async function fetchRecipes() {
    return new Promise((resolve, reject) => {
        recipes.forEach((recipe) => {
            fetch(recipe)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    console.log(recipe);
                    // This grabs the page name from the URL in the array above
                    //data["page-name"] = recipe.split("/").pop().split(".")[0];
                    recipeData[recipe] = data;
                    if (Object.keys(recipeData).length == recipes.length) {
                        resolve();
                    }
                })
                .catch((err) => {
                    console.log(`Error loading the ${recipe} recipe`);
                    reject(err);
                });
        });
    });
}

/**
 * Generates the <recipeCard> elements from the fetched recipes and
 * appends them to the page
 */
 function createRecipeCards() {
    // Makes a new recipe card
    const recipeCard = document.createElement('recipeCard');
    // Inputs the data for the card. This is just the first recipe in the recipes array,
    // being used as the key for the recipeData object
    recipeCard.data = recipeData[recipes[0]];

    for (let i in recipes) {
      const json = recipes[i];
      const recipeCard = document.createElement('recipe-card');
      console.log("Created recipe-card");
      recipeCard.data = recipeData[json];
      console.log(recipeCard.data);
      /*
      const page = recipeData[json]['page-name'];
      router.addPage(page, function () {
        document.querySelector('.section--recipe-cards').classList.remove('shown');
        document.querySelector('.section--recipe-expand').classList.add('shown');
        document.querySelector('recipe-expand').data = recipeData[json];
      });
      if (i > 2) {
        recipeCard.classList.add('hidden');
      }
      */
      //bindRecipeCard(recipeCard, page);
      document.querySelector('.myRecipeCardGridContainer').appendChild(recipeCard);
    }
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