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
      })
      .state('index', {
        url: '/index',
        // templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        ncyBreadcrumb: {
          label: '首页'
        }
      })
      .state('price', {
        url: '/price',
        // templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        ncyBreadcrumb: {
          label: '首页'
        }
      })
      .state('agent', {
        url: '/agent',
        // templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        ncyBreadcrumb: {
          label: '首页'
        }
      })
      .state('academy', {
        url: '/academy',
        // templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        ncyBreadcrumb: {
          label: '首页'
        }
      })
      .state('/', {
        url: '/guide',
        templateUrl: 'app/main/guide.mobile.html',
        controller: 'SwiperCtrl',
      });
  });
