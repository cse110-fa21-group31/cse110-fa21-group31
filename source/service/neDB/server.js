// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const Datastore = require("nedb");
// const { RECIPE_DB_PATH, USER_DB_PATH } = require("../util");
const RECIPE_DB_PATH = "../.data/recipes"
const USER_DB_PATH = "../.data/users"
const TAGS_DB_PATH = "../.data/tags"
const recipeDB = new Datastore({ filename: RECIPE_DB_PATH, autoload: true });
const userDB = new Datastore({ filename: USER_DB_PATH, autoload: true });
const tagDB = new Datastore({ filename: TAGS_DB_PATH, autoload: true });

const port = process.env.PORT || 3030;
// Declare a route
fastify.get("/", async () => {
    // recipe = request.body

    return { hello: "world" };
});

fastify.get("/api", async (req, res) => {
    console.log(req.query)
    if (req.query.page) {
        console.log("page:" + req.query.page)
        getAllRecipe(recipeDB)
    }

    // var celia = {
    //     name: "celia",
    //     twitter: "@celiaxiao",
    // };
    // id = ""
    // userDB.insert(celia, function (err, doc) {
    //     if (!err) {
    //         console.log("Inserted", doc.name, "with ID", doc._id);
    //         id = doc._id;
    //     }
    // });
    res.send(id)
})

fastify.post("/api", async (req, res) => {
    console.log(req.body)
    // console.log(JSON.parse(req.body))
    return { recipe: req.body.name }
})

// fastify.get("/api", async (_, reply) => {
//     const fs = require("fs");
//     const stream = fs.createReadStream("./index.html");
//     reply.type("text/html").send(stream);
// });

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
