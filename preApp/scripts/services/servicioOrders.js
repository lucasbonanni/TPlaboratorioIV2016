angular
  .module('tplaboratorioIv2016App')
  .constant('ordersPath','orders')
  .service('orders', function ($http,routeFactory,ordersPath) {

  	this.obtenerTodos = function(){

      var url = routeFactory.getApiRoute(ordersPath);
  		return $http.get(url);
  	};


  	this.BuscarPorId = function(id){
		var url = routeFactory.getApiRoute(ordersPath,id);
        return $http.get(url);
  	};

  	this.BorrarPorId = function(id){
  	     var url = routeFactory.getApiRoute(ordersPath,id);
         return $http.delete(url);
  	};

  	this.Modificar = function(producto){
  		var url = routeFactory.getApiRoute(ordersPath);
        return $http.put(url,producto);
  	};

  	this.Agregar = function(producto){
  		var url = routeFactory.getApiRoute(ordersPath);
        return $http.post(url,producto);
  	};


  });