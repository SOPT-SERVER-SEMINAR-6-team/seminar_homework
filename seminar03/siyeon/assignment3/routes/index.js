var express = require('express');
var router = express.Router();

router.use('/blogs', require('./blogs'));

module.exports = router;
