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
      'title': '发布礼物',
      'link': 'gift.post'
    },{
      'title': '商品管理',
      'link': 'gift.list'
    },{
      'title': '订单查询',
      'link': 'gift.order'
    },{
      'title': '发货管理',
      'link': 'suborder.list'
    }];
    $scope.isActive = function(route) {
      return $state.is(route);
    };
  })
  ;
