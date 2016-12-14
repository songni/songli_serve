'use strict';

angular.module('serveApp')
  .controller('PoiCtrl',function(){
  })
  .controller('PoiListCtrl', function (
    $scope,$rootScope,$state,$stateParams,$uibModal,$log,$location,
    Alert,RestPoi,RestCate) {
    $rootScope.title = '门店管理';
    $rootScope.ico = 'location-arrow';
    $scope.reload = false;
    $scope.pagi = {
      totalItems: 0,
      currentPage : 1,
      maxSize : 5,
      itemsPerPage : 15,
      all:0,
      tag:''
    };
    $scope.sort = {
      select:'',
      list:[
         {key:'default',name:'默认'},
         {key:'commodity',name:'商品'},
         {key:'partaker',name:'订单'},
         {key:'scan_partaker',name:'核销订单'},
         {key:'amount',name:'销售额'},
         {key:'scan_amount',name:'核销额度'},
         {key:'scanner',name:'扫码员'}
      ]
    };
    RestPoi.one('count').get().then(function(data){
      $scope.pagi.all = data || 0;
    });
    var listToW = '[pagi.currentPage,pagi.itemsPerPage,area.province,area.city,area.district,area.keyword,sort.select,pagi.tag,reload]';
    $scope.$watchCollection(listToW, function(newVal) {
      var params = {
        page:newVal[0],
        limit:newVal[1]
      };
      if(newVal[2]) {params.province = newVal[2].name;}
      if(newVal[3]) {params.city = newVal[3].name;}
      if(newVal[4]) {params.district = newVal[4].name;}
      if(newVal[5]) {params.keyword = newVal[5];}
      if(newVal[6]) {params.sort = newVal[6].key;}
      if(newVal[7]) {params.tag = newVal[7].id;}
      // if($stateParams.id) {params.tag = $stateParams.id;}
      RestPoi.one('count').get(params).then(function(data){
        $scope.pagi.totalItems = data || 0;
      });
      RestPoi.getList(params).then(function(pois) {
        $scope.pois = pois;
      });
      $scope.loadTags();
    },true);
    $scope.flushPoiList = function(){
      RestPoi.one('flush').put().then(function(data){
        Alert.add('success',data.message);
        location.reload();
      });
    };
    $scope.delPoi = function(){
      var action=confirm('确认删除该门店吗？');
      if (action === false){
        return false;
      }
      var poi = this.poi;
      RestPoi.one(poi.id).remove().then(function(data){
        Alert.add('success',data.errmsg);
        $state.reload();
      });
    };

    $scope.provinces = [
      {id:999999,name:'全部',py:'all'},
      {id:110000,name:'北京市',py:'beijing'},
      {id:310000,name:'上海市',py:'shanghai'},
      {id:330000,name:'浙江省',py:'zhejiang'},
      {id:320000,name:'江苏省',py:'jiangsu'},
      {id:440000,name:'广东省',py:'guangdong'},
      {id:210000,name:'辽宁省',py:'liaoning'},
      {id:520000,name:'贵州省',py:'guizhou'},
      {id:340000,name:'安徽省',py:'anhui'},
      {id:500000,name:'重庆市',py:'chongqing'},
      {id:350000,name:'福建省',py:'fujian'},
      {id:510000,name:'四川省',py:'sichuan'},
      {id:120000,name:'天津省',py:'tianjin'},
      {id:130000,name:'河北省',py:'hebei'},
      {id:430000,name:'湖南省',py:'hunan'},
      {id:460000,name:'海南省',py:'hainan'},
      {id:370000,name:'山东省',py:'shandong'},
      {id:140000,name:'山西省',py:'shanxi'},
      {id:610000,name:'陕西省',py:'shan3xi'},
      {id:230000,name:'黑龙江省',py:'heilongjiang'},
      {id:220000,name:'吉林省',py:'jilin'},
      {id:410000,name:'河南省',py:'henan'},
      {id:420000,name:'湖北省',py:'hubei'},
      {id:360000,name:'江西省',py:'jiangxi'},
      {id:150000,name:'内蒙古自治区',py:'neimenggu'},
      {id:640000,name:'宁夏回族自治区',py:'ningxia'},
      {id:630000,name:'青海省',py:'qinghai'},
      {id:650000,name:'新疆维吾尔自治区',py:'xinjiang'},
      {id:540000,name:'西藏自治区',py:'xizang'},
      {id:530000,name:'云南省',py:'yunnan'},
      {id:620000,name:'甘肃省',py:'ganshu'},
      {id:450000,name:'广西壮族自治区',py:'guangxi'},
    ];

    $scope.area = { province: '',city:'',district:'' };//$scope.provinces[0]
    $scope.$watch('area.province',function(newVal){
      if(!newVal) {return;}
      $scope.area.city = {};
      $scope.area.district = {};
      if(newVal.py === 'all') {$scope.area.province = '';return;}
      RestPoi.one('city').get({province:newVal.py}).then(function(data){
        $scope.cities = data.city;
        //$scope.area.city = $scope.cities[0];
      });
    });
    $scope.$watch('area.city',function(newVal){
      if(!newVal) {return;}
      $scope.area.district = {};
      //$scope.area.district = newVal.district[0];
    });
    //标签管理
    $scope.add_tags = {tag:'',close:false};
    $scope.loadTags = function(){
      RestCate.getList({type:'poi_tag'}).then(function(tags){
        $scope.tags = tags.plain();
      });
    };

    $scope.addTag = function(){
      RestCate.one('add_poi_tag').post('',{tag:$scope.add_tags.tag}).then(function(){
        $scope.loadTags();
        $scope.add_tags.close = false;
      });
    };
    $scope.editTag = function(){
      var tag = this.tag;
      RestCate.one(tag.id).post('',{name:tag.name}).then(function(){
      });
    };
    $scope.delTag = function(){
      var action=confirm('确认删除该标签吗？');
      if (action === false){
        return false;
      }
      var tag = this.tag;
      RestCate.one(tag.id).remove().then(function(){
        tag = undefined;
        $scope.pagi.tag = {};
      });
    };
    /*
        var poisCommSel = [];
        if($scope.commodity.pois.length) {//检测是否已经选择门店
          angular.forEach($scope.commodity.pois,function(poi,key){
            if(!!poi === false) return;
            this.push(poi.id);
          },poisCommSel);
        }
        var poisComm = [];
        angular.forEach(pois.business_list,function(poi,key){
          if(_.includes(poisCommSel,poi.id)) this.push(poi.id);
          else this.push(null);
        },poisComm);
        $scope.commodity.pois = poisComm;
    */
    $scope.poiAddTag = function(){
      var poi = this.poi;
      poi.put().then(function(data){
        poi.tagspop = false;
        Alert.add('success',data.message);
        $scope.reload = !$scope.reload;
      });
      RestCate.one('stats').one('tags').post('',{tags:$scope.seltags}).then(function () {
        $scope.loadTags();
      });
    };
    $scope.seltags = [];
    $scope.poiSelTag = function (checked) {
      if(checked) {return false;}
      var tag = this.tag.id;
      if(!_.includes($scope.seltags,tag)){
        $scope.seltags.push(tag);
      }
    };
    //取消
    $scope.poiAddTagCancel = function(){
      this.poi.tagspop = false;
      $scope.reload = !$scope.reload;
    };
    $scope.selpoi = {
      selall:false,
      tagspop:false,
      ids:[],
      tags:[]
    };
    $scope.selAll = () => {
      if($scope.selpoi.selall){
        var poiids = [];
        var pois = $scope.pois.plain();
        for(var i in pois){
          poiids.push(pois[i].id);
        }
        $scope.selpoi.ids = poiids;
      }else{
        $scope.selpoi.ids = [];
      }
    };
    $scope.poisAddTag = () => {
      var selpoi = $scope.selpoi;
      var tags = [];
      for(var i in selpoi.tags){
        tags.push(selpoi.tags[i].id);
      }
      RestPoi.one('batch').one('tags').post('', {pois:selpoi.ids,tags:tags}).then(function(data){
        selpoi.tagspop = false;
        $scope.selpoi.tags = [];
        $scope.selpoi.ids = [];
        $scope.selpoi.selall = false;
        Alert.add('success', data.message);
        $scope.reload = !$scope.reload;
      });
    };
    $scope.poisClose = () => {
      $scope.selpoi.tagspop = false;
    };
    $scope.addScanner = poi => {
      var modalInstance = $uibModal.open({
        templateUrl: 'app/poi/poi.scanner.html',
        controller: 'PoiScannerModalCtrl',
        resolve: {
          poi: function () {
            return poi;
          }
        }
      });
      modalInstance.result.then(reload => {
        $scope.reload = reload;
      }, () => {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    $scope.stockup = poi => {
      var modalInstance = $uibModal.open({
        templateUrl: 'app/poi/poi.stockup.modal.html',
        controller: 'PoiStockupModalCtrl',
        resolve: {
          poi: function () {
            return poi;
          }
        }
      });
      modalInstance.result.then(() => {
        //$scope.reload = reload;
      }, () => {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    $scope.addDevice = () => {
      var poi = this.poi;
      var device = this.device;
      var modalInstance = $uibModal.open({
        templateUrl: 'app/poi/device.html',
        controller: 'DeviceCtrl',
        size:'sm',
        resolve: {
          poi: function () {
            return poi;
          },
          device: function (){
            return device;
          }
        }
      });
      modalInstance.result.then(result => {
        $scope.reload = !$scope.reload;
      }, reason => {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  })
  .controller('PoiScannerModalCtrl', function($scope, $uibModalInstance, poi){
      poi.one('scanner').one('qrcode').one('ticket').get().then(function (data) {
        $scope.qrcodeTicket = data;
      });
      $scope.ok = function () {
        var rnd = Math.floor((Math.random()*6)+1);
        $uibModalInstance.close(rnd);
      };
  })
  .controller('PoiStockupModalCtrl',function($scope,$uibModalInstance,RestGift,poi){
      $scope.poi = poi;
      RestGift.one('poi').get({poi: poi.id}).then(function (comms) {
        $scope.comms = comms;
      });
  })
  .controller('DeviceCtrl',function($scope,$uibModalInstance,Alert,poi,device){
    $scope.submitted = false;
    if(!device){
      $scope.device = {company:{name:'客来乐',id:'kelaile'}};
    }else{
      $scope.device = device;
    }
    $scope.poi = poi; 
    $scope.setDevice = function(){
      if ($scope.deviceForm.$invalid) {
        $scope.submitted = true;
        return false;
      }
      poi.one('device').post('',$scope.device).then(function(data){
        Alert.add('success',data.message);
        $uibModalInstance.close(data.message);
      });
    };
    $scope.delDevice = function(){
      poi.one('device').one(device.id).remove().then(function(data){
        Alert.add('success',data.message);
        $uibModalInstance.close(data.message);
      });
    };
  })
;

