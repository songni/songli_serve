'use strict';

angular.module('serveApp')
  .controller('NavbarCtrl', function ($rootScope, $scope, $location) {
    $scope.menu = [
      {
        'title': '充值中心',
        'link': 'plans.center',
        show: !!($rootScope.wxUser && $rootScope.wxUser.pay_config)
      },
      {
        'title': '公号配置',
        'link': 'wechat.pay',
        show: !!($rootScope.wxUser && $rootScope.wxUser.pay_config)
      },
      {
        'title': '|',
        show: true
      },
      {
        'title': '退出',
        'link': 'logout',
        show: true
      }
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  })
  .controller('MenuCtrl', function ($scope, $state) { 
    $scope.menus = [
      {
        'menu': true,
        'title': '发货管理',
        'link': 'suborder.list',
        'icon': 'icon1'
      },
      {
        'menu': true,
        'title': '发布商品',
        'link': 'gift.post',
        'icon': 'icon2'
      },{
        'menu': true,
        'title': '商品列表',
        'link': 'gift.list',
        'icon': 'icon3'
      },{
        'menu': true,
        'title': '订单列表',
        'link': 'gift.order',
        'icon': 'icon4'
      },
      {
        'header':true,
        'title':'门店管理',
        'icon':'icon5',
      },
      {
        'menu':true,
        'title':'门店分组',
        'link':'poi.tags',
      },
      {
        'menu':true,
        'title':'门店统计',
        'link':'poi.manage',
      },
      {
        'header':true,
        'title':'员工管理',
        'icon':'icon5',
      },
      {
        'menu':true,
        'title':'添加扫码员',
        'link':'user.qrcode',
      },
      {
        'menu':true,
        'title':'扫码员列表',
        'link':'user.list',
      },
      {
        'menu':true,
        'title': '员工账号',
        'link': 'worker.list',
      }
    ];
    $scope.isActive = function(route) {
      return $state.is(route);
    };
  })
  ;
