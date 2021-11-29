import { getUser, hasUser, createUser, saveRecipe, unsaveRecipe } from "./userInterface.mjs";
import { createRecipe, deleteRecipe, updateRecipe, getRecipeByPage, getRecipesByNameAndTags, getRecipeById, getRecipesByIds } from "./interface.mjs";
import Datastore from "nedb";
import path from 'path'
import fs from "fs";
import fstatic from 'fastify-static'
// the following are "collection" object for the users, recipes, and tags tables
const USER_DB_PATH = "source/service/.data/users";
export const userDB = new Datastore({ filename: USER_DB_PATH, autoload: true });
const RECIPE_DB_PATH = "source/service/.data/recipes"
export const recipeDB = new Datastore({ filename: RECIPE_DB_PATH, autoload: true });

// correct dir name of current repo: CSE110-FA21-GROUP31
const __dirname = path.normalize(path.resolve());

// Require the framework and instantiate it
import Fastify from 'fastify';
const fastify = Fastify({ logger: true });

import fileRoutes from "./fileRoutes.js"
fastify.register(fileRoutes.routes)
fastify.register(fstatic, {
    root: __dirname,
    //prefix: '/public/', // optional: default '/'
})

// import the dependency for file transfer and buffer
import multipart from 'fastify-multipart';
fastify.register(multipart);

// const path = require('path')
import Cors from 'fastify-cors';
fastify.register(Cors, {
    origin: true,
    methods: ['GET', 'PUT', 'POST', 'DEL']
})
const port = process.env.PORT || 3030;



/*
fastify.get("/api", async (_, reply) => {
    const fs = require("fs");
    const stream = fs.createReadStream("./index.html");
    reply.type("text/html").send(stream);
});
*/

fastify.get("/api", async (request, reply) => {
    if (request.query.id) {
        const recipe = await getRecipeById(request.query.id, recipeDB)
        // console.log(recipe);
        reply.send(await getRecipeById(request.query.id, recipeDB));
    } else if (request.query.page) {
        reply.send(await getRecipeByPage(recipeDB, request.query.page));
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
        // TODO: pass in cloudinary and fs here, switch to export later
        reply.send(await createRecipe(body, recipeDB));
    }
});

fastify.put("/api", async (request, reply) => {
    let body = JSON.parse(request.body)
    if (!body.name ||
        !body.author ||
        !body.steps ||
        !body._id
    ) {
        const err = new Error();
        err.statusCode = 400;
        reply.send(err);
    } else {
        let response = await updateRecipe(
            body._id,
            body,
            recipeDB
        );
        // console.log(response);
        reply.send(response);
        /*
        reply.send(
            await updateRecipe(
                body._id,
                body,
                recipeDB
            )
        );
        */
    }
});

fastify.get('/api/search', async (request, reply) => {
    let data = await getRecipesByNameAndTags(request.query, recipeDB);
    reply.status(200).send(data);
})

fastify.delete('/api', async (request, reply) => {
    let id = request.query.id;
    let data = await deleteRecipe(id, recipeDB);
    reply.status(200).send(data);
})

/*
fastify.delete("/api", async (request, reply) => {
    console.log(request.query)
    reply.send(await deleteRecipe(request.query.id, recipeDB));

});
*/
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
    let body = JSON.parse(req.body)
    let data = await hasUser(userDB, req.query.email);
    if (!data) {
        data = await createUser(userDB, body);
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
    // console.log("SAVE RECIPE: Number of document updated: " + numUpdated);
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
    // console.log("UNSAVE RECIPE: Number of document updated: " + numUpdated);
    reply.status(200).send(data);
});

/**
 * Upload an image to service/.data/images folder and return image url.
 * content-type: multipart/form-data
 * body: key: file value: [File]
 */
fastify.post("/api/imageUpload", async (request, reply) => {
    // Convert file to buffer for write
    let file = await request.file();
    // console.log(file);
    let fileBuffer = await file.toBuffer();
    // Generate file path
    let filePath = '/source/service/.data/images/';
    let fileName = file.filename;
    while(fs.existsSync(__dirname + filePath + fileName)){
        fileName = "1" + fileName;
    }
    filePath = filePath + fileName;
    // Write to file
    await fs.writeFile(__dirname + filePath, fileBuffer, 'base64', function (err) {
        if(err){
            console.log(err);
        }
    }); 
    // Return file path
    let data = { path: filePath };
    reply.status(200).send(data);

});

// Run the server!
const start = async () => {
    try {
        await fastify.listen(port);
    } catch (err) {
        fastify.log.error(err);
        console.log(err);
        process.exit(1);
    }
};
start();