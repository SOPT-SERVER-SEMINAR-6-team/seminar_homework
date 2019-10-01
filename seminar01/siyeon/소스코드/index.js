var express = require('express');
var router = express.Router();

router.use('/api', require('./api'));

router.get('/', function(req, res, next) {
  res.send('솝트 서버 파트 1차 세미나 과제');
});


module.exports = router;
