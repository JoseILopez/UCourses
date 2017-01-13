/*
**    SERVER
*/
const express = require('express');
const configExpress = require('./config/configExpress');
const env = require('./config/env');
const dbConnect = require('./db/connection');

const port = process.env.PORT || env.port;

// Connect to DB

dbConnect(env.DB);

// Start server

const app = express();

/*
**    DEBUG: Fake delay
*/

const delay = 1500;

app.use(function (req, res, next) {
  setTimeout(next, delay)
});

console.log(`DEBUG :: SERVER HAS FAKE DELAY OF ${delay}`);

//    END OF DEBUG

configExpress(app);

app.listen(port);

console.log(`Starting server on PORT:  ${port}`);
