'use strict';
angular
	.module('tplaboratorioIv2016App')
	.constant("myConfig", {
        "base": "http://localhost",
        "port": ":80",
        "api" : "/personaSlim/ws1/"
    })
	.factory('routeFactory', function (myConfig) {
		var objeto = {};
		//var api = {};
		objeto.ApiPersonas = myConfig.base + myConfig.port + myConfig.api;// + api;

		function getApiRoute(action, arg) {
			if(arg){
				return objeto.ApiPersonas + action + '/' + arg;
			}
			return objeto.ApiPersonas + action;
		};

		objeto.getApiRoute = getApiRoute;

		objeto.nombre = "Factory de Rutas";
		
		return objeto;
})