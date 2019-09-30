var express = require('express');
var router = express.Router();

router.use('/news',require('./news'));
router.use('/blog',require('./blog'));
router.use('/cafe',require('./cafe'));

router.get('/', (req, res) => {
    res.send('api index');
});

module.exports = router;