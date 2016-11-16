'use strict';

angular.module('serveApp')
  .service('RestPoi', function(Restangular) {
    return Restangular.service('poi');
  });
