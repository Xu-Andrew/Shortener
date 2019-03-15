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
    return tb.then(
        (tb) => {
            tb.insertOne(obj, (err, rec) => {
                if (err === null) {
                    console.log('Inserted' + rec);
                    return rec;
                } else {
                    console.error(err);
                    return err;
                }
            })
        },
        (err) => {console.error(err); return err}
    );
}

function count() {
    const count = tb.then((tb) => {return tb.countDocuments()}, (err) => console.error(err));
    count.then((c) => console.log(c), (e) => 1);
    return count;
}

module.exports = {
    // create: null,
    // find: null,
    findOne: findOne,
    insertOne: insertOne,
    count: count,
    // update: null,
    // delete: null
};