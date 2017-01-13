/*
**    DATABASE CONNECTION
*/

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

function connect(path) {
  mongoose.connect(path, null);
  mongoose.connection.on('error', (err) => { console.log(err); });
  console.log(`DATABASE :: Connected to database at ${path}`);
}

module.exports = connect;
