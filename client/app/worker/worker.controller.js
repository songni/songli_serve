'use strict';

angular.module('serveApp')
  .controller('WorkerCtrl', function ($scope,$rootScope) {
    $rootScope.title = '员工管理';
    $scope.ico = 'male';
  })
  .controller('WorkerListCtrl', function ($scope,$rootScope,$state,RestWorker,Alert) {
    $rootScope.title = '员工管理';
    $scope.ico = 'male';
    $scope.pagi = {
      totalItems : 0,
      currentPage : 1,
      maxSize : 5,
      itemsPerPage : 10,
      lock:''
    };
    $scope.$watchCollection('[pagi.lock,pagi.currentPage,pagi.itemsPerPage]', function(newVal) {
      var condition = {lock:newVal[0],page:newVal[1],limit:newVal[2]};
      RestWorker.one('count').get(condition).then(function(count){
        $scope.pagi.totalItems = count || 0;
      });
      RestWorker.getList(condition).then(function(workers){
        $scope.workers = workers;
      });
    });
    $scope.lock = function(){
      var worker = this.worker;
      worker.status.lock = !worker.status.lock;
      worker.one('lock').post('',{lock:worker.status.lock}).then(function(data){
        Alert.add('success',data.message);
        $state.reload();
      });
    };
    $scope.copyText='复制';
    $scope.getTextToCopy = function() {
        return 'https://wx.91pintuan.com/worker/login';
    };
    $scope.doSomething = function () {
        $scope.copyText='复制成功!';
    };
  })
  .controller('WorkerFormCtrl', function ($scope,$rootScope,$state,$stateParams,$interval,RestWorker,Alert) {
    $rootScope.title = '添加员工';
    $scope.ico = 'male';
    $scope.getCpcTxt = '获取验证码';
    $scope.getedCpc = false;
    $scope.getVerificationCode = function(form) {
      if (form.telephone.$invalid) {
        alert('请正确填写手机号!');
        return false;
      }
      RestWorker.one('captcha').post('',{telephone:$scope.worker.info.telephone}).then(function(res){
        $scope.getedCpc = true;
        Alert.add('success',res.message);
        $scope.Countdown = 120;
        var counter = $interval(function(){
                  $scope.Countdown--;
                  $scope.getCpcTxt = $scope.Countdown;
                  if($scope.Countdown === 0){
                    $interval.cancel(counter);
                    $scope.getCpcTxt = '重发';
                  }
                },1000);
      });
    };
    if($stateParams.id){
      $rootScope.title = '编辑员工';
      RestWorker.one($stateParams.id).get().then(function(worker){
        $scope.worker = worker;
      });
    }
    $scope.post = function(){
      if ($scope.workerForm.$invalid) {
        $scope.submitted = true;
        return false;
      }
      if($scope.worker.id){
        $scope.worker.put().then(function(data){
          Alert.add('success',data.message);
          $state.go('worker.list');
        });
      }else{
        RestWorker.post($scope.worker.info).then(function(data){
          Alert.add('success',data.message);
          $state.go('worker.list');
        });
      }
    };
  })
;
