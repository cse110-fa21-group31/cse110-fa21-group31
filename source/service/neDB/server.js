// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const Datastore = require("nedb");
const interface = require("./interface")
// const path = require('path')
const Cors = require('fastify-cors')
fastify.register(Cors, {
    origin: true
})

// the following are "collection" object for the users, recipes, and tags tables
const RECIPE_DB_PATH = "source/service/.data/recipes"
// const USER_DB_PATH = "source/service/.data/users"
// const TAGS_DB_PATH = "source/service/.data/tags"
const recipeDB = new Datastore({ filename: RECIPE_DB_PATH, autoload: true });
// const userDB = new Datastore({ filename: USER_DB_PATH, autoload: true });
// const tagDB = new Datastore({ filename: TAGS_DB_PATH, autoload: true });

const port = process.env.PORT || 3030;
// Declare a route
fastify.get("/", async () => {
    // recipe = request.body

    return { hello: "world" };
});

fastify.get("/api", async (req, reply) => {
    req.header
    let recipe = {}
    if (req.query.id) {
        recipe = await interface.getRecipeById(recipeDB, req.query.id)
    }
    console.log(recipe)
    reply.send(recipe);
    return recipe
});

fastify.post("/api", async (request, reply) => {
    // console.log(JSON.parse(request.body))
    console.log(request.body.name, request.body.author, request.body.steps)

    reply.send({ hello: "world" });

})
fastify.get("/home_page", async (_, reply) => {
    const fs = require("fs");
    const stream = fs.createReadStream("./source/pages/homePage.html");
    reply.type("text/html").send(stream);
});

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
