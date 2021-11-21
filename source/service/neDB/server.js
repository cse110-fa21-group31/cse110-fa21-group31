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
    let results = []
    if(request.query.id){
        results = await dbInterface.getRecipeById(request.query.id);
    }
    else if(request.query.page){
        // TODO: Figure out how to handle page requests
    }
    else {
        throw Error("Invalid API request! No page or id found");
    }
    reply.type('application/json').send(results);
})


fastify.get('/api/search', async (request, reply) => {
    let results = await dbInterface.getRecipesByNameAndTags(request.query);
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