'use strict';

angular.module('serveApp')
  .service('RestDivision', function(Restangular) {
    return Restangular.service('division');
  });
