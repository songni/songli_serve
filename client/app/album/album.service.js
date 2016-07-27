'use strict';

angular.module('serveApp')
  .service('RestAlbum', function(Restangular) {
    return Restangular.service('album');
  });
