// RecipeClass
// Euvin Keel

/*
    Based off of this schema: https://github.com/cse110-fa21-group31/cse110-fa21-group31/issues/22
    this class needs:
    * the recipe ID: string
    * name: string
    * author id: string
    * datePosted: Date
    * coverImage: (unsure how to store this, TODO)
    * cookingTime: 
    * difficulty 
    * tags (optional)
    * ingredients
    * steps
    
    // not even sure if we can manage comments in a class since we're using a third party thing to manage those
    * comments (starts out empty)
*/

class RecipeClass {
    constructor(
        recipeID,
        name,
        authorID,
        datePosted,
        coverImage,
        cookingTime,
        difficulty,
        tags,
        ingredients,
        steps
    ) {
        this.recipeID = recipeID;
        this.name = name;
        this.authorID = authorID;
        this.datePosted = datePosted;
        this.coverImage = coverImage;
        this.cookingTime = cookingTime;
        this.difficulty = difficulty;
        this.tags = tags;
        this.ingredients = ingredients;
        this.steps = steps;

        this.comments = [];
    }

    // SETTERS for every single field of this class
    /*
    set recipeID(name) {
        this._recipeID = name;
    }
    set name(name) {
        this._name = name;
    }
    set authorID(id) {
        this._authorID = id;
    }
    set datePosted(dateString) {
        this._datePosted = new Date(dateString);
    }
    set coverImage(coverImage) {
        this._coverImage = coverImage;
    }*/

    addTag(tag) {
        this.tags.push(tag);
    }
    removeTag(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
    }

    insertStep(step, stepIndex = this.steps.length) {
        this.steps.splice(stepIndex, 0, step);
    }

    removeStep(stepIndex) {
        this.steps.splice(stepIndex, 1);
    }

    // TODO: unsure how we'll handle comments since we're not the ones storing them
    // these are just placeholders
    addComment(comment) {
        this.comments.push(comment);
    }
    removeComment(commentIndex) {
        this.comments.splice(commentIndex, 1);
    }
    /*
    // getters for all properties
    get name() {
        return this.name;
    }

    get authorID() {
        return this.authorID;
    }

    get datePosted() {
        return this.datePosted;
    }

    get coverImage() {
        return this.coverImage;
    }

    get cookingTime() {
        return this.cookingTime;
    }

    get difficulty() {
        return this.difficulty;
    }

    get tags() {
        return this.tags;
    }

    get ingredients() {
        return this.ingredients;
    }

    get steps() {
        return this.steps;
    }

    get comments() {
        return this.comments;
    }*/
}

module.exports = RecipeClass;
