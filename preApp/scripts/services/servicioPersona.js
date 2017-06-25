'use strict';

angular
  .module('tplaboratorioIv2016App')
  .constant('actionPath','usuarios')
  .service('personas', function ($http,routeFactory,actionPath) {

  	this.obtenerTodos = function(){
      var url = routeFactory.getApiRoute(actionPath);
      //console.info("url",url);
  		return $http.get(url);
  	};


  	this.BuscarPorId = function(id){
      var url = routeFactory.getApiRoute(actionPath,id);
  		return $http.get(url);
  	};

  	this.BorrarPorId = function(id){
      var url = routeFactory.getApiRoute(actionPath,id);
  		return $http.delete(url);
  	};

  	this.Modificar = function(usuario){
      var url = routeFactory.getApiRoute(actionPath);
  		return $http.put(url,usuario);
  	};

  	this.Agregar = function(usuario){
      var url = routeFactory.getApiRoute(actionPath);
  		return $http.post(url,usuario);
  	};

  	this.login = function(usuario){
      var url = routeFactory.getApiRoute('login/');
  		return $http.post(url,usuario);
  	};




  });