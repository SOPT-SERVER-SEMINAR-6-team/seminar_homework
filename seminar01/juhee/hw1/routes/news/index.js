var express = require('express');
var router = express.Router();

router.use('/like',require('./like'));

router.get('/', (req, res) => {
    res.send('뉴스입니다.'); // 해당제목을 가지는
  });
  
module.exports = router;