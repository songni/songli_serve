angular.module('serveApp')
	.controller('BigpackOrderListCtrl', ($scope, $rootScope, $uibModal, RestOrderGift) => {
		$scope.itemsPerPageArr = [10, 20, 50, 100, 200];
    $scope.chgPerPage = () => {
      $scope.pagi.itemsPerPage = this.page;
    };
		$scope.status = {
		  online: '',
		  nickname: null
		}
		
		$scope.findByNickame = function() {
      $scope.pagi.nickname = $scope.status.nickname
    }
		
		$scope.pagi = {
			totalItems: 0,
			currentPage: 1,
			maxSize: 5,
			itemsPerPage: 10,
			nickname: null
		};
		
		$scope.$watchCollection('[status.online,pagi.currentPage,pagi.itemsPerPage,pagi.nickname]', function(newVal) {
      RestOrderGift.one('count').get({
        online: newVal[0],
        nickname: newVal[3],
				'status.bigpack': 'true'
      }).then(function(count) {
        $scope.pagi.totalItems = count;
      });
      RestOrderGift.getList({
        online: newVal[0],
        page: newVal[1],
        limit: newVal[2],
        nickname: newVal[3],
				'status.bigpack': 'true'
      })
      .then(function(orders) {
        $scope.orders = orders;
      });
    });
    
    // play video 
		$scope.modalStartVideo = function() {
      var modalInstance = $uibModal.open({
        templateUrl: 'app/bigpack/video.html',
        size: 'lg',
      });
    }
		
		$scope.modalBigpackLink = order => {
			var modalInstance = $uibModal.open({
				templateUrl: 'app/bigpack/bigpack.order.link.modal.html',
				controller: 'BigpackOrderLinkCtrl',
				size: '',
				resolve:{
					order: () => order
				}
			});
		}
		$scope.countShipping = function(order) {
			var count = 0;
			order.receivers.forEach(function(receiver) {
				if (receiver.status.shipping) count++;
			})
			return count;
		}
	})
	.controller('BigpackOrderDetailCtrl', ($scope, RestOrderGift, $rootScope, order, $uibModal, $log, RestExp, RestSuborder) => {
		$rootScope.title = '礼包详情';
		$scope.order = order;
		$scope.order.shipping = order.receivers.filter(r => r.status.shipping).length;
		// $scope.config = config;
		// $scope.order.url = 'http://' + $rootScope.wxUser.appid + '.' + config.clientUri + '/gift/listen/' + order.id;
		RestExp.one('company').get().then(function(companies) {
			$scope.companies = companies;
		});
		$scope.shippingModel = function(receiver) {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'app/gift/gift.order.shipping.html',
				controller: 'GiftOrderShippingCtrl',
				resolve: {
					order: function() {
						return $scope.order;
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
		$scope.exportSuborders = () => {
			RestSuborder.one('export').one('orders')
				.withHttpConfig({
					responseType: "arraybuffer"
				})
				.get({
					order: $scope.order.id
				})
				.then(function(data){
					try {
						var file = new Blob([data], {
							type: 'application/vnd.openxmlformats'
						});
						saveAs(file, $scope.order.id + '.xlsx');
					} catch(e) {
						console.warn(e);
					}
					
				})
		}
		$scope.exportCards = function() {
			var order = this.order;
			if(!order.receivers || !order.receivers.length || order.receivers.filter(function(r){return r.telephone}).length <=0){
					return;
			}
			RestOrderGift.one('export').one('cards').one(order.id)
				.withHttpConfig({
					responseType: "arraybuffer"
				})
				.get({
					ext: 'wx'
				})
				.then(function(data) {
					var file = new Blob([data], {
							type: 'application/octet-stream;charset=utf-8'
					});
					saveAs(file, order.serial + '.zip');
					// var file = new Blob([data], {
					//     type: 'image/png'
					// });
					// saveAs(file, order.serial + '.png');
				});
		};
		$scope.exportCard = function(suborder) {
			if (suborder.card) {
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
					saveAs(file, suborder._id || suborder.id + '.png');
				});
			} else {
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
						saveAs(file, $scope.order.serial + '.png');
					});
			}
		};
	})
	.controller('BigpackOrderLinkCtrl', ($scope, $rootScope, $sce, order) => {
		$scope.order = order;
    var url = `${$rootScope.wxUser.uri}/bigpack/${order.id}`;
    $scope.text = url;
    $scope.url = $sce.trustAsResourceUrl(url);
    
    $scope.getTextToCopy = function() {
			return $scope.text;
    };
    $scope.doSomething = function() {
			alert('复制成功！');
    };
	})
	.controller('BigpackOrderAddCtrl', ($scope, $rootScope, $state, $uibModal, RestGift, Alert) => {
		$scope.order = {};

		$scope.modalCommodity = () => {
			var modalInstance = $uibModal.open({
				templateUrl: 'app/bigpack/bigpack.commodities.modal.html',
				controller: 'BigpackCommoditiesCtrl',
				size: 'lg',
				resolve:{
					order: () => {
						return $scope.order;
					}
				}
			});
		}

		$scope.$watch('order.capacity', val => $scope.checkStock($scope.order))

		$scope.checkStock = order => {
			let gift =order.gift;
			if (gift) {
				if (gift.num && gift.num.stock > 0) {
					if (order.capacity > gift.num.stock) {
						$scope.stockError = true;
						return true;
					}
				}
			}
			$scope.stockError = false;
			return false;
		}

		$scope.modalConfirm = () => {
			var modalInstance = $uibModal.open({
				templateUrl: 'app/bigpack/bigpack.order.add.confirm.html',
				controller: 'BigpackOrderAddConfirmCtrl',
				size: ''
			});
			return modalInstance
		}

		$scope.post = () => {
			$scope.submitted = true;
			if ($scope.bigpackOrderAddForm.$invalid) {
				return false
			}
			
			if ($scope.checkStock($scope.order)) {
				return false;
			}

			$scope.modalConfirm().result.then(res => {
					RestGift
					.one($scope.order.gift.id)
					.one('order/preorder').post(null, $scope.order).then(data => {
						Alert.add('success', data);
						$scope.submitted = false;
						$state.go('bigpack.list');
					})
			})
		}
	})
	.controller('BigpackOrderAddConfirmCtrl', ($scope, $uibModalInstance) => {
		$scope.cancel = () => $uibModalInstance.dismiss('cancel');
		$scope.submit = () => $uibModalInstance.close('submit');
	})
	.controller('BigpackCommoditiesCtrl', ($scope, $uibModalInstance, RestGift, Alert, order) => {
		$scope.selectedGift = null;
		$scope.chgPerPage = () => {
			$scope.pagi.itemsPerPage = this.page;
		};

		$scope.status = {
			online: true,
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

		$scope.selectCommodity = gift => {
			$scope.selectedGift = gift
		}

		$scope.submit = () => {
			order.gift = $scope.selectedGift;
			$uibModalInstance.dismiss('cancel');
		}
	})
	