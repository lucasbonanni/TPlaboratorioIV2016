'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tplaboratorioIv2016App
 */

angular.module('tplaboratorioIv2016App')
  .controller('productsCtrl', function($scope) {
    $scope.myData = [{
      "firstName": "Cox",
      "lastName": "Carney",
      "company": "Enormo",
      "employed": true
    }, {
      "firstName": "Lorraine",
      "lastName": "Wise",
      "company": "Comveyer",
      "employed": false
    }, {
      "firstName": "Nancy",
      "lastName": "Waters",
      "company": "Fuelton",
      "employed": false
    }];

  });
