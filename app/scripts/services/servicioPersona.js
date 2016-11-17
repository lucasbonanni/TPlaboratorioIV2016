angular
  .module('tplaboratorioIv2016App')
  .service('personas', function ($http) {

  	this.TraerTodasLasPersonas = function(){
  		return $http.get('http://localhost/personaSlim/ws1/usuarios/');
  	};


  	this.TraerUnaPersona = function(id){
  		return $http.get('http://localhost/personaSlim/ws1/usuarios/'+ id);
  	};

  	this.BorrarPersona = function(id){
  		return $http.delete('http://localhost/personaSlim/ws1/usuarios/'+ id);
  	};

  	this.ModificarPersona = function(usuario){
  		return $http.put('http://localhost/personaSlim/ws1/usuarios/',usuario);
  	};

  	this.InsertarPersona = function(usuario){
  		return $http.post('http://localhost/personaSlim/ws1/usuarios/',usuario);
  	};

  	this.login = function(usuario){
  		return $http.post('http://localhost/personaSlim/ws1/login',usuario);
  	};




  });