// import RecipeClass from "./recipeClass";
// The purpose of this JS file is to take API JSON files, create recipeClass objects with that info, and "send" them out to the website

// RecipeExpand.js
const url = "http://127.0.0.1:3030/api"
window.addEventListener("DOMContentLoaded", init);

// THESE SHOULD BE GIVEN VIA API
const recipes = [
    "http://127.0.0.1:3030/api?id=uYaCV6U4XGfQHYg2",
    // "https://introweb.tech/assets/json/ghostCookies.json",
    // "https://introweb.tech/assets/json/birthdayCake.json",
    // "https://introweb.tech/assets/json/chocolateChip.json",
    // "https://introweb.tech/assets/json/stuffing.json",
    // "https://introweb.tech/assets/json/turkey.json",
    // "https://introweb.tech/assets/json/pumpkinPie.json",
];
const recipeData = {};

async function init() {
    let recipeID = 'VZsAA6HuzytdIQT2';
    let response = await fetch(url + '?id=' + recipeID, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
        }).then((response) => response.json())
        .then((data) => {
            // This grabs the data return by the server
            return data
        })
        .catch((err) => {
            reject(err);
        });
    //the recipe object received from backend server

    console.log(response)
    fillOutRecipe(response);



}

/** 
async function fetchRecipes() {
    return new Promise((resolve, reject) => {
        recipes.forEach((recipe) => {
            console.log("fetching", recipe)
            fetch(recipe)
                // parses JSON response into native JavaScript objects)
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
*/



function fillOutRecipe(data) {
    document.getElementById("recipeTitle").innerHTML = data.name;
    document.getElementById("tags").innerHTML = data.tags;
    document.getElementById("recipeImage").setAttribute("src", data.image);
    document.getElementById("date").innerHTML = new Date(data.datePosted * 1000);
    document.getElementById("description").innerHTML = data.description;
    document.getElementById("servingSize").innerHTML = data.servingSize;
    document.getElementById("author").innerHTML = data.author;
    document.getElementById("cookTime").innerHTML = data.cookTime;
    document.getElementById("ingredients").innerHTML = data.ingredients;
    document.getElementById("steps").innerHTML = data.steps;

    /** 
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
    */

    /** 
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
    */
    function convertTime(time) {
        let timeStr = '';

        // Remove the 'PT'
        time = time.slice(2);

        let timeArr = time.split('');
        if (time.includes('H')) {
            for (let i = 0; i < timeArr.length; i++) {
                if (timeArr[i] == 'H') return `${timeStr} hr`;
                timeStr += timeArr[i];
            }
        } else {
            for (let i = 0; i < timeArr.length; i++) {
                if (timeArr[i] == 'M') return `${timeStr} min`;
                timeStr += timeArr[i];
            }
        }

        return '';
    }
}