/*
**    COURSE - GET
*/
const express = require('express');
const course = require('../models/course');
const utils = require('../../../Utilities/utilities');

const router = express.Router();


function getAll(req, res) {
  console.log('REQUEST :: GET ALL');

  course.getAll()
        .then(data => res.send(data))
        .catch(err => console.log(err));
}

function getOne(req, res) {
  const title = utils.processTitle(req.params.title);

  console.log(`REQUEST :: GET --- ${title}`);

  course.getCourse(title)
        .then((data) => { utils.handleResponse(res, data); })
        .catch(err => console.log(err));
}

router.get('/courses', getAll);
router.get('/courses/:title', getOne);

module.exports = router;
