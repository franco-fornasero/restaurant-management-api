const express = require('express');

const {testController} = require('../controllers/testController');

const router = express.Router();

router.get('/agua', testController);

module.exports = router;