'use strict';

angular.module('serveApp')
  .controller('PlansCtrl', function ($scope, $rootScope, $interval, $uibModal, Alert, RestPlans) {
    $rootScope.title = '订购中心';
    $scope.pay = {type : 'wepay',combo:'order'};
    $scope.choosePay = function(type){
      $scope.pay.type = type;
    };
    $scope.chooseCombo = function(combo){
      $scope.pay.combo = combo;
    };
    $scope.$watch('pay.combo',function(newVal){
      if(newVal === 'order'){
        RestPlans.getList({limit:3}).then(function(plans){
          $scope.plans = plans;
          $scope.plan = plans[0];
        });
      }
      if(newVal === 'counselor'){
        RestPlans.one('service').get({category:'counselor'}).then(function(plan){
          $scope.plan = plan;
        });
      }
    });

    $scope.selected = 0;
    $scope.selPlan = function() {
      $scope.plan = this.plan;
      $scope.pay.type = 'wepay';
      $scope.selected = this.$index;
    };
    $scope.payModal = function(){
      if($scope.pay.type === 'wepay'){
        $uibModal.open({
          templateUrl: 'app/plans/plans.qrcode.html',
          resolve: {plan: function () {return $scope.plan;}},
          controller: 'PlansPayModalCtrl'
        });
      }
      if($scope.pay.type === 'alipay'){
        Alert.add('warning','支付宝支付开发中');
      }
      return false;
    };
    RestPlans.one('numbers').get().then(function(numbers){
      $scope.numbers = numbers;
    });
    /*
    $scope.$watchCollection('[plan,wxUser]',function(newVal){
      if(!newVal[0]) return false;
      if(!newVal[1]) return false;
      var params = {order_id:newVal[0].id,pubno_id:newVal[1].appid};
      RestPlans.one('qrcode').get(params).then(function(qrcode){
        $scope.qrcode = qrcode;
      });
    });
    $scope.po_ct_diff = 0;
    RestPlansOrder.one('count').get().then(function(count){
      $scope.plan_order_count = count;
    });
    $interval(function(){
      RestPlansOrder.one('count').get().then(function(count){
        $scope.po_ct_diff = count-$scope.plan_order_count;
      })
    },5000);
    $scope.$watch('po_ct_diff',function(newVal){
      if(newVal>0) Alert.add('success','购买成功!');
      RestPlans.one('numbers').get().then(function(numbers){
        $scope.numbers = numbers;
      });
    });//*/
  })
  .controller('PlansListCtrl',function ($scope,RestPlansOrder){
    RestPlansOrder.getList().then(function(planOrders){
      $scope.planOrders = planOrders;
    });
  })
  .controller('PlansServiceCtrl',function ($scope,$rootScope,$stateParams,$uibModal,Alert,RestPlans){
    $rootScope.title = '购买服务';
    $scope.pay = {type : 'wepay'};
    $scope.choosePay = function(type){
      $scope.pay.type = type;
    };
    $scope.choosePay = function(type){
      $scope.pay.type = type;
    };

    $scope.type = $stateParams.type;
    if($stateParams.type){
      RestPlans.one('service').get({category:$stateParams.type}).then(function(plan){
        $scope.plan = plan;
      });
    }

    $scope.payModal = function(){
      if($scope.pay.type === 'wepay'){
        $uibModal.open({
          templateUrl: 'app/plans/plans.qrcode.html',
          resolve: {plan: function () {return $scope.plan;}},
          controller: 'PlansPayModalCtrl'
        });
      }
      if($scope.pay.type === 'alipay'){
        Alert.add('warning','支付宝支付开发中');
      }
      return false;
    };
  })
  .controller('PlansPayModalCtrl',function($scope,$rootScope,$state,$uibModalInstance,plan,RestPlans){
    $scope.plan = plan;
    $scope.$watchCollection('[plan,wxUser]',function(newVal){
      if(!newVal[0]) {return false;}
      if(!newVal[1]) {return false;}
      var params = {'plan_id':newVal[0].id,'pubno_id':newVal[1].appid};
      RestPlans.one('qrcode').get(params).then(function(qrcode){
        $scope.qrcode = qrcode;
      });
    });
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    $scope.finishPay = function(){
      /*
      if($state.is('plans.center')){
        $state.go('plans.list');
      }else{
        $state.reload();
      }
      */
      $state.reload();
      $uibModalInstance.close('finishPay');
    };
  })
  .controller('PlansCounselorCtrl',function ($scope,$state, $uibModal){
    $scope.aggrement = 'YES';
    $scope.openService = function(){
      $state.go('plans.service',{type:'counselor',from:'bambu'});
    };
    $scope.counselorMdl = function () {
      $uibModal.open({
        templateUrl: 'app/document/document.html',
        controller: 'DocumentModalCtrl',
        resolve: {
          type: function(){
            return 'counselor';
          }
        }
      });
    };
  })
;
