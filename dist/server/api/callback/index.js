'use strict';

var express = require('express');
var callback = require('./callback.controller');

var router = express.Router();

router.post('/callback', callback.component);
router.post('/:appid/callback', callback.pubno);

module.exports = router;
//# sourceMappingURL=index.js.map
