'use strict';

angular.module('serveApp')
    .config(function($stateProvider) {
        $stateProvider
        .state('gift', {
            abstract: true,
            url: '/gift',
            //template: '<ui-view/>',
            templateUrl: 'app/gift/gift.html',
            authenticate: true,
            ncyBreadcrumb: {
                label: '送你'
            }
        })

        .state('gift.post', {
            url: '/post',
            templateUrl: 'app/gift/gift.post.html',
            controller: 'GiftPostCtrl',
            authenticate: true,
            resolve: {
                gift: function() {
                    return {};
                }
            },
            ncyBreadcrumb: {
                label: '发布礼物'
            }
        })

        .state('gift.list', {
            url: '/list',
            templateUrl: 'app/gift/gift.list.html',
            controller: 'GiftListCtrl',
            authenticate: true,
            ncyBreadcrumb: {
                label: '礼物列表'
            }
        })

        .state('gift.order', {
            url: '/order',
            templateUrl: 'app/gift/gift.order.html',
            controller: 'GiftOrderCtrl',
            authenticate: true,
            ncyBreadcrumb: {
                label: '订单列表'
            }
        })

        .state('gift.order.detail', {
            url: '/:id',
            templateUrl: 'app/gift/gift.order.detail.html',
            controller: 'GiftOrderDetailCtrl',
            authenticate: true,
            ncyBreadcrumb: {
                label: '订单状态'
            },
            resolve: {
                order: function($stateParams, RestOrderGift) {　
                    return RestOrderGift.one($stateParams.id).get();
                }
            }
        })

        .state('gift.detail', {
            abstract: true,
            url: '/:id',
            template: '<ui-view/>',
            resolve: {
                gift: function(Restangular, $stateParams) {
                    return Restangular.one('gift', $stateParams.id).get();
                }
            },
            authenticate: true,
            ncyBreadcrumb: {
                label: '送你详情'
            }
        })

        .state('gift.detail.edit', {
            url: '/edit',
            templateUrl: 'app/gift/gift.post.html',
            controller: 'GiftPostCtrl',
            authenticate: true,
            ncyBreadcrumb: {
                label: '编辑礼物'
            }
        })

        .state('gift.detail.qrcode', {
            url: '/qrcode',
            templateUrl: 'app/gift/gift.qrcode.html',
            controller: 'GiftQrcodeCtrl',
            authenticate: true,
            ncyBreadcrumb: {
                label: '送你链接二维码'
            }
        });
    });
