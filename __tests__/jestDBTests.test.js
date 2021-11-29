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
    randomRecipe.name = "Random Recipe " + Math.floor(Math.random() * 100);
    randomRecipe.tags = [];
    // generate a random date
    randomRecipe.date = new Date(
        Math.floor(
            Math.random() * (new Date().getTime() - new Date(0).getTime())
        ) + new Date(0).getTime()
    );
    for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
        randomRecipe.tags.push(generateRandomTag());
    }
    randomRecipe.steps = [];
    for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
        randomRecipe.steps.push("Step " + i);
    }
    randomRecipe.ingredients = {};
    for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
        randomRecipe.ingredients[i] = "Ingredient " + i;
    }
    randomRecipe.description =
        "Random Description " + Math.floor(Math.random() * 100);
    randomRecipe.difficulty = Math.floor(Math.random() * 5);
    randomRecipe._id = crypto.randomUUID();

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
const populateDatabase = () => {
    return new Promise((resolve) => {
        // insert some predefined ones...
        recipes.map((recipe) => {
            console.log(`Inserting recipe ${recipe.name}`);
            return Interface.createRecipe(recipe, testDB).catch((err) =>
                console.log(err)
            );
        })

        // ... as well as some random ones
        for (let i = 0; i < RANDOM_RECIPE_COUNT; i++) {
            Interface.createRecipe(generateRandomRecipe(), testDB);
        }

        resolve();
    });
};
const getDatabaseCount = () => {
    return new Promise((resolve) => {
        testDB.count({}, (err, count) => {
            resolve(count);
        });
    });
};

let currCount = await getDatabaseCount();
console.log(`CurrCount: ${currCount}`);
await clearDatabase();
currCount = await getDatabaseCount();
console.log(`CurrCount: ${currCount}`);
await populateDatabase();
currCount = await getDatabaseCount();
console.log(`CurrCount: ${currCount}`);

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