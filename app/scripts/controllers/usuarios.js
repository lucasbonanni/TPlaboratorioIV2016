'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:UsuariosCtrl
 * @description
 * # UsuariosCtrl
 * Controller of the tplaboratorioIv2016App
 */
angular.module('tplaboratorioIv2016App')
  .controller('UsuariosCtrl', function ($scope,personas, dataFactory,$location,$routeParams) {


    console.info("param id",$routeParams.id);
    $scope.grilla = {};

	$scope.grilla.columnas = ['nombre','mail','tipo'];

	dataFactory.setService(personas);

	dataFactory.obtenerTodos().then(function(respuesta){
		$scope.grilla.datos = dataFactory.getData();
	});



	$scope.borrar =function(index)
	{
		dataFactory.borrarElemento(index);
	}

	$scope.editarPersona = function(persona) {
		dataFactory.editarElemento(persona);
		//console.info("persona",persona);
		$location.path('/altaUsuario').search({id: persona.id });
	}



  });
