const Datastore = require("nedb");
const recipeCollection = new Datastore({ filename: "source/service/data/recipes", autoload: true});
const userCollection = new Datastore({ filename: "source/service/data/users", autoload: true}); 
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

<<<<<<< HEAD
/*
fastify.get("/api", async (_, reply) => {
    const fs = require("fs");
    const stream = fs.createReadStream("./index.html");
    reply.type("text/html").send(stream);
});
*/

fastify.get("/api", async (request, reply) => {
    if (request.query.id) {
        reply.send(getRecipeById(request.query.id, recipeCollection));
    }
    else if (request.query.page) {
        reply.send(getAllRecipe());
    }
});

fastify.post("/api", async (request, reply) => {
    if (!request.body.name || !request.body.author ||!request.body.steps) {
        const err = new Error();
        err.statusCode = 400;
        reply.send(err);
    }
    else {
        reply.send(createRecipe(request.body, recipeCollection));
    }
});

fastify.put("/api", async (request, reply) => {
    if (!request.body.name || !request.body.author ||!request.body.steps) {
        const err = new Error();
        err.statusCode = 400;
        reply.send(err);
    }
    else {
        reply.send(updateRecipe(req.body.id, req.body, recipeCollection));
    }
});

fastify.delete("/api", async (request, reply) => {
    reply.send(deleteRecipe(req.query.id, recipeCollection));
});
=======


// fastify.get("/api", async (_, reply) => {
//     const fs = require("fs");
//     const stream = fs.createReadStream("./index.html");
//     reply.type("text/html").send(stream);
// });
>>>>>>> 8958da98d7e7b228fbc02be4b21cae62e94a83f7

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
