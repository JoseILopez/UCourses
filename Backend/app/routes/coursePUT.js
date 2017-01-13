/*
**    COURSE - PUT
*/

const express = require('express');
const course = require('../models/course');
const utils = require('../../../Utilities/utilities');

const router = express.Router();

function put(req, res) {
  const title = utils.processTitle(req.params.title);
  const author = req.body.author;
  const description = req.body.description;
  const tags = req.body.tags;

  const payload = {
    title,
    author,
    description,
    tags,
  };

  console.log(`REQUEST :: PUT --- ${title}`);

  course.modifyCourse(payload)
        .then(code => res.sendStatus(code))
        .catch(err => console.log(err));
}

router.put('/courses/:title', put);

module.exports = router;
