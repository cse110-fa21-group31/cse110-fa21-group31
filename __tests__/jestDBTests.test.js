// Jest Unit testing

import * as Interface from "../source/service/server/interface.mjs";
import { TEST_RECIPE_DB_PATH, CARDS_PER_PAGE } from "../source/scripts/util.js";
import Datastore from "nedb";
import recipes from "./testRecipes.js";

const testDB = new Datastore({ filename: TEST_RECIPE_DB_PATH, autoload: true });

/**
 * Generate a random tag for jest testing
 * @returns {string}
 */
const generateRandomTag = () => {
    return "tag" + Math.floor(Math.random() * 100);
};

/**
 * Generates a random recipe for testing
 * @returns {recipe}
 */
const generateRandomRecipe = () => {
    // Generate a random recipe based on the recipe object, samplere.
    // This is used to test the createRecipe function.
    // Generate a random string for the name, and a variable amount of tags.
    let randomRecipe = {};
    randomRecipe.name = "Random Recipe " + Math.ceil(Math.random() * 100);
    
    let newtags = [];
    for (let i = 0; i < Math.ceil(Math.random() * 10); i++) {
        newtags.push(generateRandomTag());
    }
    // tags is a comma delimited string
    randomRecipe.tags = newtags.join(",");

    // generate a random date
    randomRecipe.date = new Date(
        Math.ceil(Math.random() * (new Date().getFullYear() - 2000)) + 2000,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
    );
    
    randomRecipe.steps = [];
    for (let i = 0; i < Math.ceil(Math.random() * 10); i++) {
        randomRecipe.steps.push("Step " + i);
    }
    randomRecipe.ingredients = {};
    for (let i = 0; i < Math.ceil(Math.random() * 10); i++) {
        randomRecipe.ingredients[i] = "Ingredient " + i;
    }
    randomRecipe.description =
        "Random Description " + Math.floor(Math.random() * 100);
    randomRecipe.difficulty = Math.floor(Math.random() * 5);

    return randomRecipe;
};

// make sure we start off with a clean slate every time or else
// tests will keep adding and adding the same recipes
const clearDatabase = () => {
    return new Promise((resolve) => {
        testDB.remove({}, { multi: true }, function (err, numRemoved) {
            testDB.loadDatabase();
            console.log("FLAG DONE REMOVING RECIPES");
            resolve();
        });
    });
}
const populateDatabase = (randomRecipes = 10) => {
    return new Promise((resolve) => {
        // insert some predefined ones...
        // Append random recipes to already predefined recipes
        let newRecipes = [...recipes, ...Array(randomRecipes).fill(null).map(generateRandomRecipe)];
        Promise.race(newRecipes.map((recipe) => {
            return Interface.createRecipe(recipe, testDB)
        }))
        .then(resolve)
        .catch(console.log);
    });
};
const getDatabaseCount = () => {
    return new Promise((resolve) => {
        testDB.count({}, (err, count) => {
            resolve(count);
        });
    });
};

describe("Tests database recipe functions", () => {
    beforeAll(async () => {
        await clearDatabase();
    });

    test("createRecipe", async () => {
        let randomRecipe = generateRandomRecipe();
        let result = await Interface.createRecipe(randomRecipe, testDB);
        expect(result._id).toBeTruthy();
    });

    test("getRecipeById", async () => {
        let randomRecipe = generateRandomRecipe();
        let createdRecipe = await Interface.createRecipe(randomRecipe, testDB);
        let recipeId = createdRecipe._id;
        let result = await Interface.getRecipeById(recipeId, testDB);
        expect(result._id).toBe(recipeId);
        expect(createdRecipe).toEqual(result);
    });

    test("getRecipesByIds", async () => {
        let randomRecipes = [];
        let createdRecipes = [];
        for (let i = 0; i < Math.random() * 10 + 1; i++) {
            let newRandomRecipe = generateRandomRecipe();
            randomRecipes.push(newRandomRecipe);
            createdRecipes.push(await Interface.createRecipe(newRandomRecipe, testDB));
        }
        let createdIds = createdRecipes.map((recipe) => recipe._id);
        let resultRecipes = await Interface.getRecipesByIds(createdIds, testDB);
        expect(resultRecipes.length).toBe(createdIds.length);
    });

    test("getRecipesByNameAndTags", async () => {
        /**
         * retrieves all recipes with overlap in the names and all tags match
         * @param {*} searchParams the content to search for
         * @param {*} recipeCollection the database to search in
         * @returns {Array<recipe>} the matching recipes
        export async function getRecipesByNameAndTags(searchParams, recipeCollection) {
         */
        const commonName = "foodthing";
        const commonTag = "commontag";
        // generate a bunch of new recipes that have commonName inside their name
        // and also have commonTag as a tag in their tagstring
        const commonRecipeCount = 10;
        const commonRecipes = Array(commonRecipeCount).fill(null).map(() => {
            let newRecipe = generateRandomRecipe();
            newRecipe.name = newRecipe.name + commonName + Math.floor(Math.random() * 100);
            newRecipe.tags = newRecipe.tags + `, ${commonTag}`;
            return newRecipe;
        });
        await Promise.race(commonRecipes.map((recipe) => Interface.createRecipe(recipe, testDB)));

        const queryResult = Interface.getRecipesByNameAndTags({name: commonName, tags: commonTag}, testDB);
        expect(queryResult.length).toBe(commonRecipeCount);
        expect(queryResult.every((recipe) => recipe.name.includes(commonName))).toBeTruthy();
        expect(queryResult.every((recipe) => recipe.tags.split(",").includes(commonTag))).toBeTruthy();
    });

    test("getRecipeByPage", async (done) => {
        /**
         * fetches all recipes
         * @param {*} recipeCollection the database to search in
         * @returns {Array<recipe>} all recipes in the database
         */
        const recipeCount = await getDatabaseCount();
        const pageSize = CARDS_PER_PAGE;
        const lastPage = Math.ceil(recipeCount / pageSize);
        const firstPage = 1;

        await populateDatabase(3);
        Interface.getRecipesByPage(testDB, firstPage).then((recipes) => {
            expect(recipes.length).toBe(3);
        });

        await clearDatabase();
        await populateDatabase(pageSize);
        Interface.getRecipesByPage(testDB, firstPage).then((recipes) => {
            expect(recipes.length).toBe(pageSize);
        });

        await clearDatabase();
        await populateDatabase(pageSize + 1);
        Interface.getRecipesByPage(testDB, firstPage).then((recipes) => {
            expect(recipes.length).toBe(pageSize);
        });
        Interface.getRecipesByPage(testDB, firstPage + 1).then((recipes) => {
            expect(recipes.length).toBe(1);
        });

        await clearDatabase();
        await populateDatabase(pageSize * 2);
        Interface.getRecipesByPage(testDB, firstPage + 1).then((recipes) => {
            expect(recipes.length).toBe(pageSize);
        });

        await clearDatabase();
        Interface.getRecipesByPage(testDB, firstPage).then((recipes) => {
            expect(recipes.length).toBe(0);
        });
        Interface.getRecipesByPage(testDB, firstPage + 1).then((recipes) => {
            expect(recipes.length).toBe(0);
        });
    });
});