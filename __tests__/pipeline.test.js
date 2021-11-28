// Jest Unit testing

import { createRecipe } from "../source/service/server/interface.mjs";
import { TEST_RECIPE_DB_PATH } from "../source/scripts/util.js";
import Datastore from "nedb";
import recipes from "./testRecipes.js";

const testDB = new Datastore({ filename: TEST_RECIPE_DB_PATH, autoload: true });
// make sure we start off with a clean slate every time or else
// tests will keep adding and adding the same recipes
testDB.remove({}, { multi: true }, function (err, numRemoved) {
    testDB.loadDatabase();
});

console.log("Inserting recipes into test database");
Promise.race(recipes.map(recipe => {
    console.log(`Inserting recipe ${recipe.name}`);
    createRecipe(recipe, testDB).catch((err) => console.log(err));
})).catch((reason) => {
    console.log("An error occured during the race:");
    console.log(reason);
}).then(() => {
    console.log("Done inserting recipes");
    beginDatabaseTests();
});

const beginDatabaseTests = () => {
    test('should have recipes in our fake database', (done) => {
        console.log("flag1");
        new Promise((resolve) => {
        console.log("flag2");
            testDB.count({}, (err, count) => {
        console.log("flag3");
                resolve(count);
            });
        }).then((count) => {
        console.log("flag4");
            expect(count).toBe(recipes.length);
        }).catch((reason) => {
        console.log("flag5");
            console.log(reason);
        }).finally(() => {
        console.log("flag6");
            done();
        });
        console.log("flag7");
    });
}
    
