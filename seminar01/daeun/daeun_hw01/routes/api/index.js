var express = require('express');
var router = express.Router();


router.use('/cafe',require('./cafe'));
router.use('/blog',require('./blog'));
router.use('/news',require('./news'));
router.get('/',(req,res) => {
    res.send('not supported');
});

module.exports = router;
