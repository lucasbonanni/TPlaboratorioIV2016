'use strict';
angular
.module('tplaboratorioIv2016App')
.factory('dataFactory',function () {
	// body...
	var service = {};

	var data = {};

	var object = {};

	var elementToEdit = {};

	function setService(serv) {
		service = serv;
	};

	function getData() {
		return data;
	};

	function obtenerTodos() {
		return service.obtenerTodos().then(function(respuesta){
			data = respuesta.data;
			elementToEdit = {};
			return  respuesta;
		},function(error) {
			console.info(error);
			return error;
		});
	};

	function borrarElemento(index) {
		var element = data[index];
		console.info('element',element);
		elementToEdit = {};
		service.BorrarPorId(element.id).then(function(rta){
			console.info(rta);
			console.info("index",index);
			if (index > -1) {
			    data.splice(index, 1);
			}
		},function(error){
			console.info(error);
		});
	};

	function editarElemento(argument) {
		elementToEdit = argument;
	};

	function getEditElement() {
		return elementToEdit;
	};

	object.getEditElement = getEditElement;
	object.editarElemento = editarElemento;
	object.setService = setService;
	object.getData = getData;
	object.obtenerTodos = obtenerTodos;
	object.borrarElemento = borrarElemento;


	return object;

});