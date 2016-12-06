'use strict';

angular.module('serveApp')
  .service('RestUser', function (Restangular) {
    return Restangular.service('user');
  });
