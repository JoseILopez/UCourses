/*
**    COURSE - DELETE
*/

const express = require('express');
const course = require('../models/course');
const utils = require('../../../Utilities/utilities');

const router = express.Router();

function remove(req, res) {
  const title = utils.processTitle(req.params.title);

  console.log(`REQUEST :: DELETE --- ${title}`);

  course.removeCourse(title)
        .then(code => res.sendStatus(code))
        .catch(err => console.log(err));
}

router.delete('/courses/:title', remove);

module.exports = router;
