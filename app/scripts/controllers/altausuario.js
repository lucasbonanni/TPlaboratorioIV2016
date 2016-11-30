'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:AltausuarioCtrl
 * @description
 * # AltausuarioCtrl
 * Controller of the tplaboratorioIv2016App
 */
angular.module('tplaboratorioIv2016App')
  .controller('AltausuarioCtrl', function ($stateParams,$scope,dataFactory) {

    $scope.persona = {};
    $scope.title = "Alta de usuario";
    $scope.textButton = "Agregar usuario";
    console.info($stateParams);

    if($stateParams.id)
    {
        $scope.title = "Editar Usuario";
        $scope.textButton = "Actualizar";
    }
    

    var element = dataFactory.getEditElement();
    if(element){
    	console.info("persona",element);
    	$scope.persona = element;
    }


  });
