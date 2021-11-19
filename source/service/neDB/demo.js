var Datastore = require('nedb');
var db = new Datastore({ filename: 'data/demo' });
const demo2 = new Datastore({ filename: 'data/demo2', autoload: true })
db.loadDatabase(function (err) {
    // Start issuing commands after callback...
});

var celia = {
    name: 'celia',
    twitter: '@celiaxiao'
};

demo2.insert(celia, function (err, doc) {
    console.log('Inserted', doc.name, 'with ID', doc._id);
});

db.findOne({ twitter: '@ScottWRobinson' }, function (err, doc) {
    console.log('Found user:', doc.name);
});