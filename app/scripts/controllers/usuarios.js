'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:UsuariosCtrl
 * @description
 * # UsuariosCtrl
 * Controller of the tplaboratorioIv2016App
 */
angular.module('tplaboratorioIv2016App')
  .controller('UsuariosCtrl', function ($scope,personas) {
    /*this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];*/

    $scope.grilla = {};

	$scope.grilla.columnas = ['nombre','mail','tipo'];

	personas.TraerTodasLasPersonas().then(function(rta){
		console.info(rta.data);
		$scope.grilla.datos = rta.data;
	},function(error){
		console.info("error",error);
	});

	$scope.borrar =function(id)
	{
		personas.BorrarPersona(id).then(function(rta){
			console.info(rta);
		},function(error){
			console.info(error);
		});
	};

  });
