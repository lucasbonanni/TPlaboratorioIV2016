'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tplaboratorioIv2016App
 */

angular.module('tplaboratorioIv2016App')
  .controller('RegisterCtrl', function($scope, $stateParams,$state, servicioLogin, users)  {
    var loguarse = loguarse;
    var registrarse = registrarse;
    
    $scope.usuario = {};
    // $scope.usuario.email = '';
    // $scope.usuario.nombre = '';
    // $scope.usuario.password = '';
    if ($stateParams.mail !== undefined && $stateParams.mail !== '') {
      $scope.usuario.email = $stateParams.mail;
      console.info($stateParams.mail);

      
    }


    function registrarse(){
      users.Agregar($scope.usuario);
      loguarse();
    }


    function loguarse(){
        servicioLogin.doLogin($scope.usuario).then (function(rta){
          $state.go('shop.home');
        }, function(error){
          servicioLogin.doLogin($scope.usuario).then (function(rta){
            $state.go('shop.home');
          }, function(error){
            alert(error);
          });
        });
      }


  });
