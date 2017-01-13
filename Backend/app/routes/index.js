/*
**    API - Index
*/

const express = require('express');
const env = require('../../config/env');

const router = express.Router();

// Redirects to the frontEnd URL

function sendIndex(req, res) {
  res.redirect(env.FRONTEND);
}


router.get('/', sendIndex);


module.exports = router;
