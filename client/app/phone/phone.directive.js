'use strict';

angular.module('serveApp')
  .directive('phone', function () {
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        var PHONE_REGEXP = /^1[34578][0-9][0-9]{8}$/;
        ctrl.$parsers.unshift(function(viewValue) {
          if (PHONE_REGEXP.test(viewValue)) {
            ctrl.$setValidity('phone', true);
            return viewValue;
          } else {
            ctrl.$setValidity('phone', false);
            return undefined;
          }
        });
      }
    };
  });
