const config = require('../../config');
const port = config.port;

const express = require('express');
const app = express();

const https = require('https');

const db = require('../database/database');

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/:local', (req, res) => {
    //TODO: verify url integrity?

    db.findOne({'local': parseInt(req.params.local)}).then(
            (doc) => {
                const url = doc.remote;
                if (url === null) {
                    res.send('Missing or broken link!');
                } else {
                    res.redirect(url);
                }
                console.log(doc);
            },
            (err) => res.send(err)
        );
});

app.post('/crumb', (req, res) => {
    if ('url' in req.query) {

        res.send('success');
    } else {
        res.send('Missing URL Parameter!');
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


module.exports = app;