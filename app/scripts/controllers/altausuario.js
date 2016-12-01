'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:AltausuarioCtrl
 * @description
 * # AltausuarioCtrl
 * Controller of the tplaboratorioIv2016App
 */
angular.module('tplaboratorioIv2016App')
  .controller('AltausuarioCtrl', function ($stateParams,$scope,dataFactory, personas,$state) {

    $scope.persona = {};
    $scope.title = "Alta de usuario";
    $scope.textButton = "Agregar usuario";
    console.info($stateParams);

    if($stateParams.id)
    {
        $scope.title = "Editar Usuario";
        $scope.textButton = "Actualizar";
        personas.BuscarPorId($stateParams.id).then(function(success){
            console.info("respuesta",success.data);
                $scope.persona = success.data;
        },
        function(error){
            console.log(error);
        });
    }
    

    /*var element = dataFactory.getEditElement();
    if(element){
    	console.info("persona",element);
    	$scope.persona = element;
    }*/

    $scope.accionBoton = function(){
        if($stateParams.id)
        {
            personas.Modificar($scope.persona).then(function(success){
                $state.go('usuarios');
            },
            function(error){
                console.log(error);
            });
        }
        else
        {
            personas.Agregar($scope.persona).then(function(success){
                $state.go('usuarios');
            },
            function(error){
                console.log(error);
            });   
        }
    };


  });
