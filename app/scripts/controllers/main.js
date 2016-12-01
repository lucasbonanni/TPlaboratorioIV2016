'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tplaboratorioIv2016App
 */
angular.module('tplaboratorioIv2016App')
  .controller('MainCtrl', function ($scope,productos,permisosFactory,dataFactory,$location) {

    dataFactory.setService(productos);

	$scope.grilla = {};

	$scope.grilla.columnas = ['id','nombre','descripcion','precio'];

	dataFactory.obtenerTodos().then(function(respuesta){
        $scope.grilla.datos = dataFactory.getData();
    });


	$scope.borrar =function(index)
	{
		dataFactory.borrarElemento(index);
	};


    $scope.editarProducto = function(producto) {
        dataFactory.editarElemento(producto);
        //console.info("producto",producto);
        $location.path('/altaProducto').search({id: producto.id });
    }

	
  });
