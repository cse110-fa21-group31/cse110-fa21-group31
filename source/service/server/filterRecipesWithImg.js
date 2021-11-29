import Datastore from "nedb";
const RECIPE_DB_PATH = "source/service/.data/recipes";
const recipeDB = new Datastore({ filename: RECIPE_DB_PATH, autoload: true });

function deleteRecipesWithoutImage() {
    recipeDB.remove({ image: {} }, { multi: true }, function (err, numRemoved) {
        console.log("Removed " + numRemoved + " documents");
    });
}

deleteRecipesWithoutImage();
