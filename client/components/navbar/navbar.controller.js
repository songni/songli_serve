'use strict';

angular.module('serveApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [
      {
        'title': '设置支付',
        'link': 'wechat.pay'
      },
      {
        'title': '充值中心',
        'link': 'plans.center'
      },
      {
        'title': '退出',
        'link': 'logout'
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
