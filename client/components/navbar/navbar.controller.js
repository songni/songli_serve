'use strict';

angular.module('serveApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': '商家信息',
      'link': 'merchant'
    },{
      'title': '设置支付',
      'link': 'wechat.pay'
    },{
      'title': '微信菜单',
      'link': 'wechat.menu'
    },{
      'title': '关注回复',
      'link': 'wechat.autoreply'
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
