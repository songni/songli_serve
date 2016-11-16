'use strict';

angular.module('serveApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('poi', {
        url: '/poi',
        template: '<ui-view/>',
        controller: 'PoiCtrl',
        abstract: true,
        authenticate: true,
        ncyBreadcrumb: {
          label: '门店管理',
          ico:'street-view'
        }
      })
      .state('poi.manage', {
        url: '/manage?tag',
        templateUrl: 'app/poi/poi.manage.html',
        controller: 'PoiListCtrl',
        resolve:{
          tag: function () {
            return '';
          }
        },
        authenticate: true,
        ncyBreadcrumb: {
          label: '门店统计'
        }
      })
      .state('poi.tags', {
        url: '/tags?id',
        templateUrl: 'app/poi/poi.tags.html',
        controller: 'PoiListCtrl',
        resolve:{
          tag: function () {
            return '';
          }
        },
        authenticate: true,
        ncyBreadcrumb: {
          label: '门店分组'
        }
      })
      .state('poi.comm', {
        url: '/comm?id',
        templateUrl: 'app/poi/poi.comm.html',
        controller: 'PoiCommCtrl',
        authenticate: true,
        ncyBreadcrumb: {
          label: '门店备货'
        }
      });
  });
