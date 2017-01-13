/*
**    COURSE - PURGE
*/

const express = require('express');
const course = require('../models/course');

const router = express.Router();

function init(req, res) {
  console.log('REQUEST :: PURGE');

  course.initDB()
        .then(code => res.sendStatus(code))
        .catch(err => console.log(err));
}

router.purge('/courses', init);

module.exports = router;
