'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tplaboratorioIv2016App
 */
angular.module('tplaboratorioIv2016App')
  .controller('MainCtrl', function ($scope,productos,$cookies) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $cookies.put('unvalor','valor');

    console.info("valor de la cookie -",$cookies.get('unvalor'));

    $scope.grilla = {};

	$scope.grilla.columnas = ['nombre','apellido','mail'];

	productos.TraerTodosLosProductos().then(function(rta){
		console.info(rta.data);
		$scope.grilla.datos = rta.data;
	},function(error){
		console.info("error",error);
	});


	$scope.borrar =function(id)
	{
		productos.BorrarProducto(id).then(function(rta){
			console.info(rta);
		},function(error){
			console.info(error);
		});
	};


	/*$scope.grilla.datos = [
		{
			'nombre': 'lucas',
			'apellido': 'bonanni',
			'mail': 'asdf@bonanni.com'
		},
		{
			'nombre': 'pedro',
			'apellido': 'asdflasdf',
			'mail': 'asdf@bonanni.com'
		},
		{
			'nombre': 'manuel',
			'apellido': 'suarez',
			'mail': 'asdf@bonanni.com'
		}
	];*/
	
  });
