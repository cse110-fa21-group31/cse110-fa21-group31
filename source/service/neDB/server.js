const Datastore = require("nedb");
// the following are "collection" object for the users, recipes, and tags tables
const RECIPE_DB_PATH = "source/service/.data/recipes";
const USER_DB_PATH = "source/service/.data/users";
const TAGS_DB_PATH = "source/service/.data/tags";
const recipeDB = new Datastore({ filename: RECIPE_DB_PATH, autoload: true });
const userDB = new Datastore({ filename: USER_DB_PATH, autoload: true });
const tagDB = new Datastore({ filename: TAGS_DB_PATH, autoload: true });
// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });

const port = process.env.PORT || 3030;

const dbInterface = require("./interface");

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
        reply.send(await dbInterface.getRecipeById(request.query.id, recipeDB));
    } else if (request.query.page) {
        reply.send(await dbInterface.getAllRecipe(recipeDB));
    }
});

fastify.post("/api", async (request, reply) => {
    if (!request.body.name || !request.body.author || !request.body.steps) {
        const err = new Error();
        err.statusCode = 400;
        err.message = "Request body missing required recipe information";
        reply.send(err);
    } else {
        reply.send(await dbInterface.createRecipe(request.body, recipeDB));
    }
});

fastify.put("/api", async (request, reply) => {
    if (
        !request.body.name ||
        !request.body.author ||
        !request.body.steps ||
        !request.body._id
    ) {
        const err = new Error();
        err.statusCode = 400;
        reply.send(err);
    } else {
        reply.send(
            await dbInterface.updateRecipe(
                request.body._id,
                request.body,
                recipeDB
            )
        );
    }
});

fastify.delete("/api", async (request, reply) => {
    reply.send(await dbInterface.deleteRecipe(request.query.id, recipeDB));
});

/****************** User APIs ************************/

// Get all data of one user by id
fastify.get("/api/user", async (req, reply) => {
    reply.status(200).send('GET username by id: ' + req.params.id);
});

// Get all data of one user by email, create new user if not existed
fastify.post("/api/user", async (req, reply) => {
    reply.status(200).send('POST username by email: ' + req.query.email);
});

// Add a recipe to savedRecipe for user by id
fastify.put("/api/user/saved", async (req, reply) => {
    reply.status(200).send('Add a recipe ' + req.query.recipeId + ' to savedRecipe for user by id: ' + req.query.userId);
});

// Delete a recipe from savedRecipe for user by id
fastify.delete("/api/user/saved", async (req, reply) => {
    reply.status(200).send('Delete a recipe ' + req.query.recipeId + ' from savedRecipe for user by id: ' + req.query.userId);
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
