const config = require('../../config.js');
const dbUrl = config.dbUrl;
const dbName = config.dbName;

const mongoose = require('mongoose');
mongoose.connect(dbUrl + '/' + dbName, {'useNewUrlParser': true});
// const db = mongoose.connection;


const urlsSchema = new mongoose.Schema({
    local: String,
    remote: String
});

const Urls = mongoose.model('Urls', urlsSchema);

function findOne(query) {
    return Urls.findOne(query).exec();
}

function insertOne(obj) {
    const url = new Urls(obj);
    return url.save();
}

function count() {
    return Urls.countDocuments().exec();
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