// import { fetchRecipes } from "./interface.js";

const { ConsoleMessage } = require('puppeteer');

const dbInterface = require('./interface')


// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const port = process.env.PORT || 3030;

// Declare a route
fastify.get('/', async (request, reply) => {
    reply.type('text/html').send({ hello: 'world' });
})


fastify.get('/api', async (request, reply) => {
    const fs = require('fs');
    const stream = fs.createReadStream('./index.html');
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log(request.query);
    console.log(typeof(request.query));
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    reply.type('text/html').send(stream);
})


fastify.get('/api/search', async (request, reply) => {
    results = await dbInterface.getRecipesByNameAndTags(request.query);

    console.log(results);

    reply.type('application/json').send(results);
})

// Run the server!
const start = async () => {
    try {
        await fastify.listen(port)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()