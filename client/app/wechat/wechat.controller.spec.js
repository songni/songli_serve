'use strict';

describe('Controller: WechatCtrl', function () {

  // load the controller's module
  beforeEach(module('serveApp'));

  var WechatCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WechatCtrl = $controller('WechatCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
