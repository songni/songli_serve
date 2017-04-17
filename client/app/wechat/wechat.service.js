'use strict';

angular.module('serveApp')
  .service('RestWechat', function (Restangular) {
	  return Restangular.service('wechat');
  })
  .service('RestWecom', function (Restangular) {
	  return Restangular.one('wechat').one('component');
  })
  .service('RestWxMenu', function (RestWechat) {
	  return RestWechat.one('menu');
  })
  .service('RestWxReply', function (Restangular) {
    return Restangular.service('wechat/reply');
  })
  .service('RestPubno', function (Restangular) {
    return Restangular.service('pubno');
  })
;
