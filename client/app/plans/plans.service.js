'use strict';

angular.module('serveApp')
  .service('RestPlans', function(Restangular) {
    return Restangular.service('plans');
  })
  .service('RestPlansOrder', function(Restangular) {
    return Restangular.service('plans/order');
  })
  .service('RestPlansNumbers', function(Restangular) {
    return Restangular.service('plans/numbers');
  })
;
