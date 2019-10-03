var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('뉴스 LIKE 입니다');
});

module.exports = router;
