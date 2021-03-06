// RecipeClass
// Euvin Keel
/**
 * Filename: recipeClass.js
 * Contains recipeClass, which creates the recipe-card(s)
 */

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

const PLACEHOLDER_IMG =
    window.location.protocol +
    "//" +
    window.location.host +
    "/source/assets/Images/recipeCardPlaceholder.png";


class RecipeClass extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    
    /**
     * Sets all the data for RecipeClass
     * @param {Object} data the JSON file with all necessary data
     */
    set data(data) {
        if (!data) return;

        // Used to access the actual data object within JSON
        this.json = data;
        const style = document.createElement("style");

        style.innerHTML = `
        .recipeCard {
            height: 350px;
            background: white;
            padding-top: 40px;
            // margin-top: 30px;
            text-align: center;
            border: 2px solid #4E598C;
            border-radius: 15px;
            display: table;
            table-layout:fixed;
            length: 200px;
            width: 300px;
            box-shadow: 2px 2px;
            margin-left: auto;
            margin-right: auto;
        }
        .recipeCard:hover {
            background-color: #F9c784;
            box-shadow: 5px 5px;
            border-color: #FCAF58;
        }
        .recipeCard > p {
            font-family: 'Bold Open Sans', sans-serif;
            font-weight: bold;
            color: #4E598C;
            font-size: large;
            
        }
        .recipeCard > img {
            width:200px;
            height:200px;
        }
        ul {
            height: 50px;
        }
        ul.tagsList {
            /* flexbox tags */
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            font-family: 'Open Sans', sans-serif;
            list-style-type: none;
            /* white-space:nowrap; */
            color: white;
            font-weight: bold;
            padding-left: 0px;
            padding-bottom: 10px;
            padding-top: 3px;
            font-size: 15px;
            text-align: center;
            /* border-radius: 2cm; */
            overflow: hidden; 
        }
        li.individualTag {
            height: 40%;
            margin: 4px 10px;
            border-radius: 0.1cm;
            padding-left: 10px;
            padding-right: 10px;
            padding-top: 1px;
            padding-bottom: 2px;
            text-align: center;
            background-color: #FCAF58;
            display: inline;
        }
        .myRecipeCardGridContainer {
            background-color: #ededed;
        }
        `;

        const card = document.createElement("div");
        card.classList.add("recipeCard");

        const imageData = getImage(data);
        const image = document.createElement("img");
        image.href = imageData;

        // show placeholder image if imageData not availables
        image.src =
            imageData == null || typeof imageData == "object" || imageData == ""
                ? PLACEHOLDER_IMG
                : imageData;
        const imageErrorFunc = `this.onerror=null; this.src='${PLACEHOLDER_IMG}'`;
        image.onerror = (err) => {
            image.onerror = null;
            image.src = "./source/assets/Images/recipeCardPlaceholder.png";
        };
        image.style.borderRadius = "15px";

        // Grab the name
        const nameText = getName(data);
        const name = document.createElement("p");
        name.innerText = nameText;

        //Get tags
        const tagsData = getTags(data);
        const tags = document.createElement("div");
        tags.classList.add("tags");

        const tagsList = document.createElement("ul");
        tagsList.classList.add("tagsList");
        tagsList.setAttribute("id", "tag");
        if (tagsData) {
            for (let i = 0; i < tagsData.length; i++) {
                const individualTag = document.createElement("li");
                individualTag.classList.add("individualTag");
                individualTag.innerText = tagsData[i];
                tagsList.appendChild(individualTag);
            }
        }

        // Add all of the elements to the card
        if (tagsData) tags.appendChild(tagsList);
        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(tags);

        this.shadowRoot.append(style, card);
    }

    /**
     * Sets all the name of the recipe
     * @param {Object} name the name
     */
    set name(name) {
        this.name = name;
    }

    /**
     * Sets all the author of the recipe
     * @param {Object} authorID the author of recipe's ID
     */
    set authorID(authorID) {
        this.authorID = authorID;
    }

    /**
     * Sets all the date posted of the recipe
     * @param {Object} datePosted the date when recipe was posted
     */
    set datePosted(datePosted) {
        this.datePosted = datePosted;
    }

    /**
     * Sets the user's custom image
     * @param {Object} coverImage the image to replace placeholder
     */
    set coverImage(coverImage) {
        this.coverImage = coverImage;
    }

    /**
     * Sets the cooking time
     * @param {Object} cookingTime the time it'll take to cook recipe
     */
    set cookingTime(cookingTime) {
        this.cookingTime = cookingTime;
    }

    /**
     * Sets the difficulty
     * @param {Object} difficulty the recipe's difficulty
     */
    set difficulty(difficulty) {
        this.difficulty = difficulty;
    }

    /**
     * Sets all the tags of the recipe
     * @param {Object} tags the tags
     */
    set tags(tags) {
        this.tags = tags;
    }

    /**
     * Sets the ingredients of the recipe
     * @param {Object} ingredients the ingredients
     */
    set ingredients(ingredients) {
        this.ingredients = ingredients;
    }

    /**
     * Sets the ingredients amounts of the recipe
     * @param {Object} ingredients the ingredients amounts
     */
    set ingredientAmounts(ingredientAmounts) {
        this.ingredientAmounts = ingredientAmounts;
    }

    /**
     * Sets the steps of the recipe
     * @param {Object} steps the steps/instructions
     */
    set steps(steps) {
        this.steps = steps;
    }
    
    // GETTERS

    /**
     * Gets the name of the recipe
     * @return name of recipe
     */
    get name() {
        return this.name;
    }

    /**
     * Gets the author of the recipe
     * @return author of recipe's ID
     */
    get authorID() {
        return this.authorID;
    }

    /**
     * Gets the date posted of the recipe
     * @return date posted
     */
    get datePosted() {
        return this.datePosted;
    }

    /**
     * Gets the image of the recipe
     * @return cover image
     */
    get coverImage() {
        return this.coverImage;
    }

    /**
     * Gets the cooking time of the recipe
     * @return cooking time of recipe
     */
    get cookingTime() {
        return this.cookingTime;
    }

    /**
     * Gets the difficulty of the recipe
     * @return difficulty of recipe
     */
    get difficulty() {
        return this.difficulty;
    }

    /**
     * Gets the tags of the recipe
     * @return tags of recipe
     */
    get tags() {
        return this.tags;
    }

    /**
     * Gets the ingredients of the recipe
     * @return ingredients of recipe
     */
    get ingredients() {
        return this.ingredients;
    }

    /**
     * Gets the ingredient amounts of the recipe
     * @return ingredient amounts of recipe
     */
    get ingredientAmounts() {
        return this.ingredientAmounts;
    }

    /**
     * Gets the steps of the recipe
     * @return steps of recipe
     */
    get steps() {
        return this.steps;
    }

    /**
     * Gets the comments of the recipe
     * @return comments of recipe
     */
    get comments() {
        return this.comments;
    }

    /**
     * Gets the data of the recipe
     * @return json data of recipe
     */
    get data() {
        return this.json;
    }
    
    /**
     * Adds a tag to this.tags array
     * @param tag to be added
     */
    addTag(tag) {
        this.tags.push(tag);
    }

    /**
     * Removes a tag from this.tags array
     * @param tag to be removed
     */
    removeTag(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
    }

    /**
     * Adds a step to this.steps
     * @param step to be added
     * @param stepIndex the index to add it at
     */
    insertStep(step, stepIndex = this.steps.length) {
        this.steps.splice(stepIndex, 0, step);
    }

    /**
     * Removes a step
     * @param stepIndex the index of the step to be removed
     */
    removeStep(stepIndex) {
        this.steps.splice(stepIndex, 1);
    }
}

/**
 * Extract the name of the recipe from the given recipe schema JSON obejct
 * @param {Object} data Raw recipe JSON to find name
 * @returns {String} If found, returns the recipe title
 */
function getName(data) {
    if (data.name) return data.name;
    return null;
}

/**
 * Extract a usable image from the given recipe schema JSON object
 * @param {Object} data Raw recipe JSON to find the image of
 * @returns {String} If found, returns the URL of the image as a string, otherwise null
 */
function getImage(data) {
    if (data["image"]) return data["image"];
    else return null;
}

/**
 * Extract tags from the given recipe schema JSON object
 * @param {Object} data Raw recipe JSON to find tags
 * @returns {String} If found, returns tags as a array, otherwise null
 */
function getTags(data) {
    if (data.tags) return data.tags;
    else return null;
}


// export default RecipeClass;

customElements.define("recipe-card", RecipeClass);
