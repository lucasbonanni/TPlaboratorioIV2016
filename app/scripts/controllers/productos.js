'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:ProductosCtrl
 * @description
 * # ProductosCtrl
 * Controller of the tplaboratorioIv2016App
 */
angular.module('tplaboratorioIv2016App')
  .controller('ProductosCtrl', function ($scope) {
    /*this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];*/

    var listaProductos = {};
    $scope.productos = {};
    listaProductos =[{
        	"name": "primero",
        	"price": "70,45",
        	"description": "This is a short description. Lorem ipsum dolor sit amet."
        },{
        	"name": "segundo",
        	"price": "10,45",
        	"description": "This is a short description. Lorem ipsum dolor sit amet."
        },{
        	"name": "tercero",
        	"price": "50,45",
        	"description": "This is a short description. Lorem ipsum dolor sit amet."
        },{
        	"name": "cuarto",
        	"price": "90,45",
        	"description": "This is a short description. Lorem ipsum dolor sit amet."
        }];
        console.info("listaProductos",listaProductos);

        $scope.productos = listaProductos;
        console.info("listaProductos",$scope.productos);

        $scope.grilla = {};

	$scope.grilla.columnas = ['nombre','apellido','mail'];
	$scope.grilla.datos = [
		{
			'nombre': 'lucas',
			'apellido': 'bonanni',
			'mail': 'asdf@bonanni.com',
			'id': '1'
		},
		{
			'nombre': 'pedro',
			'apellido': 'asdflasdf',
			'mail': 'asdf@bonanni.com',
			'id': '2'
		},
		{
			'nombre': 'manuel',
			'apellido': 'suarez',
			'mail': 'asdf@bonanni.com',
			'id': '3'
		}
	];

	$scope.borrar = function(rta){
		alert(rta);
	}

	console.info("grilla",$scope.grilla);
  });
