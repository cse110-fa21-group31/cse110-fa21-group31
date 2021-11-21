// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
// const Datastore = require("nedb");
// the following are "collection" object for the users, recipes, and tags tables
// const RECIPE_DB_PATH = "../.data/recipes"
// const USER_DB_PATH = "../.data/users"
// const TAGS_DB_PATH = "../.data/tags"
// const recipeDB = new Datastore({ filename: RECIPE_DB_PATH, autoload: true });
// const userDB = new Datastore({ filename: USER_DB_PATH, autoload: true });
// const tagDB = new Datastore({ filename: TAGS_DB_PATH, autoload: true });

const port = process.env.PORT || 3030;
// Declare a route
fastify.get("/", async () => {
    // recipe = request.body

    return { hello: "world" };
});



// fastify.get("/api", async (_, reply) => {
//     const fs = require("fs");
//     const stream = fs.createReadStream("./index.html");
//     reply.type("text/html").send(stream);
// });

// Run the server!
const start = async () => {
    try {
        await fastify.listen(port);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
