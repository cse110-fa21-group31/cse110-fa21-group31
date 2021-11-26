// import RecipeClass from "./recipeClass";
// The purpose of this JS file is to take API JSON files, create recipeClass objects with that info, and "send" them out to the website

// RecipeExpand.js
import { RECIPE_ROUTE } from "./util.js"
import { fetchRecipeById } from "./APICalls.js"
const recipeData = {};

/**
 * Populates the recipe detail pages by fetching recipe json and filling in 
 * properties in html components. 
 */
export async function populateRecipeDetail() {
    const url = parent.document.URL;
    let recipeID = url.substring(url.indexOf('#') + RECIPE_ROUTE.length + 1, url.length);
    // let recipeID = "AJlpmnCbp6gry18v";
    let recipe = await fetchRecipeById(recipeID);
    fillOutRecipe(recipe);
}

export function fillOutRecipe(data) {
    document.getElementById("recipeTitle").innerHTML = data.name;
    if (data.tags) document.getElementById("tags").innerHTML = data.tags;
    document.getElementById("recipeImage").setAttribute("src", data.image);
    document.getElementById("date").innerHTML = new Date(data.datePosted * 1000);
    if (data.description) document.getElementById("description").innerHTML = data.description;
    if (data.servingSize) document.getElementById("servingSize").innerHTML = data.servingSize;
    document.getElementById("author").innerHTML = data.author;
    if (data.cookTime) document.getElementById("cookTime").innerHTML = data.cookTime;
    if (data.ingredients) document.getElementById("ingredients").innerHTML = data.ingredients;
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