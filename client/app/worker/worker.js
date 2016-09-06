'use strict';
 
angular.module('serveApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('worker', {
        url: '/worker',
        templateUrl: 'app/worker/worker.html',
        abstract: true
      })
      .state('worker.list', {
        url: '/list',
        templateUrl: 'app/worker/worker.list.html',
        controller: 'WorkerListCtrl',
        authenticate: true,
        ncyBreadcrumb: {
          label: '员工管理',
//        ico:'male'
        }
      })
      .state('worker.add', {
        url: '/add',
        templateUrl: 'app/worker/worker.form.html',
        controller: 'WorkerFormCtrl',
        authenticate: true,
        ncyBreadcrumb: {
          label: '添加员工',
//        ico:'male'
        }
      })
      .state('worker.edit', {
        url: '/edit?id',
        templateUrl: 'app/worker/worker.form.html',
        controller: 'WorkerFormCtrl',
        authenticate: true,
        ncyBreadcrumb: {
          label: '编辑员工',
//        ico:'male'
        }
      })
      .state('worker.login', {
        url: '/login',
        templateUrl: 'app/login/login.worker.html',
        controller: 'LoginWorkerCtrl'
      })
    ;
  });
