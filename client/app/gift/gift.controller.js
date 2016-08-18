'use strict';

angular.module('serveApp')
    .controller('GiftCtrl', function($scope, $rootScope) {
        $rootScope.title = '礼物管理';
    })
    .controller('GiftPostCtrl', function($scope, $rootScope, $state, $stateParams, RestGift, RestAlbum, Alert, gift) {
        $rootScope.title = '发布礼物';
        if ($stateParams.id) $scope.gift = gift;
        $scope.submitted = false;
        $scope.config = config;
        $scope.tinymceOptions = {
            'language': 'zh_CN',
            'language_url': '/assets/i18n/tinymce.zh_CN.js',
            'skin_url': '/bower_components/tinymce-dist/skins/lightgray',
            'convert_urls': false,
            'menubar': false,
            'content_css': '/assets/css/tinymce.css',
            'plugins': ['textcolor link image insertdatetime paste code emoticons preview autoresize'],
            'toolbar_items_size': 'small',
            'toolbar': ' bold italic underline | bullist numlist | forecolor backcolor' +
                ' | image emoticons insertdatetime | removeformat undo redo | code preview',
            'statusbar': false,
            'resize': true,
            //'width' : 100%,
            'autoresize_min_height': 250,
            'autoresize_max_height': 1000,
            'insertdatetime_formats': ['%Y年%m月%d号', '%H点%M分'],
            'object_resizing': false,
            'image_description': false,
            'image_dimensions': false,
            'image_class_list': [{
                title: '默认',
                value: 'img-responsive'
            }, {
                title: '圆角',
                value: 'img-rounded'
            }, {
                title: '圆形',
                value: 'img-circle'
            }, {
                title: '边框',
                value: 'img-thumbnail'
            }],
            'file_picker_types': 'image',
            'file_picker_callback': function(callback, value, meta) {
                if (meta.filetype === 'image') {
                    $('<input />')
                        .attr({
                            type: 'file',
                            name: 'file'
                        })
                        .trigger('click')
                        .change(function() {
                            var fd = new FormData();
                            var file = $(this)[0].files[0];
                            fd.append('file', file);
                            callback('上传中，请稍后...', {
                                alt: '上传中'
                            });
                            RestAlbum.one('up')
                                .withHttpConfig({
                                    transformRequest: angular.identity
                                })
                                .customPOST(fd, undefined, undefined, {
                                    'Content-Type': undefined
                                })
                                .then(function(data) {
                                    if (data.link) {
                                        callback(data.link, {
                                            alt: data.name
                                        });
                                    }
                                });


                        });
                }
            }
        };
        $scope.post = function() {
            $scope.submitted = true;
            if ($scope.gift.info.detail === '<p><br data-mce-bogus="1"></p>') {
                $scope.gift.info.detail = '';
            }
            if ($scope.giftForm.$invalid) return false;
            var fd = new FormData();
            fd.append("name", $scope.gift.info.name);
            fd.append("price", $scope.gift.info.price);
            fd.append("stock", $scope.gift.num && $scope.gift.num.stock ? $scope.gift.num.stock : 0);
            fd.append("poetry", $scope.gift.info.poetry ? $scope.gift.info.poetry : '');
            fd.append("detail", $scope.gift.info.detail ? $scope.gift.info.detail : '');
            fd.append("lead", $scope.gift.info.lead ? $scope.gift.info.lead : '');
            fd.append('cover', $scope.uploadFile);
            if ($stateParams.id)
                $scope.gift.withHttpConfig({
                    transformRequest: angular.identity
                })
                .customPUT(fd, undefined, undefined, {
                    'Content-Type': undefined
                })
                .then(function(data) {
                    Alert.add('success', data.message);
                    $scope.submitted = false;
                    $state.go('gift.detail.qrcode', {
                        id: $stateParams.id
                    });
                });
            else
                RestGift.one().withHttpConfig({
                    transformRequest: angular.identity
                })
                .customPOST(fd, undefined, undefined, {
                    'Content-Type': undefined
                })
                .then(function(data) {
                    console.log(data);
                    Alert.add('success', data.message);
                    $scope.submitted = false;
                    $state.go('gift.detail.qrcode', {
                        id: data.id
                    });
                });
        };
    })
    .controller('GiftListCtrl', function($scope, $rootScope, RestGift, Alert) {
        $rootScope.title = '礼物列表';
        $rootScope.ico = 'list-alt';
        $scope.giftorders = [];
        $scope.chgPerPage = function() {
            $scope.pagi.itemsPerPage = this.page;
        };

        $scope.status = {
            online: '',
            name: null
        };

        $scope.findByName = function(){
            $scope.pagi.name = $scope.status.name
        }

        $scope.pagi = {
            totalItems: 0,
            currentPage: 1,
            maxSize: 5,
            itemsPerPage: 10,
            name: null
        };

        $scope.$watchCollection('[status.online,pagi.currentPage,pagi.itemsPerPage,pagi.name]', function(newVal) {
            RestGift.one('count').get({
                online: newVal[0],
                name: newVal[3]
            }).then(function(count) {
                $scope.pagi.totalItems = count;
            });
            RestGift.getList({
                    online: newVal[0],
                    page: newVal[1],
                    limit: newVal[2],
                    name: newVal[3]
                })
                .then(function(gifts) {
                    $scope.gifts = gifts;
                });
        });
        $scope.offShelf = function() {
            var action = confirm('确认下架吗？');
            var gift = this.gift;
            if (action === false) {
                return false;
            }
            gift.status.online = false;
            gift.one('offshelf').put().then(function(data) {
                Alert.add('success', data.message);
            });
        };
    })
    .controller('GiftQrcodeCtrl', function($scope, $rootScope, $sce, gift, RestWechat) {
        $rootScope.title = '礼物链接二维码';
        var url = 'http://' + $scope.wxUser.appid + '.' + config.clientUri + '/gift/' + gift.id;
        if (env === 'dev') {
            url = 'http://' + $scope.wxUser.appid + '.' + env + '.' + config.clientUri + '/gift/' + gift.id;
        }
        /*
        RestWechat.one('short').one('url').get({url:url}).then(function(url){
        $scope.text = url;    
        $scope.url = $sce.trustAsResourceUrl(url);
        });
        */
        $scope.text = url;
        $scope.url = $sce.trustAsResourceUrl(url);

        $scope.getTextToCopy = function() {
            return $scope.text;
        };
        $scope.doSomething = function() {
            alert('复制成功！');
        };
    })
    .controller('GiftOrderCtrl', function($state, $scope, $rootScope, $log, $uibModal, RestOrderGift, RestExp, Alert) {
        $rootScope.title = '订单管理';
        $rootScope.ico = 'list-alt';
        $scope.giftorders = [];
        $scope.forms = {};
        $scope.itemsPerPageArr = [10, 20, 50, 100, 200];
        $scope.chgPerPage = function(size) {
            $scope.pagi.itemsPerPage = size;
        };
        $scope.clientUri = config.clientUri;

        $scope.status = {
            shipping: '',
            pay: true,
            checked: false,
            startTime: null,
            endTime: null,
            startTimePopup: {
                opened: false
            },
            endTimePopup: {
                opened: false
            },
            order: '',
            serial: ''
        };

        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.openStarttimePopup = function() {
            $scope.status.startTimePopup.opened = true;
        };
        $scope.openEndtimePopup = function() {
            $scope.status.endTimePopup.opened = true;
        };
        $scope.searchByCondition = function(){
            if ($scope.forms['orderForm'].$invalid) {
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
        
        $scope.pagi = {
            totalItems: 0,
            currentPage: 1,
            maxSize: 5,
            itemsPerPage: 10
        };

        $scope.countShipping = function(order) {
            var count = 0;
            order.receivers.forEach(function(receiver) {
                if (receiver.status.shipping) count++;
            })
            return count;
        }

        $scope.$watchCollection('[status.shipping,status.pay,pagi.currentPage,pagi.itemsPerPage,pagi.startTime,pagi.endTime,pagi.order,status.finish, pagi.serial]', function(newVal) {
            $scope.giftorders = [];
            RestOrderGift.one('count').get({
                shipping: newVal[0],
                pay: newVal[1],
                startTime: newVal[4],
                endTime: newVal[5],
                order: newVal[6],
                finish: newVal[7],
                serial: newVal[8]
            }).then(function(count) {
                $scope.pagi.totalItems = count;
            });
            RestOrderGift.getList({
                    shipping: newVal[0],
                    pay: newVal[1],
                    page: newVal[2],
                    limit: newVal[3],
                    startTime: newVal[4],
                    endTime: newVal[5],
                    order: newVal[6],
                    finish: newVal[7],
                    serial: newVal[8]
                })
                .then(function(orders) {
                    $scope.orders = orders;
                });
        });
        $scope.qrcodeModel = function() {
            var orderId = this.order.id;
            var sender = this.order.sender.info.nickname;
            var receiver = this.order.receiver.name;
            $uibModal.open({
                templateUrl: 'app/gift/gift.order.qrcode.html',
                controller: 'GiftOrderQrcodeCtrl',
                size: 'sm',
                resolve: {
                    orderId: function() {
                        return orderId;
                    },
                    saveas: function() {
                        return sender + '送给' + receiver + '的声音二维码.png';
                    }
                }
            });
            return false;
        };
        $scope.wxQrcodeModel = function() {
            var orderId = this.order.id;
            var sender = this.order.sender.info.nickname;
            var receiver = this.order.receiver.name;
            $uibModal.open({
                templateUrl: 'app/gift/gift.order.wx.qrcode.html',
                controller: 'GiftWxOrderQrcodeCtrl',
                size: 'sm',
                resolve: {
                    orderId: function() {
                        return orderId;
                    }
                }
            });
            return false;
        };
        $scope.detailModel = function() {
            var order = this.order
            $uibModal.open({
                animation: true,
                templateUrl: 'app/gift/gift.order.detail.html',
                controller: 'GiftOrderDetailCtrl',
                resolve: {
                    order: function() {
                        return order;
                    }
                }
            });
            return false;
        };
        $scope.shipping = function() {
            var action = confirm('确认发货吗？');
            if (action === false) {
                return false;
            }
            this.order.status.shipping = true;
            RestOrderGift.one(this.order.id).one('shipping').put().then(function(data) {
                Alert.add('success', data.message);
            });
        };
        RestExp.one('company').get().then(function(companies) {
            $scope.companies = companies;
        });

        $scope.exportCard = function() {
            RestOrderGift.one('export').one('card').one(order.id)
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
                    saveAs(file, order.serial + '.png');
                });
        };
        $scope.exportOrders = function() {
            RestOrderGift.one('export').one('orders')
                .withHttpConfig({
                    responseType: "arraybuffer"
                })
                .get({
                    shipping: $scope.status.shipping,
                    pay: $scope.status.pay,
                    page: $scope.pagi.currentPage,
                    limit: $scope.pagi.itemsPerPage
                }).then(function(data) {
                    var file = new Blob([data], {
                        type: 'application/vnd.openxmlformats'
                    });
                    saveAs(file, 'Orders.xlsx');
                });
        };
        $scope.exportCards = function() {
            RestOrderGift.one('export').one('cards')
                .withHttpConfig({
                    responseType: "arraybuffer"
                })
                .get({
                    shipping: $scope.status.shipping,
                    pay: $scope.status.pay,
                    page: $scope.pagi.currentPage,
                    limit: $scope.pagi.itemsPerPage,
                    ext: 'wx'
                }).then(function(data) {
                    // https://github.com/arrking/songni/issues/182
                    var file = new Blob([data], {
                        type: 'application/octet-stream;charset=utf-8'
                    });
                    saveAs(file, '语音卡.zip');
                });
        };
    })
    .controller('GiftOrderDetailCtrl', function($scope, $rootScope, $stateParams, $uibModal, order, RestOrderGift, Alert, $log) {
        $rootScope.title = '订单详情';
        $scope.order = order;
        $scope.order.shipping = 0;
        order.receivers.forEach(function(item) {
                if (item.status.shipping) $scope.order.shipping++;
            })
            // TODO https://github.com/arrking/songni/issues/104
            // TypeError: Cannot read property 'appid' of undefined
        $scope.config = config;
        $scope.order.url = 'http://' + $rootScope.wxUser.appid + '.' + config.clientUri + '/gift/listen/' + order.id;

        // 一键发货
        $scope.shippingAll = function() {
            var order = this.order
            RestOrderGift.one(order.id)
                .put()
                .then(function(data) {
                    // get the response
                    Alert.add('success', data.message);
                }, function(err) {
                    // get an error
                    Alert.add('error', '设置失败！');
                    $log.error('RestOrderGift', err);
                });

        };

        $scope.shippingModel = function(receiver) {
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
                        return receiver;
                    }
                }
            });
            modalInstance.result.then(function(shipping) {
                receiver.status.shipping = shipping;
            }, function() {
                $log.info('在: ' + new Date() + '解散模');
            });
            return false;
        };
        $scope.exportCard = function() {
            var order = this.order;
            RestOrderGift.one('export').one('card').one(order.id)
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
                    saveAs(file, order.serial + '.png');
                });
        };
    })
    .controller('GiftOrderQrcodeCtrl', function($scope, $rootScope, $uibModalInstance, orderId, saveas) {
        $scope.url = 'http://' + $rootScope.wxUser.appid + '.' + config.clientUri + '/gift/listen/' + orderId;
        $scope.saveas = saveas;
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('GiftWxOrderQrcodeCtrl', function($scope, $rootScope, $uibModalInstance, RestGift, orderId) {
        RestGift.one('wx_qrcode').one(orderId).get().then(function(ticket) {
            $scope.qrcode_ticket = ticket;
        });
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('GiftOrderShippingCtrl', function($scope, $uibModalInstance, Alert, RestOrderGift, order, companies, $log, receiver) {
        $scope.express = {
            companies: companies
        };
        $scope.order = order;
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.shipping = function() {
            if (!receiver) {
                return Alert.add('warn', '一键发货，暂不支持');
            } else {
                RestOrderGift.one(order.id)
                    .one(receiver.id)
                    .customPUT({
                        express: {
                            no: $scope.order.express.no, // 快递单号
                            company: {
                                id: $scope.order.express.company.id, // 快递公司 id
                                name: $scope.order.express.company.name // 快递公司名称
                            }
                        }
                    })
                    .then(function(data) {
                        // get the response
                        Alert.add('success', data.message);
                        $uibModalInstance.close(true);
                    }, function(err) {
                        // get an error
                        Alert.add('error', '设置失败！');
                        $log.error('RestOrderGift', err);
                    });
            }
        };
    });
