'use strict';
angular.module('serveApp', [
  'serveApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'restangular',
  'ncy-angular-breadcrumb',
  'angularMoment',
  'ui.tinymce',
  'angularFileUpload',
  'monospaced.qrcode',
  'ngClipboard',
  'ngCsv',
  'bootstrap.fileField',
  'ngHolder',
  'monospaced.elastic'
]).config(function(appConfig, $stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $logProvider, RestangularProvider, $breadcrumbProvider) {
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);

  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  $logProvider.debugEnabled('enable'); //disable

  //$breadcrumbProvider.setOptions({templateUrl: 'app/breadcrumb/breadcrumb.html'});

  tinyMCE.baseURL = '/bower_components/tinymce-dist';
}).run(function(appConfig, $rootScope, $location, $cookieStore, $log, $state, $window, Restangular, RestWecom, Alert, $uibModal) {
  $rootScope.appConfig = window.config = appConfig;
  var apiUri = appConfig.apiUri[$location.host()];
  !apiUri && (apiUri = appConfig.uri);
  Restangular.setBaseUrl(apiUri);
  $rootScope.phtUri = 'https://photo.91pintuan.com';
  $rootScope.phtStl320160 = '@1e_1c_0o_0l_399sh_160h_320w_100q.src|watermark=2&text=OTHmi7zlm6I&type=ZHJvaWRzYW5zZmFsbGJhY2s&size=8&t=63&s=58&color=I2U2ZGVkZQ&p=9&y=5&x=5';
  $rootScope.phtStl320 = '@1e_1c_0o_0l_399sh_320h_320w_100q.src|watermark=2&text=OTHmi7zlm6I&type=ZHJvaWRzYW5zZmFsbGJhY2s&size=12&t=52&s=57&color=I2ZmZmZmZg&p=9&y=5&x=5';
  $rootScope.phtStl120 = '@1e_1c_0o_0l_100sh_120h_120w_90q.src';

  $rootScope.$on("$stateChangeError", console.log.bind(console));
  
  Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
    if (response.status === 401) {
      $cookieStore.remove('token');
      Restangular.setDefaultHeaders({
        'X-API-From': appConfig.from
      });
      Restangular.setDefaultHeaders({
        'X-Component': appConfig.component
      });
      //location.href = '/login'
    }
    if (response.data instanceof ArrayBuffer){
      var decodedString = new TextDecoder('utf-8').decode(new Uint8Array(response.data));
      var obj = JSON.parse(decodedString);
      Alert.add('danger', obj.errmsg);
      return;
    }
    if (response.data &&response.data.errmsg) {
      Alert.add('danger', response.data.errmsg);
    }
    else {
      Alert.add('danger', '系统错误');
    }
  });
  Restangular.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
    if (response.status === 205) {
      $cookieStore.remove('token');
      Alert.add('warning', '刷新重新加载本地内容！');
      location.reload();
    }
    return data;
  });
  // if (auth_code) $location.url($location.path()); //去掉后缀
  var headers = {
    'X-API-From': appConfig.from,
    'X-Component': appConfig.component
  };
  Restangular.setDefaultHeaders(headers);
  // if (token) $cookieStore.put('token', token);
  if ($cookieStore.get('token')) {
    headers.Authorization = $cookieStore.get('token');
    Restangular.setDefaultHeaders(headers);
    RestWecom.one('auth').one('info').get().then(function(wxUser) {
      $rootScope.wxUser = wxUser;
      if(!wxUser.pay_config){
        return $state.go('bambu.contact');
      }
      $rootScope.isVerify = wxUser.verify;
    });
  }
  $rootScope.$on('$stateChangeStart', function(event, next) {
    //event.preventDefault(); 
    if (next.authenticate && !$cookieStore.get('token')) {
      $location.path('/login');
    }
  });
  $rootScope.$on('$stateChangeSuccess', function(event, to) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    $rootScope.innerHeight = 1300;//$window.innerHeight;
    var astrict = $rootScope.wxUser?$rootScope.wxUser.astrict:'ok';
    var num = $rootScope.wxUser?$rootScope.wxUser.num:{};
    if(!_.includes(to.name,'plans') && !_.includes(to.name,'bambu') && astrict !== 'ok') {
      $uibModal.open({
        templateUrl: 'app/main/null.html',
        controller: 'NullModalCtrl'
      });
    }
  });
});
