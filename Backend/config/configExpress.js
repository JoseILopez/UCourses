/*
**    EXPRESS Configuration
*/

const cors = require('cors');
const bodyParser = require('body-parser');

const indexRoute = require('../app/routes/index');
const courseGet = require('../app/routes/courseGET');
const coursePost = require('../app/routes/coursePOST');
const courseDelete = require('../app/routes/courseDELETE');
const coursePut = require('../app/routes/coursePUT');
const coursePurge = require('../app/routes/coursePURGE');

// Routing

function configExpress(app) {
  app.use(cors());

  app.use(bodyParser.json());

  app.use('/', indexRoute);
  app.use('/api', courseGet);
  app.use('/api', coursePost);
  app.use('/api', courseDelete);
  app.use('/api', coursePut);
  app.use('/api', coursePurge);
}


module.exports = configExpress;
