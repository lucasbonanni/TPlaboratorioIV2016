'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:UsuariosCtrl
 * @description
 * # UsuariosCtrl
 * Controller of the tplaboratorioIv2016App
 */
angular.module('tplaboratorioIv2016App')
  .controller('UsuariosCtrl', function ($scope,personas, dataFactory) {
    /*this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];*/

    $scope.grilla = {};

	$scope.grilla.columnas = ['nombre','mail','tipo'];

	dataFactory.setService(personas);

	dataFactory.obtenerTodos().then(function(respuesta){
		console.info("")
		$scope.grilla.datos = dataFactory.getData();
	});

	/*var datos = {};

	var datos = dataFactory.getData();

	console.info("elementos grilla",datos);

	$scope.grilla.datos = datos;*/

	$scope.borrar =function(index)
	{
		dataFactory.borrarElemento(index);
	}

/*	personas.TraerTodasLasPersonas().then(function(rta){
		console.info(rta.data);
		$scope.grilla.datos = rta.data;
	},function(error){
		console.info("error",error);
	});

	$scope.borrar =function(index)
	{
		var element = $scope.grilla.datos[index];
		console.info('element',element);
		personas.BorrarPersona(element.id).then(function(rta){
			console.info(rta);
			console.info("index",index);
			if (index > -1) {
			    $scope.grilla.datos.splice(index, 1);
			}
		},function(error){
			console.info(error);
		});
	};*/

  });
