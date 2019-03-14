const config = require('../../config');
const port = config.port;
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/crumb', (req, res) => {
    if ('url' in req.query) {

        // res.contentType('application/json');
        res.send('success');
    } else {
        res.send('Missing URL Parameter!');
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;