/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function (app) {

  // Insert routes below
  app.use('/api/configs', require('./api/config'));
  app.use('/api/qrcode', require('./api/qrcode'));
  app.use('/', require('./api/callback'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(errors[404]);

  // All other routes should redirect to the index.html
  // app.route('/*').get(function(req, res) {
  //     res.sendfile(app.get('appPath') + '/index.html');
  //   });
  var arrT = {
    'www.dev.songni.cc': '91送礼开发版',
    'www.91songli.cc': '91送礼-微信送礼营销工具',
    'www.91songli.com': '91送礼-微信送礼营销工具',
    'www.dalibao.com': '大礼包'
  };
  app.route('/index').get(function (req, res) {
    res.render('index', {
      'title': arrT[req.hostname],
      'layout': 'index'
    });
  });
  app.route('/price').get(function (req, res) {
    res.render('index', {
      'title': arrT[req.hostname],
      'layout': 'price'
    });
  });
  app.route('/academy').get(function (req, res) {
    res.render('index', {
      'title': arrT[req.hostname],
      'layout': 'academy'
    });
  });
  app.route('/agent').get(function (req, res) {
    res.render('index', {
      'title': arrT[req.hostname],
      'layout': 'agent'
    });
  });
  app.route('/*').get(function (req, res) {
    res.render('index', {
      'title': arrT[req.hostname],
      'layout': 'index'
    });
  });
};
//# sourceMappingURL=routes.js.map
