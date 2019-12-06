const express = require('express');
const router = express.Router();

router.use('/', require('./signup'));

module.exports = router;
