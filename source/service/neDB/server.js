const Datastore = require("nedb");
const recipeCollection = new Datastore({ filename: "source/service/data/recipes", autoload: true});
const userCollection = new Datastore({ filename: "source/service/data/users", autoload: true}); 
// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const port = process.env.PORT || 3030;

// Declare a route
fastify.get("/", async () => {
    // recipe = request.body

    return { hello: "world" };
});

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
