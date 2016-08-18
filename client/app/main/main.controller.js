'use strict';

angular.module('serveApp')
  .controller('MainCtrl', function ($scope,$stateParams,RestWecom,RestWechat) {
    $scope.wechat = function(){
      RestWecom.get()
      .then(function(link) {
        location.href = link.link;
      })
    }
    if($stateParams.auth_code){
      RestWecom.one('auth').get({auth_code:$stateParams.auth_code}).then(function(data){
        $cookieStore.put('token', data.token);
        $window.location.href = $location.path();
      });
    }
    if($scope.wxUser){
      RestWechat.one('qrcode').get({scene_id:1}).then(function(ticket){
        $scope.qrcode_ticket = ticket;
      });
    }
    var load_qrcode = false;
    $scope.$watch('wxUser', function(newVal, oldVal) {
      if(!newVal) return false;
      if(load_qrcode) return false;
      load_qrcode = true;
      RestWechat.one('qrcode').get({scene_id:1}).then(function(ticket){
        $scope.qrcode_ticket = ticket;
        load_qrcode = false;
      });
    }, true);
  })
  .controller('NullModalCtrl', function($scope,$state,$uibModalInstance){
    $scope.cancel = function () {
      $state.go('plans.center');
      $uibModalInstance.dismiss('cancel');
    };
  })
