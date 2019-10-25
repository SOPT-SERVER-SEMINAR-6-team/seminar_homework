var express = require('express');
var router = express.Router();

router.use('/group', require('./group'));

router.get('/', (req, res) => {
    res.send('group index');
});

module.exports = router;