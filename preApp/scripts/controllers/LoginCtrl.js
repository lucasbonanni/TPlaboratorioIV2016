'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tplaboratorioIv2016App
 */

 angular.module('tplaboratorioIv2016App')
   .controller('LoginCtrl', function ($scope, $state){
     $scope.email = '';

     $scope.registrar = function(){
       if($scope.email !== ''){
          $state.go('shop.register',{mail:$scope.email});
       }
     };
   });
