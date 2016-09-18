'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = require('../../config/environment');
var request = require('request');
var path = require('path');
var headers = {
  'X-API-From': config.api.from,
  'X-Component': config.api.component
};
request = request.defaults({ headers: headers });
request.debug = false;

exports.component = function (req, res) {
  var options = {
    url: config.api.uri + "/wechat/component/callback",
    qs: req.query,
    body: req.body
  };
  delete headers['X-APPID'];
  request.post(options, function (error, response, body) {
    if (error) console.error('com_call_error', error);
    console.log('com_call_body', body);
    res.send(body);
  });
};
exports.pubno = function (req, res) {
  var url = config.api.uri + '/callback/' + path.join(req.params.appid, "/pubno");
  var options = {
    url: url,
    qs: req.query,
    body: req.body
  };
  console.log("callback.controller.js pubno req.params " + (0, _stringify2.default)(req.params));
  headers['X-APPID'] = req.params.appid;
  request = request.defaults({ headers: headers });
  request.post(options, function (error, response, body) {
    if (error) console.error('pubno_call_error', error);
    console.log('pubno_call_body', body);
    res.send(body);
  });
};
//# sourceMappingURL=callback.controller.js.map
