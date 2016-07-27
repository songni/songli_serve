'use strict';

angular.module('serveApp')
    .controller('MerchantCtrl', function($scope, $rootScope, $state, Merchant) {
        $rootScope.title = '商家资料管理';
        Merchant.get().then(function(merchant) {
            if (!merchant.id) {
                $state.go('merchant.post');
                return;
            }
            $scope.merchant = merchant;
            $scope.cfgClientUri = config.clientUri;
        });
    })
    .controller('MerchantPostCtrl', function($scope, $rootScope, $state, $modal, Merchant, Alert) {
        $rootScope.title = '提交商家资料';
        $scope.aggrement = 'YES';
        $scope.submitted = false;
        $scope.agmMdl = function() {
            $modal.open({
                templateUrl: 'app/document/document.html',
                controller: 'DocMdlAgmCtrl'
            });
        };
        $scope.master = {};
        $scope.isUnchanged = function(merchant) {
            return angular.equals(merchant, $scope.master);
        };
        $scope.post = function() {
            $scope.submitted = true;
            $scope.master = angular.copy($scope.merchant);
            if ($scope.aggrement === 'NO') return false;
            if (form.$invalid) return false;
            if ($scope.merchant.id) {
                $scope.merchant.put().then(function(data) {
                    Alert.add('success', data.message);
                    $state.go('merchant');
                });
            } else {
                Merchant.post('', $scope.merchant).then(function(data) {
                    Alert.add('success', data.message);
                    $state.go('merchant.upload');
                });
            }
        };
    })
    .controller('MerchantUploadCtrl', function($scope, $rootScope, $http, $stateParams, FileUploader, $cookieStore) {
        $rootScope.title = '上传资质文件';

        $scope.select = function() {
            $('input:file').trigger('click');
            return false;
        };

        var uploader = $scope.uploader = new FileUploader({
            headers: {
                Authorization: $cookieStore.get('token'),
                'X-API-From': config.from,
                'X-Component': config.component
            },
            url: config.uri + '/merchant/upload'
        });

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/ ) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });
        // CALLBACKS
        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/ , filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
            //弹出上传返回信息
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };
        console.info('uploader', uploader);
    });
