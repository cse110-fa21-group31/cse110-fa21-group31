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

    // Setters
    set id(id) {
        this.id = id;
    }

    set name(name) {
        this.name = name;
    }

    set email(email) {
        this.email = email;
    }

    set profilePicture(profilePicture) {
        this.profilePicture = profilePicture;
    }

    set myRecipes(myRecipes) {
        this.myRecipes = myRecipes;
    }

    set savedRecipes(savedRecipes) {
        this.savedRecipes = savedRecipes;
    }

    // Getters
    get id() {
        return this.id;
    }

    get name() {
        return this.name;
    }

    get email() {
        return this.email;
    }

    get profilePicture() {
        return this.profilePicture;
    }

    get myRecipes() {
        return this.myRecipes;
    }

    get savedRecipes() {
        return this.savedRecipes;
    }

    // Methods
    addRecipe(recipe) {
        this.myRecipes.push(recipe);
    }
    removeRecipe(recipeId) {
        let index = this.myRecipes.findIndex(recipe => recipe.id === recipeId);
        if (index > -1) {
            this.myRecipes.splice(index, 1);
        }
    }

    addSavedRecipe(recipe) {
        this.savedRecipes.push(recipe);
    }
    removeSavedRecipe(recipeId) {
        let index = this.savedRecipes.findIndex(recipe => recipe.id === recipeId);
        if (index > -1) {
            this.savedRecipes.splice(index, 1);
        }
    }
}