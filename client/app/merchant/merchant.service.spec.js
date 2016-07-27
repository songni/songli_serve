'use strict';

describe('Service: merchant', function () {

  // load the service's module
  beforeEach(module('serveApp'));

  // instantiate service
  var merchant;
  beforeEach(inject(function (_merchant_) {
    merchant = _merchant_;
  }));

  it('should do something', function () {
    expect(!!merchant).toBe(true);
  });

});
