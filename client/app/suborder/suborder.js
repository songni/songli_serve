'use strict';

angular.module('serveApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('suborder', {
        url: '/suborder',
        template: '<div ui-view=""></div>',
        abstract: true,
        authenticate: true,
        ncyBreadcrumb: {
          label: '套餐'
        }
      })
      .state('suborder.list', {
        url: '/list?poi',
        templateUrl: 'app/suborder/suborder.list.html',
        controller: 'SubOrderListCtrl',
        ncyBreadcrumb: {
          label: '发货管理'
        }
      })
  });
