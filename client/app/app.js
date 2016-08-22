'use strict';

var req = new XMLHttpRequest();
req.open('GET', '/api/configs', false);
req.send(null);
var config = JSON.parse(req.responseText);
var apiUrl = config.uri; //merchant commodity 需要这个变量
var token = '';

function getUrlVars() {
  var vars = [],
    hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}
var auth_code = getUrlVars()["auth_code"];
if (auth_code) {
  req.open('GET', config.uri + '/wechat/component/auth?auth_code=' + auth_code, false);
  req.setRequestHeader('X-API-From', config.from);
  req.setRequestHeader('X-Component', config.component);
  req.send(null);
  token = JSON.parse(req.responseText).token;
}

var hostname = window.location.hostname.split('.');
var env = hostname[0];

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

  RestangularProvider.setBaseUrl(config.uri);
  //$breadcrumbProvider.setOptions({templateUrl: 'app/breadcrumb/breadcrumb.html'});

  tinyMCE.baseURL = '/bower_components/tinymce-dist';
}).run(function(appConfig, $rootScope, $location, $cookieStore, $log, $state, $window, Restangular, RestWecom, Alert, $uibModal) {
  $rootScope.appConfig = _.assign(appConfig, config);
  $rootScope.phtUri = 'https://photo.91pintuan.com';
  $rootScope.phtStl320160 = '@1e_1c_0o_0l_399sh_160h_320w_100q.src|watermark=2&text=OTHmi7zlm6I&type=ZHJvaWRzYW5zZmFsbGJhY2s&size=8&t=63&s=58&color=I2U2ZGVkZQ&p=9&y=5&x=5';
  $rootScope.phtStl320 = '@1e_1c_0o_0l_399sh_320h_320w_100q.src|watermark=2&text=OTHmi7zlm6I&type=ZHJvaWRzYW5zZmFsbGJhY2s&size=12&t=52&s=57&color=I2ZmZmZmZg&p=9&y=5&x=5';
  $rootScope.phtStl120 = '@1e_1c_0o_0l_100sh_120h_120w_90q.src';

  $rootScope.$on("$stateChangeError", console.log.bind(console));
  $rootScope.env = hostname[0];
  Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
    if (response.status === 401) {
      $cookieStore.remove('token');
      Restangular.setDefaultHeaders({
        'X-API-From': config.from
      });
      Restangular.setDefaultHeaders({
        'X-Component': config.component
      });
      //location.href = '/login'
    }
    if (response.data &&response.data.errmsg) {
      Alert.add('danger', response.data.errmsg);
    } else {
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
  if (auth_code) $location.url($location.path()); //去掉后缀
  var headers = {
    'X-API-From': config.from,
    'X-Component': config.component
  };
  Restangular.setDefaultHeaders(headers);
  if (token) $cookieStore.put('token', token);
  if ($cookieStore.get('token')) {
    headers.Authorization = $cookieStore.get('token');
    Restangular.setDefaultHeaders(headers);
    RestWecom.one('auth').one('info').get().then(function(wxUser) {
      if(wxUser.pay_config){
        return $state.go('bambu.contact');
      }
      $rootScope.wxUser = wxUser;
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
    var num = $rootScope.wxUser?$rootScope.wxUser.num:{};
    if(!_.includes(to.name,'plans') && !_.includes(to.name,'bambu') && num.pay >= num.plans) {
      $uibModal.open({
        templateUrl: 'app/main/null.html',
        controller: 'NullModalCtrl'
      });
    }
  });
});
