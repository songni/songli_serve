'use strict';

angular.module('serveApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('bambu', {
        url: '/bambu',
        templateUrl: 'app/bambu/bambu.html',
        controller: 'BambuCtrl',
        authenticate: true,
        ncyBreadcrumb: {
          label: '自助服务',
          ico:'stethoscope'
        }
      })
      .state('bambu.contact', {
        url: '/contact',
        templateUrl: 'app/bambu/bambu.contact.html',
        controller: 'BambuContactCtrl',
        authenticate: true,
        ncyBreadcrumb: {
          label: '填写商家信息'
        }
      })
      .state('bambu.config', {
        url: '/config',
        template: '<ui-view/>',
        controller: 'BambuServiceCtrl',
        authenticate: true,
        ncyBreadcrumb: {
          label: '选择服务方式'
        }
      })
      .state('bambu.config.pay', {
        url: '/pay',
        templateUrl: 'app/bambu/bambu.config.pay.html',
        controller: 'BambuConfigCtrl',
        authenticate: true,
        ncyBreadcrumb: {
          label: '公众号配置'
        }
      })
      .state('bambu.counselor', {
        url: '/counselor',
        templateUrl: 'app/bambu/bambu.counselor.html',
        controller: 'BambuCounselorCtrl',
        authenticate: true,
        ncyBreadcrumb: {
          label: '客服顾问服务'
        }
      })
    ;
  });
