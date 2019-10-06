var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.send('news/like입니다.'); 
});

module.exports = router;
