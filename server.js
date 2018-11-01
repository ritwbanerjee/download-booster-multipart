'use strict';
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors');
const request = require('request');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/getHead', (req, res) => {
    request(req.body.url,
      {
        method: 'HEAD'
    }, (error, response, body) => {

      if (!error) {
        res.json(response.headers);
      } else {
        res.status(500).send({ error: 'Something failed!' })
      }
    });
});

app.listen(port, function () {
    console.log('Our app is running on http://localhost:' + port);
});
