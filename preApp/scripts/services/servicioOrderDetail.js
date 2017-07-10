angular
  .module('tplaboratorioIv2016App')
  .constant('orderDetailPath','order-detail')
  .constant('orderDetailByOrder','by-order')
  .service('orderDetail', function ($http,routeFactory,orderDetailPath,orderDetailByOrder) {

  	this.obtenerTodos = function(){

      var url = routeFactory.getApiRoute(orderDetailPath);
  		return $http.get(url);
  	};


  	this.BuscarPorId = function(id){
		var url = routeFactory.getApiRoute(orderDetailPath,id);
        return $http.get(url);
  	};

	this.BuscarPorOrdenId = function(id){
		var url = routeFactory.getApiRoute(orderDetailPath + '/' + orderDetailByOrder,id);
        return $http.get(url);
  	};

  	this.BorrarPorId = function(id){
  	     var url = routeFactory.getApiRoute(orderDetailPath,id);
         return $http.delete(url);
  	};

  	this.Modificar = function(producto){
  		var url = routeFactory.getApiRoute(orderDetailPath);
        return $http.put(url,producto);
  	};

  	this.Agregar = function(producto){
  		var url = routeFactory.getApiRoute(orderDetailPath);
        return $http.post(url,producto);
  	};

	


  });