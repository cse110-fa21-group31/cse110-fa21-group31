// ProfileClass
// Euvin Keel

/*
    Required fields:
    id (string)
    name (string)
    email (string)
    profilePicture (string) // TODO: unsure how to store or reference these
    myRecipes (RecipeClass[])
    savedRecipes (RecipeClass[])
*/
class ProfileClass {
    constructor(id, name, email, profilePicture, myRecipes, savedRecipes) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.profilePicture = profilePicture;
        this.myRecipes = myRecipes;
        this.savedRecipes = savedRecipes;
    }
    
    // Methods
    addRecipe(recipe) {
        this.myRecipes.push(recipe);
    }
    removeRecipe(recipeId) {
        let index = this.myRecipes.findIndex(
            (recipe) => recipe.recipeID == recipeId
        );
        if (index > -1) {
            this.myRecipes.splice(index, 1);
        }
    }

    addSavedRecipe(recipe) {
        this.savedRecipes.push(recipe);
    }
    removeSavedRecipe(recipeId) {
        let index = this.savedRecipes.findIndex(
            (recipe) => recipe.recipeID == recipeId
        );
        if (index > -1) {
            this.savedRecipes.splice(index, 1);
        }
    }
}

module.exports = ProfileClass;
