'use strict';

angular.module('serveApp')
  .service('RestWorker', function (Restangular) {
    return Restangular.service('worker');
  })
;
