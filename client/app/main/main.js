'use strict';

angular.module('serveApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/?auth_code&vecter',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        ncyBreadcrumb: {
          label: '首页'
        }
      });
  });
