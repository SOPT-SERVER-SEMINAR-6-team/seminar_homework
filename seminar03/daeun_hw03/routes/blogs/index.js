var express = require('express');
var router = express.Router();

router.use('/',require('./blogs'));

module.exports = router;
