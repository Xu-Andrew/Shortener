const config = require('../../config.js');

const MongoClient = require('mongodb').MongoClient;
const dbUrl = config.dbUrl;
const dbName = config.dbName;
const client = new MongoClient(dbUrl, {'useNewUrlParser': true});

client.connect((err, client) => {
    if (err === null) {
        console.log('Connected to database');
        const db = client.db(dbName);
        module.exports = db;
    } else {
        console.log('DATABASE ERROR:', err);
    }
});
