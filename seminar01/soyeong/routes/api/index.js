var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/news',require('./news'));
router.use('/blog',require('./blog'));
router.use('/cafe',require('./cafe'));
router.get('/', function(req, res, next) {
    res.send('this page is not supported');
});

module.exports = router;
