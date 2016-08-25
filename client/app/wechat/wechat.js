'use strict';

angular.module('serveApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('wechat', {
        url: '/wechat',
        abstract: true,
        templateUrl: 'app/wechat/wechat.html',
        controller: 'WechatCtrl',
        ncyBreadcrumb: {
          label: '公号管理',
          ico:'wechat'
        }
      })
      .state('wechat.pay', {
        url: '/pay',
        templateUrl: 'app/wechat/pay.html',
        controller: 'WechatPayCtrl',
        ncyBreadcrumb: {
          label: '公号配置'
        }
      })
      .state('wechat.menu', {
        url: '/menu',
        templateUrl: 'app/wechat/menu.html',
        controller: 'WechatMenuCtrl',
        ncyBreadcrumb: {
          label: '设置菜单'
        }
      })
      .state('wechat.autoreply', {
        url: '/autoreply',
        templateUrl: 'app/wechat/autoreply.html',
        controller: 'WechatAutoreplyCtrl',
        ncyBreadcrumb: {
          label: '关注回复'
        }
      })
      .state('wechat.message', {
        url: '/message',
        templateUrl: 'app/wechat/default.html',
        controller: 'WechatCtrl',
        ncyBreadcrumb: {
          label: '消息管理'
        }
      })
      .state('wechat.user', {
        url: '/user',
        templateUrl: 'app/wechat/default.html',
        controller: 'WechatCtrl',
        ncyBreadcrumb: {
          label: '用户管理'
        }
      })
      .state('wechat.shop', {
        url: '/shop',
        templateUrl: 'app/wechat/default.html',
        controller: 'WechatCtrl',
        ncyBreadcrumb: {
          label: '小店管理'
        }
      })
      .state('wechat.service', {
        url: '/service',
        templateUrl: 'app/wechat/default.html',
        controller: 'WechatCtrl',
        ncyBreadcrumb: {
          label: '客服管理'
        }
      })
      .state('wechat.notice', {
        url: '/notice',
        templateUrl: 'app/wechat/default.html',
        controller: 'WechatCtrl',
        ncyBreadcrumb: {
          label: '业务通知'
        }
      })
      .state('wechat.coupon', {
        url: '/coupon',
        templateUrl: 'app/wechat/default.html',
        controller: 'WechatCtrl',
        ncyBreadcrumb: {
          label: '卡券管理'
        }
      })
      .state('wechat.material', {
        url: '/material',
        templateUrl: 'app/wechat/default.html',
        controller: 'WechatCtrl',
        ncyBreadcrumb: {
          label: '素材管理'
        }
      })
      .state('wechat.rock', {
        url: '/rock',
        templateUrl: 'app/wechat/default.html',
        controller: 'WechatCtrl',
        ncyBreadcrumb: {
          label: '摇一摇'
        }
      });
  });
