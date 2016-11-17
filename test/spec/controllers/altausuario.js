'use strict';

describe('Controller: AltausuarioCtrl', function () {

  // load the controller's module
  beforeEach(module('tplaboratorioIv2016App'));

  var AltausuarioCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AltausuarioCtrl = $controller('AltausuarioCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AltausuarioCtrl.awesomeThings.length).toBe(3);
  });
});
