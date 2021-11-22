const getHelloWorld = require("../source/scripts/example.js");
const profileClass = require("../source/scripts/profileClass.js");
const recipeClass = require("../source/scripts/recipeClass.js");

test('getHelloWorld should return "Hello World!"', () => {
    expect(getHelloWorld()).toBe("Hello World!");
});

const SaladRecipe = new recipeClass(
    'saladrecipe1',
    'Ceasar Salad',
    'Julius',
    '11/21/2020',
    'salad.png',
    60,
    'easy',
    'salad, dressing, simple',
    // ingredients
    ['1/2 cup of dressing', '1/2 cup of salad'],
    // steps
    ['1. Mix dressing and salad together', '2. Serve']
);

let newProfile = new profileClass('sa8f39bd', 'Robert', 'robert@email.com', 'picture.png', [], []);

test('profiles should be able to add recipes', () => {
    newProfile.addRecipe(SaladRecipe);
    expect(newProfile.recipes.length).toBe(1);
});

test('profiles should be able to remove recipes', () => {
    newProfile.removeRecipe(SaladRecipe);
    expect(newProfile.recipes.length).toBe(0);
});

test('profiles should be able to add favorites', () => {
    newProfile.addSavedRecipe(SaladRecipe);
    expect(newProfile.savedRecipes.length).toBe(1);
});

test('profiles should be able to remove favorites', () => {
    newProfile.removeSavedRecipe(SaladRecipe);
    expect(newProfile.savedRecipes.length).toBe(0);
});