// Jest Unit testing

import * as Interface from "../source/service/server/interface.mjs";
import { TEST_RECIPE_DB_PATH } from "../source/scripts/util.js";
import Datastore from "nedb";
import recipes from "./testRecipes.js";
import crypto from "crypto";

const testDB = new Datastore({ filename: TEST_RECIPE_DB_PATH, autoload: true });

/**
 * Generate a random tag for jest testing
 * @returns {string}
 */
const generateRandomTag = () => {
    return "tag" + Math.floor(Math.random() * 100);
}
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
        Math.floor(Math.random() * (new Date().getTime() - new Date(0).getTime())) +
        new Date(0).getTime()
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
    randomRecipe.description = "Random Description " + Math.floor(Math.random() * 100);
    randomRecipe.difficulty = Math.floor(Math.random() * 5);
    randomRecipe._id = crypto.randomUUID();
    
    return randomRecipe;
};

// ACTUAL TESTING

// make sure we start off with a clean slate every time or else
// tests will keep adding and adding the same recipes
testDB.remove({}, { multi: true }, function (err, numRemoved) {
    testDB.loadDatabase();
});



const beginDatabaseTests = () => {
    test("should have no recipes to begin with", (done) => {
        testDB.find({}, (err, docs) => {
            expect(docs).toBe(0);
            done();
        });
    });
    
    console.log("Inserting recipes into test database");
    Promise.race(
        recipes.map((recipe) => {
            console.log(`Inserting recipe ${recipe.name}`);
            Interface.createRecipe(recipe, testDB).catch((err) => console.log(err));
        })
    )
        .catch((reason) => {
            console.log("An error occured during the race:");
            console.log(reason);
        })
        .then(() => {
            console.log("Done inserting recipes");
            beginDatabaseTests();
        });
    
    test("should have recipes in our fake database", (done) => {
        new Promise((resolve) => {
            testDB.docs({}, (err, docs) => {
                resolve(docs);
            });
        })
            .then((docs) => {
                expect(docs).toBe(recipes.length);
            })
            .catch((reason) => {
                console.log(reason);
            })
            .finally(() => {
                done();
            });
    });
    test("should handle adding new recipes", (done) => {
        // generate random amounts of random recipes
        const randomRecipes = [];
        for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
            randomRecipes.push(generateRandomRecipe());
        }
        
        // add the random recipes to the database
        Promise.
            all(randomRecipes.map((recipe) => {
                return Interface.createRecipe(recipe, testDB);
            }))
            .then(() => {
                // check that the database has the correct amount of recipes
                new Promise((resolve) => {
                    testDB.find({}, (err, docs) => {
                        resolve(docs);
                    });
                })
                    .then((docs) => {
                        expect(docs.length).toBe(recipes.length + randomRecipes.length);
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
};
