var express = require('express');
var router = express.Router();

router.use('/cafe', require('./cafe'));
router.use('/blog', require('./blog'));
router.use('/news', require('./news'));

router.get('/', function(req, res){
    res.send('api index');
});

module.exports = router;
