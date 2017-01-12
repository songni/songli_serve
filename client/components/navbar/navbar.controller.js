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
        'icon': 'icon1',
        'iconSelected': 'icon11'
      },{
        'header': true,
        'title' : '商品管理',
        'icon'  : 'icon2',
        'iconSelected': 'icon22'
      },{
        'menu': true,
        'title': '发布商品',
        'link': 'gift.post',
      },{
        'menu': true,
        'title': '商品列表',
        'link': 'gift.list',
      },{
        'header': true,
        'title' : '订单管理',
        'icon'  : 'icon3',
        'iconSelected': 'icon33'
      },{
        'menu': true,
        'title': '订单列表',
        'link': 'gift.order',
      },{
        'menu': true,
        'title': '大客户礼包',
        'link': 'bigpack.list',
      },{
        'header':true,
        'title':'门店管理',
        'icon':'icon4',
        'iconSelected': 'icon44'
      },{
        'menu':true,
        'title':'门店分组',
        'link':'poi.tags',
      },{
        'menu':true,
        'title':'门店统计',
        'link':'poi.manage',
      },{
        'header':true,
        'title':'员工管理',
        'icon':'icon5',
        'iconSelected': 'icon55'
      },{
        'menu':true,
        'title': '员工账号',
        'link': 'worker.list',
      },{
        'menu':true,
        'title':'扫码员列表',
        'link':'user.list',
      },{
        'menu':true,
        'title':'添加扫码员',
        'link':'user.qrcode',
      }
    ];
    $scope.isActive = function(route) {
      return $state.is(route);
    };
  })
  ;
