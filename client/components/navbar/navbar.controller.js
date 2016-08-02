'use strict';

angular.module('serveApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': '设置支付',
      'link': 'bambu.config.pay'
    },{
      'title': '退出',
      'link': 'logout'
    }];

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
      'title': '礼物管理',
      'link': 'gift.list'
    },{
      'title': '订单管理',
      'link': 'gift.order'
    }];
    $scope.isActive = function(route) {
      return $state.is(route);
    };
  })
  ;
