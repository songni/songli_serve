'use strict';

angular.module('serveApp')
  .service('RestCate', function (Restangular) {
    return Restangular.service('cate');
  })
;
