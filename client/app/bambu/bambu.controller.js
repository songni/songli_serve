'use strict';

angular.module('serveApp')
  .controller('BambuCtrl',function($scope, $rootScope,　Merchant){
    $rootScope.title = '自助服务';
    Merchant.get().then(function(merchant){
      $scope.merchant = merchant;
    });
  })
  .controller('BambuContactCtrl', function ($scope, $rootScope, $state,$uibModal, Merchant) {
    $rootScope.title = '完善商家信息';
    $scope.aggrement = 'YES';
    $scope.submitted = false;
    $scope.agmMdl = function () {
      $uibModal.open({
        templateUrl: 'app/document/document.html',
        controller: 'DocumentModalCtrl',
        resolve: {
          type: function(){
            return 'agreement';
          }
        }
      });
    };
    $scope.master = {};
    $scope.isUnchanged = function(merchant) {
      return angular.equals(merchant, $scope.master);
    };
    $scope.post = function(form){
      $scope.submitted = true;
      $scope.master = angular.copy($scope.merchant);
      if($scope.aggrement === 'NO') {return false;}
      if(form.$invalid) {return false;}
      if($scope.merchant.id){
        $scope.merchant.put().then(function(){
           $state.go('bambu.config.pay');
        });
      }else{
        Merchant.post('',$scope.merchant).then(function(){
          $state.go('bambu.config.pay');
        });
      }
    };
  })
  .controller('BambuServiceCtrl', function ($scope, $rootScope, $uibModal, $state, Merchant) {
    Merchant.get().then(function(merchant){
      if(!merchant || !merchant.id) {$state.go('bambu.contact');}
    });
    $rootScope.title = '选择服务方式';
    $scope.bambu = {service:'self'};
    $scope.svcArr = {'deploy':'客服配置服务','counselor':'客服顾问服务'};
    $scope.dltSltSvc = function(){
      $scope.bambu.service = '';
    };
    $scope.start = function(){
      var type = $scope.bambu.service;
      if(type === 'self'){
        $state.go('bambu.config.pay');
      }
      if(type === 'deploy'){
        $state.go('plans.service',{type:type,from:'bambu'});
      }
      if(type === 'counselor'){
        $state.go('plans.counselor');
      }
    };
    $scope.howtoMdl = function () {
      $uibModal.open({
        templateUrl: 'app/document/document.html',
        controller: 'DocumentModalCtrl',
        resolve: {
          type: function(){
            return 'merchantHelp';
          }
        }
      });
    };
  })
  .controller('BambuConfigCtrl', function ($scope, $rootScope, $state, $uibModal, Restangular) {
    $rootScope.title = '公众号配置';
    Restangular.service('wechat/pay').one().get().then(function(pay){
      $scope.pay = pay;
    });
    $scope.submitted = false;
    $scope.post = function(form){
      $scope.submitted = true;
      if(form.$invalid) {return false;}
      if(!$('input[type=file]')[0].files[0]){
        alert('请上传资质证书！');
        return;
      }
    	$scope.popup(function(){
           var fd = new FormData();
         fd.append('mch_id', $scope.pay.mch_id);
         fd.append('key', $scope.pay.key);
         fd.append('pfx', $('input[type=file]')[0].files[0]);
         $scope.pay
           .withHttpConfig({transformRequest: angular.identity})
           .customPOST(fd, undefined, undefined, { 'Content-Type': undefined })
           .then(function(){
             	location.href = '/';
           });
      });
    };
		//  弹窗
    $scope.popup = function(cb){
    	var modalInstance = $uibModal.open({
        templateUrl: 'app/main/main.popup.html',
        controller: 'MainCtrl',
        resolve: {
          type: function(){
            return 'agreement';
          }
        }
     });
     modalInstance.result.then(cb, cb)
    };
    
    $scope.howtoMdl = function () {
      $uibModal.open({
        templateUrl: 'app/document/document.html',
        controller: 'DocumentModalCtrl',
        resolve: {
          type: function(){
            return 'agreement';
          }
        }
      });
    };
  })
  .controller('BambuCounselorCtrl',function(){

  })
;
