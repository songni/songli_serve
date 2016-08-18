'use strict';

angular.module('serveApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('plans', {
        url: '/plans',
        templateUrl: 'app/plans/plans.html',
        abstract: true,
        authenticate: true,
        ncyBreadcrumb: {
          label: '套餐'
        }
      })
      .state('plans.center', {
        url: '/center',
        templateUrl: 'app/plans/plans.center.html',
        controller: 'PlansCtrl',
        ncyBreadcrumb: {
          label: '充值中心'
        }
      })
      .state('plans.list', {
        url: '/list',
        templateUrl: 'app/plans/plans.list.html',
        controller: 'PlansListCtrl',
        ncyBreadcrumb: {
          label: '列表'
        }
      })
      .state('plans.service', {
        url: '/service?type&from',
        templateUrl: 'app/plans/plans.service.html',
        controller: 'PlansServiceCtrl',
        ncyBreadcrumb: {
          label: '购买服务'
        }
      })
      .state('plans.counselor', {
        url: '/counselor',
        templateUrl: 'app/plans/plans.counselor.html',
        controller: 'PlansCounselorCtrl',
        ncyBreadcrumb: {
          label: '顾问'
        }
      });
  });
