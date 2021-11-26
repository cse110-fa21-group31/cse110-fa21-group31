import Datastore from "nedb";
import { RECIPE_DB_PATH } from "../util.js";
const recipeDB = new Datastore({ filename: RECIPE_DB_PATH, autoload: true });

function deleteRecipesWithoutImage() {
    recipeDB.remove({ image: {} }, { multi: true }, function (err, numRemoved) {
        console.log("Removed " + numRemoved + " documents");
    });
}

deleteRecipesWithoutImage();