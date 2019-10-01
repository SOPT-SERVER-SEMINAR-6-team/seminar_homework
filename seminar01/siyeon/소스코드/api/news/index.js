var express = require('express');
var router = express.Router();

router.use('/like', require('./like'));

router.get('/', function(req, res){
    res.send('news');
});

module.exports = router;