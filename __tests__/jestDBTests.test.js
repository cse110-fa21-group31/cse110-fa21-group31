// Jest Unit testing

import * as Interface from "../source/service/server/interface.mjs";
import { TEST_RECIPE_DB_PATH } from "../source/scripts/util.js";
import Datastore from "nedb";
import recipes from "./testRecipes.js";
import crypto from "crypto";

const RANDOM_RECIPE_COUNT = 10;
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

// ACTUAL TESTING
test("smaple test", (done) => {
    expect(1).toBe(1);
    done();
})

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
        await populateDatabase();
    });

    test("createRecipe", async () => {
        let randomRecipe = generateRandomRecipe();
        let result = await Interface.createRecipe(randomRecipe, testDB);
        expect(result).toEqual(randomRecipe);
        expect(result._id).toBeTruthy();
    });

    test("getRecipeById", async () => {
        let randomRecipe = generateRandomRecipe();
        await Interface.createRecipe(randomRecipe, testDB);
        let result = await Interface.getRecipeById(randomRecipe._id, testDB);
        expect(result).toEqual(randomRecipe);
    });

    test("getRecipesByIds", async () => {
        let randomRecipe = generateRandomRecipe();
        await Interface.createRecipe(randomRecipe, testDB);
        let result = await Interface.getRecipesByIds([randomRecipe._id], testDB);
        expect(result.length).toEqual(1);
        expect(result[0]).toEqual(randomRecipe);
    });

    test("getRecipesByNameAndTags", async () => {
        let randomRecipe = generateRandomRecipe();
        await Interface.createRecipe(randomRecipe, testDB);
        console.log("NAME:", randomRecipe.name);
        console.log("TAGS:", randomRecipe.tags);
        let result = await Interface.getRecipesByNameAndTags(
            {
                name: randomRecipe.name,
                tags: randomRecipe.tags,
            },
            testDB
        );
        expect(result.length).toEqual(1);
        expect(result[0]).toEqual(randomRecipe);
    });

    test("getRecipeByPage", async () => {
        let randomRecipes = [];
        // TODO
    });
});

/*
test("do stuff", async (done) => {
    let currCount = await getDatabaseCount();
    console.log(`CurrCount: ${currCount}`);
    await clearDatabase();
    currCount = await getDatabaseCount();
    console.log(`CurrCount: ${currCount}`);
    await populateDatabase(Math.random() * 100);
    currCount = await getDatabaseCount();
    console.log(`CurrCount: ${currCount}`);
})
*/

/*
async function testDatabases() {
    await clearDatabase();
    test("should have no recipes begin with", async (done) => {
        console.log("CLEARED");
        testDB.find({}, (err, docs) => {
            expect(docs.length).toBe(0);
            console.log("DONE RUNNING CLEARED TEST");
            done();
        });
    });
}

console.log("FLAG DONE WITH TEST 1");
await populateDatabase();
console.log("POPULATE");

test("should have new recipes", (done) => {
    testDB.find({}, (err, docs) => {
        expect(docs.length).toBe(recipes.length + RANDOM_RECIPE_COUNT);
        done();
    });
});

console.log("FLAG 4");


*/

/*
await Promise.race(
).catch((reason) => {
    console.log("An error occured during the race:");
    console.log(reason);
});

console.log("FLAG 3");
console.log("Done inserting recipes");

test("should have recipes in our fake database", (done) => {
    console.log("FLAG 4");
    testDB.find({}, (err, docs) => {
        expect(docs.length).toBe(recipes.length);
        done();
    })
});
test("should handle adding new recipes", (done) => {
    // generate random amounts of random recipes
        .then(() => {
            // check that the database has the correct amount of recipes
            new Promise((resolve) => {
                testDB.find({}, (err, docs) => {
                    resolve(docs);
                });
            })
                .then((docs) => {
                    expect(docs.length).toBe(
                        recipes.length + randomRecipes.length
                    );
                })
                .catch((reason) => {
                    console.log(reason);
                })
                .finally(() => {
                    done();
                });
        })
        .catch((reason) => {
            console.log(reason);
        })
        .finally(() => {
            done();
        });
});
*/

