/*
**    COURSE - POST
*/

const express = require('express');
const course = require('../models/course');
const utils = require('../../../Utilities/utilities');

const router = express.Router();

function post(req, res) {
  const title = utils.processTitle(req.body.title);
  const author = req.body.author;
  const description = req.body.description;
  const tags = req.body.tags;

  const payload = {
    title,
    author,
    description,
    tags,
  };

  console.log(`REQUEST :: POST --- ${title}`);

  course.validateCourse(payload)
        .then(course.tryAddCourse)
        .then((doc) => { utils.handleResponse(res, doc); })
        .catch(err => console.log(err));
}

router.post('/courses', post);

module.exports = router;
