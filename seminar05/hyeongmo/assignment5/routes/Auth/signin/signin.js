var express = require('express');
var router = express.Router();
const jwt = require('../../../module/jwt');

router.post('/', (req, res) => { 
    const {token} = req.headers; 
    const result = jwt.verify(token); 
    if(result == -1) {
        res.send('EXPIRED_TOKEN');
    }
    if(result == -2) {
        res.send('INVALID_TOKEN');
    }
    res.json(result);
    });

module.exports = router;