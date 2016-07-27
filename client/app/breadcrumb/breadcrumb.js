'use strict';

angular.module('serveApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('breadcrumb', {
        url: '/breadcrumb',
        templateUrl: 'app/breadcrumb/breadcrumb.html',
        controller: 'BreadcrumbCtrl'
      });
  });