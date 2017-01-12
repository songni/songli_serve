'use strict';

angular.module('serveApp')
  .config(function($stateProvider) {
    $stateProvider
    .state('bigpack', {
      abstract: true,
      url: '/bigpack',
      template: '<ui-view/>',
      authenticate: true,
      ncyBreadcrumb: {
        label: '大客户礼包'
      }
    })
    .state('bigpack.list', {
      url: '/list',
      templateUrl: 'app/bigpack/bigpack.order.list.html',
      controller: 'BigpackOrderListCtrl',
      authenticate: true,
      ncyBreadcrumb: {
        label: '大客户礼包'
      }
    })
    .state('bigpack.add', {
      url: '/add',
      templateUrl: 'app/bigpack/bigpack.order.add.html',
      controller: 'BigpackOrderAddCtrl',
      authenticate: true,
      ncyBreadcrumb: {
        label: '新建礼包'
      }
    })
    .state('bigpack.detail', {
      url: '/:id',
      templateUrl: 'app/bigpack/bigpack.order.detail.html',
      controller: 'BigpackOrderDetailCtrl',
      authenticate: true,
      ncyBreadcrumb: {
        label: '礼包详情'
      },
      resolve: {
        order: function($stateParams, RestOrderGift) {
          return RestOrderGift.one($stateParams.id).get();
        }
      }
    })

  });
