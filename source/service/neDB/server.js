
// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const port = process.env.PORT || 3030;
// Declare a route
fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
})


fastify.get('/api', async (request, reply) => {
    const fs = require('fs')
    const stream = fs.createReadStream('./index.html')
    reply.type('text/html').send(stream)
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