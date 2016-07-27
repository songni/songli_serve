'use strict';

angular.module('serveApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('merchant', {
        url: '/merchant',
        templateUrl: 'app/merchant/merchant.html',
        controller: 'MerchantCtrl',
        ncyBreadcrumb: {
          label: '商家管理',
          ico:'bank'
        }
      })
      .state('merchant.post', {
        url: '/post',
        templateUrl: 'app/merchant/form.html',
        controller: 'MerchantPostCtrl',
        ncyBreadcrumb: {
          label: '申请'
        }
      })
      .state('merchant.edit', {
        url: '/edit',
        templateUrl: 'app/merchant/form.html',
        controller: 'MerchantPostCtrl',
        ncyBreadcrumb: {
          label: '编辑信息'
        }
      })
      .state('merchant.upload', {
        url: '/upload',
        templateUrl: 'app/merchant/upload.html',
        controller: 'MerchantUploadCtrl',
        ncyBreadcrumb: {
          label: '上传资质文件'
        }
      })
      ;
  });
