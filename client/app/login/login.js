'use strict';

angular.module('serveApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl',
        ncyBreadcrumb: {
          label: '登陆'
        }
      })
      .state('logout', {
        url: '/logout',
        templateUrl: 'app/login/logout.html',
        controller: 'LogoutCtrl',
        ncyBreadcrumb: {
          label: '退出'
        }
      })
      .state('experience', {
        url: '/experience?token',
        templateUrl: 'app/login/login.html',
        controller: 'ExperienceCtrl',
        ncyBreadcrumb: {
          label: '体验'
        }
      })
      .state('exp', {
        url: '/exp?uid',
        templateUrl: 'app/login/login.html',
        controller: 'ExpCtrl',
        ncyBreadcrumb: {
          label: '测试'
        }
      })
  });
