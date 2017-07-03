'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tplaboratorioIv2016App
 */

angular.module('tplaboratorioIv2016App')
  .controller('RegisterCtrl', function($scope, $stateParams)  {
    $scope.email = '';
    console.info($stateParams);
    if ($stateParams.mail !== undefined && $stateParams.mail !== '') {
      $scope.email = $stateParams.mail;
      console.info($stateParams.mail);
    }

  });
