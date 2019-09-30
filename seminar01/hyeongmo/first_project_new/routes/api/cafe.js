var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send('카페 입니다.');
});

module.exports = router;
