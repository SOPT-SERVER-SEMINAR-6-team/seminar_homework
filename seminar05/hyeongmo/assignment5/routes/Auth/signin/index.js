const express = require('express');
const router = express.Router();

router.use('/', require('./signin'));

module.exports = router;
