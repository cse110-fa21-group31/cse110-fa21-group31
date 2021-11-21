var Datastore = require("nedb");
var db = new Datastore({ filename: "data/demo" });
const demo2 = new Datastore({ filename: "data/demo2", autoload: true });
db.loadDatabase(function (err) {
    // Start issuing commands after callback...
    if (!err) {
        console.log("Loaded database");
    }
});

var celia = {
    name: "celia",
    twitter: "@celiaxiao",
};

demo2.insert(celia, function (err, doc) {
    if (!err) {
        console.log("Inserted", doc.name, "with ID", doc._id);
    }
});

db.findOne({ twitter: "@ScottWRobinson" }, function (err, doc) {
    if (!err) {
        console.log("Found user:", doc.name);
    }
});
