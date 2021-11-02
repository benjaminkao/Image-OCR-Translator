var express = require('express');
var router = express.Router();

const services = require('../services/index.js');

/* GET home page. */
router.get('/users', function(req, res, next) {
  console.log('get "users" route hit');
  res.send({ users: ["joe", "bernie", "tulsi", "donald", "bill"] });
});

module.exports = router;
