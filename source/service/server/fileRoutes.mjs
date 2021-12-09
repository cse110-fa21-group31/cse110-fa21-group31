async function routes(fastify, options) {
    fastify.get("/", function (req, reply) {
        // change GET from homePage to index
        return reply.sendFile("./index.html");
    });

    fastify.get("/recipe", async (request, reply) => {
        // change GET from homePage to index
        console.log(recipe)
        return reply.sendFile("./index.html");
    })
}

export default { routes };
