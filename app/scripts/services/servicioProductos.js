angular
  .module('tplaboratorioIv2016App')
  .constant('productsPath','productos')
  .service('productos', function ($http,routeFactory,productsPath) {

  	this.obtenerTodos = function(){

      var url = routeFactory.getApiRoute(productsPath);
  		return $http.get(url);
  	};


  	this.BuscarPorId = function(id){
		var url = routeFactory.getApiRoute(productsPath,id);
        return $http.get(url);
  	};

  	this.BorrarPorId = function(id){
  	     var url = routeFactory.getApiRoute(productsPath,id);
         return $http.delete(url);
  	};

  	this.Modificar = function(producto){
  		var url = routeFactory.getApiRoute(productsPath);
        return $http.put(url,producto);
  	};

  	this.Agregar = function(producto){
  		var url = routeFactory.getApiRoute(productsPath);
        return $http.post(url,producto);
  	};


  });