'use strict';

angular.module('serveApp')
  .controller('LoginCtrl', function ($scope, $rootScope, RestWecom) {
    $rootScope.title = "登录";
    $scope.wechat = function(){
      RestWecom.get()
      .then(function(link) {
        location.href = link.link;
      })
    }
  })
  .controller('LogoutCtrl',function($scope,$rootScope,$cookieStore,$state,$timeout){
    $cookieStore.remove('token');
    $rootScope.wxUser = undefined;
    $timeout(function(){$state.go('login');},1000);
    $rootScope.isVerify = false;
  })
  .controller('ExperienceCtrl', function ($scope, $rootScope, RestWecom) {
    $rootScope.title = "发起授权页的体验URL";
    $scope.wechat = function(){
      RestWecom.get()
      .then(function(link) {
        location.href = link.link;
      })
    }
  })
  .controller('ExpCtrl', function ($cookieStore,$stateParams,RestWechat) {
    RestWechat.one('experience').get({uid:$stateParams.uid}).then(function(data){
      $cookieStore.put('token', data.token);
      location.href = '/';
    });
  });
