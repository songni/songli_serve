'use strict';

angular.module('serveApp')
  .service('RestSuborder', function(Restangular) {
    return Restangular.service('gift/suborder');
  })
;
