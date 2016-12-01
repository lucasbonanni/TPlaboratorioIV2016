'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:AltaproductoCtrl
 * @description
 * # AltaproductoCtrl
 * Controller of the tplaboratorioIv2016App
 */
angular.module('tplaboratorioIv2016App')
  .controller('AltaproductoCtrl', function ($stateParams,$scope,dataFactory,productos,$state) {

  	if($stateParams.id)
    {
        $scope.title = "Editar Producto";
        $scope.textButton = "Actualizar";
        productos.BuscarPorId($stateParams.id).then(function(success){
            console.info("respuesta",success.data);
                $scope.producto = success.data;
        },
        function(error){
            console.log(error);
        });
    }


    $scope.accionBoton = function(){
        if($stateParams.id)
        {
            productos.Modificar($scope.producto).then(function(success){
                $state.go('main');
            },
            function(error){
                console.log(error);
            });
        }
        else
        {
            productos.Agregar($scope.producto).then(function(success){
                $state.go('main');
            },
            function(error){
                console.log(error);
            });   
        }
    };

  });
