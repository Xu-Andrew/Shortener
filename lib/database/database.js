const config = require('../../config.js');

const MongoClient = require('mongodb').MongoClient;
const dbUrl = config.dbUrl;
const dbName = config.dbName;
const client = new MongoClient(dbUrl, {'useNewUrlParser': true});
const db = client.connect().then(
    (client) => {
        console.log('Connected to database');
        return client.db(dbName);
    },
    (err) => {
        console.error(err);
        client.close();
    }
);
const tb = db.then((db) => db.collection('urls'), (err) => console.error(err));

function findOne(query) {
    const cursor = tb.then((tb) => tb.find(query), (err) => console.error(err));
    const doc = cursor.then(
        (cursor) => {
            return cursor.hasNext().then((bool) => {
                if (bool) {
                    return cursor.next().then(
                        (res) => res,
                        (err) => console.error(err)
                    );
                } else {
                    console.error('No results found for', query);
                    //TODO: fix all this error handling to not term connection
                }
            })
        },
        (err) => console.error(err)
    );

    return doc;
};


function insertOne(obj) {
    tb.then(
        (tb) => {
            tb.insert([obj], (err, rec) => {
                if (err === null) {
                    console.log('Inserted', rec);
                } else {
                    console.error(err);
                }
            })
        },
        (err) => console.error(err)
    );
}



module.exports = {
    // create: null,
    // find: null,
    findOne: findOne,
    insertOne: insertOne,
    // update: null,
    // delete: null
};