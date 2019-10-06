var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send('카페입니다.'); // 해당제목을 가지는
});

module.exports = router;