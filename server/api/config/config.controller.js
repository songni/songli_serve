'use strict';

var _ = require('lodash');
var config = require('../../config/environment');

exports.index = function(req, res) {
  res.json(config.api);
};
