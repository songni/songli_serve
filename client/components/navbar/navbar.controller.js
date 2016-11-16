'use strict';

angular.module('serveApp')
  .controller('NavbarCtrl', function ($rootScope, $scope, $location) {
    $scope.menu = [
      {
        'title': '公号配置',
        'link': 'wechat.pay',
        show: !!($rootScope.wxUser && $rootScope.wxUser.pay_config)
      },
      {
        'title': '充值中心',
        'link': 'plans.center',
        show: !!($rootScope.wxUser && $rootScope.wxUser.pay_config)
      },
      {
        'title': '工人管理',
        'link': 'worker.list',
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
    $scope.menus = [{
      'menu': true,
      'title': '发布礼物',
      'link': 'gift.post'
    },{
      'menu': true,
      'title': '商品管理',
      'link': 'gift.list'
    },{
      'menu': true,
      'title': '订单查询',
      'link': 'gift.order'
    },{
      'menu': true,
      'title': '发货管理',
      'link': 'suborder.list'
    }]
    // {
    //   'header':true,
    //   'title':'门店/物流/虚拟商品',
    //   'ico':'cube',
    // },
    // {
    //   'menu':true,
    //   'title':'门店统计',
    //   'link':'poi.manage',
    // },{
    //   'menu':true,
    //   'title':'门店分组',
    //   'link':'poi.tags',
    // }];
    $scope.isActive = function(route) {
      return $state.is(route);
    };
  })
  ;
