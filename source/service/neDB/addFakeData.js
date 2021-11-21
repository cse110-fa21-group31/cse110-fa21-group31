var Datastore = require("nedb");
// var db = new Datastore({ filename: "data/demo" });
// const demo2 = new Datastore({ filename: "data/demo2", autoload: true });
const RECIPE_DB_PATH = "source/service/.data/recipes"
const USER_DB_PATH = "source/service/.data/users"
const recipeDB = new Datastore({ filename: RECIPE_DB_PATH, autoload: true });
const userDB = new Datastore({ filename: USER_DB_PATH, autoload: true });
// db.loadDatabase(function (err) {
//     // Start issuing commands after callback...
//     if (!err) {
//         console.log("Loaded database");
//     }
// });

const fakeRecipe = {
    "name": "Christmas Cake",
    "author": "Powell's Fanclub",
    "description": "Christmas cake made by Powell's Fanclu! We're awesome and Merry Christmas!",
    "datePosted": "2021-04-23T18:25:43.511Z",
    "serving size": 10,
    "image": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/frosty-robin-cake-1606392006.jpg",
    "tags": ["christmas", "party"],
    "prepTime": "1 hr",
    "cookTime": "2 hrs",
    "difficulty": "5 star",
    "ingredients": ["butter", "flour"],
    "steps": ["step 1", "step 2"],
    "comments": ["comment1: amazing!", "comment2: Delicious"]


}
// fakeuser = {
//     "username": "John",
//     "email": "john@gmail.com",
//     "imageURL": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
//     "savedRecipe": ["saved_recipe1_id", "saved_recipe2_id"],
//     "myRecipe": ["my_recipe3_id", "my_recipe4_id"]
// }
recipeDB.insert(fakeRecipe, (err, doc) => {
    if (!err) {
        console.log("Inserted", doc.name, "with ID", doc._id);
    }
});
// userDB.insert(fakeuser, (err, doc) => {
//     if (!err) {
//         console.log("Inserted", doc.name, "with ID", doc._id);
//     }
// });


// demo2.insert(celia, function (err, doc) {
//     if (!err) {
//         console.log("Inserted", doc.name, "with ID", doc._id);
//     }
// });

recipeDB.findOne({ name: "Halloween Cookie Bars" }, function (err, doc) {
    if (!err) {
        console.log("Found", doc);
    }
});
