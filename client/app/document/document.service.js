'use strict';

angular.module('serveApp')
  .service('RestDoc', function (Restangular) {
    return Restangular.service('document');
  });
