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
]).config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $logProvider, RestangularProvider, $breadcrumbProvider) {
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);

  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  $logProvider.debugEnabled('enable'); //disable

  RestangularProvider.setBaseUrl(config.uri);
  //$breadcrumbProvider.setOptions({templateUrl: 'app/breadcrumb/breadcrumb.html'});

  tinyMCE.baseURL = '/bower_components/tinymce-dist';
}).run(function($rootScope, $location, $cookieStore, $log, $state, $window, Restangular, RestWecom, Alert) {
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
    console.warn($cookieStore.get('token'))
    headers.Authorization = $cookieStore.get('token');
    Restangular.setDefaultHeaders(headers);
    RestWecom.one('auth').one('info').get().then(function(wxUser) {
      if(!wxUser.pay_config){
        $state.go('bambu.contact');
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
});
