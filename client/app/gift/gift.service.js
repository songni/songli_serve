'use strict';

angular.module('serveApp')
  .service('RestGift', function(Restangular) {
    return Restangular.service('gift');
  })
  .service('RestOrderGift', function(Restangular) {
    return Restangular.service('gift/order');
  })
  .service('RestExp', function(Restangular) {
    return Restangular.service('exp');
  });
  ;
