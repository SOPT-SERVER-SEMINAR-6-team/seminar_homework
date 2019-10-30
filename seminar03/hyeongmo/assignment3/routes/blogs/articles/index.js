const express = require('express');
const router = express.Router({mergeParams: true});

router.use('/:articleIdx/comments', require('./comments'));
router.use('/', require('./article'));

module.exports = router;
