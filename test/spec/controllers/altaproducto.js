'use strict';

describe('Controller: AltaproductoCtrl', function () {

  // load the controller's module
  beforeEach(module('tplaboratorioIv2016App'));

  var AltaproductoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AltaproductoCtrl = $controller('AltaproductoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AltaproductoCtrl.awesomeThings.length).toBe(3);
  });
});
