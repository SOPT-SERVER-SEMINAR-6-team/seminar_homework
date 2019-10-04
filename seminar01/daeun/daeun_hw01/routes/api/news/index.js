var express = require('express');
var router = express.Router();

router.use('/like',require('./like'));
router.get('/',(req,res) => {
    res.send('뉴스 입니다.');
});

module.exports = router;
