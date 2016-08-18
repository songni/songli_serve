'use strict';

angular.module('serveApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('document', {
        url: '/document',
        templateUrl: 'app/document/document.html',
        controller: 'DocumentCtrl'
      });
  });