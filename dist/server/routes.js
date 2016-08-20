/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  
  app.use('/api/configs', require('./api/config'));
  app.use('/api/qrcode',require('./api/qrcode'));
  app.use('/', require('./api/callback'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*').get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
