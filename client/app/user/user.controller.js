'use strict';

angular.module('serveApp')
  .controller('UserCtrl',function(){

  })
  .controller('UserListCtrl', function ($scope,$rootScope,$state,$stateParams,RestUser,Alert) {
    $rootScope.title    = '用户列表';
    $rootScope.ico      = 'user';
    $scope.pagi = {
      totalItems: 0,
      currentPage : 1,
      maxSize : 5,
      itemsPerPage : 50,
      category:'client'
    };
    $scope.$watchCollection('[pagi.category, pagi.currentPage, pagi.itemsPerPage]', function(newVal) {
      var params = {category:newVal[0],page:newVal[1],limit:newVal[2]};
      if($stateParams.poi) {params.poi = $stateParams.poi;}
      RestUser.getList(params).then(function(users){
        console.warn(users.plain());
        $scope.users = users;
      });
      RestUser.one('count').get(params).then(function(data){
        $scope.pagi.totalItems = data.count;
      });
    });
    $scope.setClient = function(role){
      this.user.role.client = role;
      this.user.put().then(function(data){
        Alert.add('success',data.errmsg);
      });
    };
    $scope.unlinkPrinter = function(){
      this.user.printer = '';
      this.user.put().then(function(data){
        Alert.add('success',data.errmsg);
      });
    };
    // RestPrinter.getList().then(function(printers){
    //   printers = printers.plain();
    //   if(printers.length<1){
    //    printers = [{company:{name:'暂无打印机'},printname:'点击添加打印机'}];
    //   }
    //   $scope.printers = printers;
    // });
    $scope.selPrtr = function(item, model){
      if(model.printname === '点击添加打印机'){
        $state.go('printer.manage');
      }
    };
    $scope.linkUserPrinter = function(){
      this.user.put().then(function(data){
        Alert.add('success',data.errmsg);
      });
    };
  })
  .controller('OperatorCtrl', function ($scope,$rootScope,RestUser) {
      RestUser.one('operator').one('qrcode').get({'scene_id':1}).then(function(ticket){
        $scope.qrcodeTicket = ticket;
      });
  })
;
