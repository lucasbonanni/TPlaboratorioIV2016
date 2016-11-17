angular
  .module('tplaboratorioIv2016App')
  .service('productos', function ($http) {

  	this.TraerTodosLosProductos = function(){
  		return $http.get('http://localhost/personaSlim/ws1/productos');
  	};


  	this.TraerUnaProducto = function(id){
  		return $http.get('http://localhost/personaSlim/ws1/productos/'+ id);
  	};

  	this.BorrarProducto = function(id){
  		return $http.delete('http://localhost/personaSlim/ws1/productos/'+ id);
  	};

  	this.ModificarProducto = function(usuario){
  		return $http.put('http://localhost/personaSlim/ws1/productos/',usuario);
  	};

  	this.InsertarProducto = function(usuario){
  		return $http.post('http://localhost/personaSlim/ws1/productos/',usuario);
  	};


  });