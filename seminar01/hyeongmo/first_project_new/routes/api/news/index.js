var express = require('express');
var router = express.Router();

router.use('/like',require('./like'));

router.get('/', (req, res) => {
    res.send('news index');
});

module.exports = router;