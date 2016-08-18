'use strict';

var express = require('express');
var controller = require('./qrcode.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/download', controller.download);

module.exports = router;
