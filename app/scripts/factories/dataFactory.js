'use strict';
angular
.module('tplaboratorioIv2016App')
.factory('dataFactory',function () {
	// body...
	var service = {};

	var data = {};

	var object ={};

	var elmentToEdit ={};

	function setService(serv) {
		service = serv;
	};

	function getData() {
		return data;
	};

	function obtenerTodos() {
		return service.TraerTodasLasPersonas().then(function(respuesta){
			data = respuesta.data;
			return  respuesta;
		},function(error) {
			console.info(error);
			return error;
		});
	};

	function borrarElemento(index) {
		var element = data[index];
		console.info('element',element);
		service.BorrarPersona(element.id).then(function(rta){
			console.info(rta);
			console.info("index",index);
			if (index > -1) {
			    $scope.grilla.datos.splice(index, 1);
			}
		},function(error){
			console.info(error);
		});
	};

	object.setService = setService;
	object.getData = getData;
	object.obtenerTodos = obtenerTodos;
	object.borrarElemento = borrarElemento;


	return object;

});