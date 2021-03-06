/**
 * Express configuration
 */

'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');

module.exports = function(app) {
    var env = app.get('env');
    app.set('views', config.root + '/client');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(compression());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.raw({
        type: 'text/xml'
    }))
    app.use(methodOverride());
    app.use(cookieParser());

    if ('production' === env) {
        app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
        app.set('appPath', config.root + '/client');
        app.use(morgan('dev'));
    }

    if ('development' === env || 'test' === env) {
        if (config.livereload) {
            app.use(require('connect-livereload')({
                port: 35711
            }));
        }
        app.use(express.static(path.join(config.root, '.tmp'), {index: false}));
        app.set('appPath', 'client');
        app.use(morgan('dev'));
        app.use(errorHandler()); // Error handler - has to be last
    }
    app.use(express.static(app.get('appPath'), {index: false}))
};
