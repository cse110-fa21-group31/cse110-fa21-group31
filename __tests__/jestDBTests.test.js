// Jest Unit testing

import * as Interface from "../source/service/server/interface.mjs";
import {
    TEST_RECIPE_DB_PATH,
    CARDS_PER_PAGE,
    USER_DB_PATH,
    TEMP_USER_DB_PATH,
} from "../source/service/util.js";
import Datastore from "nedb";
import recipes from "./testRecipes.js";
import fs from "fs";

const fakeUserId = "JEST_ASkjdsjio983nSld";
const fakeUser = {
    username: "Jest User",
    email: "Jestuser@jest.com",
    imageURL: "https://icon-library.com/images/bot-icon/bot-icon-5.jpg",
    savedRecipe: [],
    myRecipe: [],
    _id: fakeUserId,
};


const THECONSOLE = console;
const log = console.log;
let originalUserData = ""

beforeAll(() => {
    fs.writeFileSync(TEST_RECIPE_DB_PATH, "");
    // fs.writeFileSync(TEMP_USER_DB_PATH, "");
    const data = fs.readFileSync(USER_DB_PATH);
    originalUserData = data.toString();
    // fs.copyFileSync(USER_DB_PATH, TEMP_USER_DB_PATH);
    fs.writeFileSync(USER_DB_PATH, JSON.stringify(fakeUser));
    console.log('sup');
    THECONSOLE.log = () => {};
})

afterAll(() => {
    let waitTime = 2000;
    fs.unlinkSync(TEST_RECIPE_DB_PATH);
    fs.writeFileSync(USER_DB_PATH, originalUserData);
    /*
    setTimeout(() => {
        fs.writeFileSync(USER_DB_PATH, "");
        setTimeout(() => {
            fs.writeFileSync(USER_DB_PATH, originalUserData);
            setTimeout(() => {
                fs.unlinkSync(TEST_RECIPE_DB_PATH);
                setTimeout(() => {
                    fs.unlinkSync(TEMP_USER_DB_PATH);
                },waitTime)
            },waitTime)
        },waitTime)
    },waitTime)
    */
    // fs.copyFileSync(TEMP_USER_DB_PATH, USER_DB_PATH);
    // if (err) throw err;
    
    
});

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
    randomRecipe.author = fakeUser._id;

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
};
const populateDatabase = (randomRecipes = 10) => {
    return new Promise((resolve) => {
        // insert some predefined ones...
        // Append random recipes to already predefined recipes
        let newRecipes = [
            ...Array(randomRecipes).fill(null).map(generateRandomRecipe),
        ];
        Promise.race(
            newRecipes.map((recipe) => {
                // await addMyRecipe(userDB, doc.author, doc._id);
                return Interface.createRecipe(recipe, testDB);
            })
        )
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
    beforeEach(async () => {
        await clearDatabase();
    });

    afterEach(async () => {
        // this is such a hack and probably violates 50 international treaties
        // and laws to use a setTimeout like this but i am at my wits end and 
        // i would like to sleep tonight. 
        // i have to include this because if i don't, somehow the test data leaks into
        // the original file and leaves a bunch of test users (i don't even know why it
        // even produces a bunch of USERS in the first place, it should only leave just one
        // but this ensures the file returns back to normal after the entire jest test suite)
        await new Promise((resolve) => {setTimeout(resolve, 500)});
    });

    test("createRecipe", async () => {
        let randomRecipe = generateRandomRecipe();
        console.log(randomRecipe);
        let result = await Interface.createRecipe(randomRecipe, testDB);
        console.log(result);
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
        for (let i = 0; i < CARDS_PER_PAGE-1; i++) {
            let newRandomRecipe = generateRandomRecipe();
            randomRecipes.push(newRandomRecipe);
            createdRecipes.push(
                await Interface.createRecipe(newRandomRecipe, testDB)
            );
        }
        let createdIds = createdRecipes.map((recipe) => recipe._id);
        let query = { ids: createdIds.join(",") };
        let resultRecipes = await Interface.getRecipesByQuery(query, testDB);
        expect(resultRecipes.length).toBe(createdIds.length);
    });

    test("getRecipesByNameAndTags", async () => {
        const commonName = "foodthing";
        const commonTag = "commontag";
        // generate a bunch of new recipes that have commonName inside their name
        // and also have commonTag as a tag in their tagstring
        const commonRecipeCount = CARDS_PER_PAGE-1;
        const commonRecipes = Array(commonRecipeCount)
            .fill(null)
            .map(() => {
                let newRecipe = generateRandomRecipe();
                newRecipe.name =
                    newRecipe.name +
                    commonName +
                    Math.floor(Math.random() * 100);
                newRecipe.tags = newRecipe.tags + `,${commonTag}`;
                return newRecipe;
            });
        await Promise.race(
            commonRecipes.map((recipe) =>
                Interface.createRecipe(recipe, testDB)
            )
        );
        let query = { name: commonName, tags: commonTag };
        const queryResult = await Interface.getRecipesByQuery(query, testDB);
        expect(queryResult.length).toBe(commonRecipeCount);
        expect(
            queryResult.every((recipe) => recipe.name.includes(commonName))
        ).toBeTruthy();
        expect(
            queryResult.every((recipe) =>
                recipe.tags.split(",").includes(commonTag)
            )
        ).toBeTruthy();
    });

    test("getRecipeByPage full", async () => {
        await populateDatabase(CARDS_PER_PAGE);
        let query = { name: "", tags: "" };
        let pagedrecipes = await Interface.getRecipesByQuery(query, testDB);
        expect(pagedrecipes.length).toBe(CARDS_PER_PAGE);
    });

    test("getRecipeByPage past full", async () => {
        await populateDatabase(CARDS_PER_PAGE+5);
        let query = { name: "", tags: "" };
        let pagedrecipes = await Interface.getRecipesByQuery(query, testDB);
        expect(pagedrecipes.length).toBe(CARDS_PER_PAGE);
    });
});
