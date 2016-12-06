'use strict';

angular.module('serveApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('user', {
        url: '/user',
        templateUrl: 'app/user/user.html',
        controller: 'UserCtrl',
        abstract: true,
        authenticate: true,
        ncyBreadcrumb: {
          label: '用户管理',
//        ico:'user'
        }
      })
      .state('user.qrcode',{
        url:'/qrcode',
        templateUrl: 'app/user/operator.qrcode.html',
        controller: 'OperatorCtrl',
        ncyBreadcrumb: {
          label: '添加扫码员'
        }
      })
      .state('user.list', {
        url: '/list?poi',
        templateUrl: 'app/user/user.list.html',
        controller: 'UserListCtrl',
        ncyBreadcrumb: {
          label: '扫码员列表'
        }
      });
  });
