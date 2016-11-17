'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the tplaboratorioIv2016App
 */
angular.module('tplaboratorioIv2016App')
  .controller('LoginCtrl', function ($scope) {
    

    $scope.passwd = 'John Doe';
    $scope.email = 'john.doe@gmail.com';

    /*$scope.usuario.mail = 'lucas';
    $scope.usuario.passwd = 'asdfasdf';*/

    $scope.loguear = function(){
    	alert('funciona');
    }
  });
