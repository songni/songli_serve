/**
 * Main application file
 */

'use strict';

// Set default node environment to development

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
// Setup server
var app = express();
// app.use(function(req, res, next){
//   var env = app.get('env');
//  	if(req.protocol === 'http'&&req.hostname === 'www.91songli.com'){
//  	 	var url = 'https://'+req.hostname+req.url;
//     res.redirect(url);
//     return;
//   }
//   next();
// });
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('送你微信第三方平台以 %s 模式监听 %d 端口', app.get('env'), config.port);
});

// Expose app
exports = module.exports = app;
//# sourceMappingURL=app.js.map
