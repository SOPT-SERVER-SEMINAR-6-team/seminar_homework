var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/like',require('./like'));
router.get('/', function(req, res, next) {
    res.send('뉴스입니다');
});

module.exports = router;
