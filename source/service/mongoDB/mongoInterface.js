
// https://www.mongodb.com/developer/quickstart/node-crud-tutorial/

const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";

class MongoInterface {
    constructor() {
        this.client = new MongoClient(url);
        await this.client.connect();
    }

    close(){
        await this.client.close();
    }

    createListing(newListing){
        const result = await this.client.db("sample").collection("recipes").insertOne(newListing);
        console.log(result);
    }
    
    createMultipleRecipes(newListings){
        const result = await this.client.db("sample").collection("recipes").insertMany(newListings);
        console.log(result);
    }
    
    findRecipeByName(nameOfRecipe) {
        const result = await this.client.db("sample").collection("recipes").findOne({ name: nameOfRecipe });
        if (result) {
            console.log(`Found a listing in the collection with the name '${nameOfRecipe}':`);
            console.log(result);
        } else {
            console.log(`No listings found with the name '${nameOfRecipe}'`);
        }
    }
    
    findRecipes({
        maximumNumberOfResults = Number.MAX_SAFE_INTEGER
    } = {}) {
        const cursor = this.client.db("sample").collection("recipes").find(
                                {
                                    // bedrooms: { $gte:  minimumNumberOfBedrooms },
                                    // bathrooms: { $gte: minimumNumberOfBathrooms }
                                }
                                ).sort({ last_review: -1 })
                                .limit(maximumNumberOfResults);
        const results = await cursor.toArray();
        if (results.length > 0) {
            console.log(`Found recipes`);
            results.forEach((result, i) => {
                console.log(`${i + 1}. name: ${result.name}`);
            });
        } else {
            console.log(`No recipes found according to search criteria`);
        }
    }
}
