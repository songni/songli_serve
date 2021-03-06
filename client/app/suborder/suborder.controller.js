'use strict';

angular.module('serveApp')
  .controller('SubOrderListCtrl', function (
    $scope, $rootScope, $interval, $log, $uibModal, $stateParams, 
    Alert, RestGift, RestExp, RestOrderGift, RestSuborder
  ) {
    $rootScope.title = '发货管理';
    $scope.suborders = [];
    $scope.forms = {};
    $scope.filter = {
        delivery: 'all'
    }
    $scope.clientUri = config.clientUri;

    $scope.status = {
        startTime: null,
        endTime: null,
        startTimePopup: {
            opened: false
        },
        endTimePopup: {
            opened: false
        },
        pay: true,
        order: '',
        serial: '',
        shipping: 'all',
        refresh: false
    };
    $scope.searchByCondition = function(){
        if ($scope.forms['suborderForm'].$invalid) {
            $scope.submitted = true;
            return false;
        }
        if($scope.status.startTime && !$scope.status.endTime){
            Alert.add('danger', '请填写结束时间');
            return;
        }
        if($scope.status.endTime && !$scope.status.startTime){
            Alert.add('danger', '请填写起始时间');
            return;
        }
        if($scope.status.endTime && $scope.status.startTime){
            if(!moment($scope.status.startTime).isBefore($scope.status.endTime)){
                Alert.add('danger', '起始时间必须小于结束时间');
                return;
            }
        }
        $scope.pagi.startTime = $scope.status.startTime;
        $scope.pagi.endTime = $scope.status.endTime;
        $scope.pagi.order = $scope.status.order;
        $scope.pagi.serial = $scope.status.serial;
    }

    RestExp.one('company').get().then(function(companies) {
        $scope.companies = companies;
    });

    $scope.shippingModel = function(suborder) {
        var order = suborder.order;
        suborder.id = suborder.id || suborder._id;
        order.id = order.id || order._id;
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app/gift/gift.order.shipping.html',
            controller: 'GiftOrderShippingCtrl',
            resolve: {
                order: function() {
                    return order;
                },
                companies: function() {
                    return $scope.companies;
                },
                receiver: function() {
                    return suborder;
                }
            }
        });
        modalInstance.result.then(function(shipping) {
            $scope.status.refresh = !$scope.status.refresh;
        }, function() {
            $log.info('在: ' + new Date() + '解散模');
        });
        return false;
    };

    $scope.exportCards = function(){
        RestSuborder.one('export').one('cards')
            .withHttpConfig({
                responseType: "arraybuffer"
            })
            .get({
                shipping: $scope.status.shipping,
                pay: $scope.status.pay,
                page: $scope.pagi.currentPage,
                limit: $scope.pagi.itemsPerPage,
                ext: 'wx'
            })
            .then(function(data) {
                if(!data.byteLength){
                    Alert.add('danger', '无可用语音码');
                    return;
                }
                var file = new Blob([data], {
                    type: 'application/octet-stream;charset=utf-8'
                });
                saveAs(file, '语音卡.zip');
            });
    }
    
    $scope.exportCard = function(suborder) {
        if(suborder.card){
            RestSuborder.one(suborder.id || suborder._id).one('export').one('card')
            .withHttpConfig({
                responseType: "arraybuffer"
            })
            .get({
                ext: 'wx'
            })
            .then(function(data) {
                var file = new Blob([data], {
                    type: 'image/png'
                });
                saveAs(file, suborder._id + '.png');
            });
        }else{
             RestOrderGift.one('export').one('card').one(suborder.order.id || suborder.order._id)
                .withHttpConfig({
                    responseType: "arraybuffer"
                })
                .get({
                    ext: 'wx'
                })
                .then(function(data) {
                    var file = new Blob([data], {
                        type: 'image/png'
                    });
                    saveAs(file, suborder.order.serial + '.png');
                });
        }
    };

    $scope.exportSuborders = function(){
        RestSuborder.one('export').one('orders')
            .withHttpConfig({
                responseType: "arraybuffer"
            })
            .get({
                page: $scope.pagi.currentPage,
                limit: $scope.pagi.itemsPerPage,
                startTime: $scope.pagi.startTime,
                endTime: $scope.pagi.endTime,
                order: $scope.pagi.order,
                serial: $scope.pagi.serial,
                shipping: $scope.status.shipping,
                pay: $scope.status.pay
            })
            .then(function(data){
                var file = new Blob([data], {
                    type: 'application/vnd.openxmlformats'
                });
                saveAs(file, 'suborders.' + (new Date()).getTime() + '.xlsx');
            })
    }
    
    $scope.$watchCollection('[pagi.currentPage,pagi.itemsPerPage,pagi.startTime,pagi.endTime,pagi.order,pagi.serial,status.shipping,status.pay,status.refresh]', function(newVal) {
        $scope.suborders = [];

        let params = {
          page: newVal[0],
          limit: newVal[1],
          startTime: newVal[2],
          endTime: newVal[3],
          order: newVal[4],
          serial: newVal[5],
          shipping: newVal[6],
          pay: newVal[7]
        }

        if ($stateParams.poi) {
            params.poi = $stateParams.poi
        }

        RestGift.one('suborder').get(params).then(function(result){
          $scope.suborders = result.suborders;
          $scope.pagi.totalItems = result.count;
        });
    });

    $scope.pagi = {
        totalItems: 0,
        currentPage: 1,
        maxSize: 5,
        itemsPerPage: 10
    };

    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.openStarttimePopup = function() {
        $scope.status.startTimePopup.opened = true;
    };
    $scope.openEndtimePopup = function() {
        $scope.status.endTimePopup.opened = true;
    };
  })
