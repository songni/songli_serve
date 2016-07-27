'use strict';

angular.module('serveApp')
  .service('Merchant', function (Restangular) {
      return Restangular.one('merchant');
  });
