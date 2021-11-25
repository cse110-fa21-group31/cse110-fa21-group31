import { getUser, hasUser, createUser, saveRecipe, unsaveRecipe } from "./userInterface.mjs";
import { createRecipe, deleteRecipe, updateRecipe, getAllRecipe,getRecipesByNameAndTags, getRecipeById, getRecipesByIds } from "./interface.mjs";
import Datastore from "nedb";
// the following are "collection" object for the users, recipes, and tags tables
const USER_DB_PATH = "source/service/.data/users";
const userDB = new Datastore({ filename: USER_DB_PATH, autoload: true });
const RECIPE_DB_PATH = "source/service/.data/recipes"
const recipeDB = new Datastore({ filename: RECIPE_DB_PATH, autoload: true });

// Require the framework and instantiate it
import Fastify from 'fastify';
const fastify = Fastify({ logger: true });

// const path = require('path')
import Cors from 'fastify-cors';
fastify.register(Cors, {
    origin: true
})

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
        reply.send(await getRecipeById(request.query.id, recipeDB));
    } else if (request.query.page) {
        reply.send(await getAllRecipe(recipeDB));
    }
});

fastify.post("/api", async (request, reply) => {
    // console.log(JSON.parse(request.body))
    let body = JSON.parse(request.body)
    if (!body.name || !body.author || !body.steps) {
        const err = new Error();
        err.statusCode = 400;
        err.message = "Request body missing required recipe information";
        reply.send(err);
    } else {
        reply.send(await createRecipe(body, recipeDB));
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
            await updateRecipe(
                request.body._id,
                request.body,
                recipeDB
            )
        );
    }
});

fastify.delete("/api", async (request, reply) => {
    reply.send(await deleteRecipe(request.query.id, recipeDB));
});

/****************** User APIs ************************/

/**
 * Get all data of one user by id.
 *
 * req.query.id: the id to search for.
 * reply: user json if found, 404 if not found.
 */
fastify.get("/api/user", async (req, reply) => {
    let data = await getUser(userDB, req.query.id);
    if (data == null) {
        reply
            .status(404)
            .send("ERROR: no user with id " + req.query.id + " exists. ");
    } else {
        reply.status(200).send(data);
    }
});

/**
 * Get all data of one user by email, create new user if not existed.
 *
 * req.query.email: the id to search for.
 * req.body: the json of user data to create new user.
 * NOTE: req.query.email and req.body.email MUST be the same!
 * reply: user json.
 */
fastify.post("/api/user", async (req, reply) => {
    // check if user exists. false if not.
    let data = await hasUser(userDB, req.query.email);
    if (!data) {
        data = await createUser(userDB, req.body);
    }
    reply.status(200).send(data);
});

/**
 * Add a recipe to savedRecipe for user by id
 *
 * req.query.recipeId: the recipe id to save to savedRecipe.
 * req.query.userId: the user id to save the recipe into.
 * reply: user json.
 */
fastify.put("/api/user/saved", async (req, reply) => {
    let numUpdated = await saveRecipe(
        userDB,
        req.query.userId,
        req.query.recipeId
    );
    let data = await getUser(userDB, req.query.userId);
    console.log("SAVE RECIPE: Number of document updated: " + numUpdated);
    reply.status(200).send(data);
});

/**
 * Remove a recipe from savedRecipe for user by id
 *
 * req.query.recipeId: the recipe id to remove from savedRecipe.
 * req.query.userId: the user id to remove the recipe from.
 * reply: user json.
 */
fastify.delete("/api/user/saved", async (req, reply) => {
    let numUpdated = await unsaveRecipe(
        userDB,
        req.query.userId,
        req.query.recipeId
    );
    let data = await getUser(userDB, req.query.userId);
    console.log("UNSAVE RECIPE: Number of document updated: " + numUpdated);
    reply.status(200).send(data);
});


fastify.get('/api/search', async (request, reply) => {
    let data = await getRecipesByNameAndTags(request.query, recipeDB);
    reply.status(200).send(data);
})

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