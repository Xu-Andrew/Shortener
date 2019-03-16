const config = require('../../config');
const host = config.host;
const port = config.port;

const express = require('express');
const app = express();

const https = require('https');

const db = require('../database/database');

app.use(express.static('public'));

// Short url redirect
app.get('/s/:local', (req, res) => {
    //TODO: verify url safety?

    const local = parseInt(req.params.local);
    if isNaN(local) {
        res.status(400).send('Invalid link');
    } else {
        db.findOne({'local': local}).then(
                (doc) => {
                    if (doc === null) {
                        res.status(400).send('Missing or broken link!');
                    } else {
                        const url = doc.remote;
                        res.redirect(url);
                    }
                },
                (err) => res.status(400).send(err));
    }
});

// Generate short url
app.post('/crumb', (req, res) => {
    //TODO: verify url integrity?
    if ('url' in req.query) {
        const url = decodeURIComponent(req.query.url);
        db.count().then(
            (count) => {
                db.insertOne({local: count, remote: url}).then(
                    (rec) => {
                        const crumb = 'http://' + host + ':' + port + '/s/' + count;
                        res.json({'local': crumb, 'remote': url});
                    },
                    (err) => res.status(400).json({'error': 'Could not generate url'}));
            },
            (err) => res.status(400).json({'error': 'Could not generate url'}));
    } else {
        res.status(400).send('Missing URL Parameter!');
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


module.exports = app;