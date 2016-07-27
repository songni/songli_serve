'use strict';

angular.module('serveApp')
    .controller('WechatCtrl', function($scope, $log) {})
    .controller('WechatProfileCtrl', function() {

    })
    .controller('WechatMenuCtrl', function($scope, $rootScope, RestWxMenu, Alert) {
        $rootScope.title = '设置微信菜单';
        $scope.menu = "{}";
        RestWxMenu.get().then(function(data) {
            $scope.menu = JSON.stringify(data.content, null, '    ');
            $scope.menus = data.content;
        });
        $scope.saveMenu = function() {
            RestWxMenu.patch($scope.menu).then(function(data) {
                $scope.menu = JSON.stringify(data.menus, null, '    ');
                $scope.menus = data.menus;
                Alert.add('success', data.message);
            });
        };
        $scope.setMenu = function() {
            RestWxMenu.put().then(function(data) {
                Alert.add('success', data.message);
            });
        }
    })
    .controller('WechatPayCtrl', function($scope, $rootScope, $state, Restangular, Alert) {
        $rootScope.title = '设置微信支付选项';
        Restangular.service('wechat/pay').one().get().then(function(pay) {
            $scope.pay = pay;
        });
        $scope.submitted = false;
        $scope.clientUri = config.clientUri;
        $scope.post = function() {
            $scope.submitted = true;
            if ($scope.form.$invalid) return false;
            var fd = new FormData();
            fd.append("mch_id", $scope.pay.mch_id);
            fd.append("key", $scope.pay.key);
            //fd.append("pfx", $('input[type=file]')[0].files[0]);
            fd.append('pfx', $scope.uploadFile);
            $scope.pay
                .withHttpConfig({
                    transformRequest: angular.identity
                })
                .customPOST(fd, undefined, undefined, {
                    'Content-Type': undefined
                })
                //.post()
                .then(function(data) {
                    Alert.add('success', data.message);
                    $scope.pay.key = '';
                    $scope.submitted = false;
                });
        };
    })
    .controller('WechatAutoreplyCtrl', function($scope, $rootScope, RestWxReply, Alert) {
        $rootScope.title = '关注回复';
        $scope.reply = {};
        RestWxReply.getList().then(function(data) {
            $scope.reply = data[0];
        });
        $scope.post = function() {
            $scope.reply.put().then(function(data) {
                Alert.add('success', data.message);
            });
        }
    });
