angular
  .module('tplaboratorioIv2016App')
  .service('servicioLogin', function ($http,$auth) {

  	var user = {};

  	var userProfile = {};

  	this.doLogin = function(user, password){
  		user.mail = 'lucas@test.com';
  		user.clave = 'miclave';
  		return $auth.login(user).then(function(respuesta){
            return respuesta;
        }, function(error){
            return error;
        });
  	};

  	this.authenticate = function(name, [userData]){
  		return $auth.authenticate(name, [userData]);
  	};

  	this.getPayload = function(){
  		return $auth.getPayload();
  		//userProfile = payload['profile'];
  	};

  	this.isAuthenticated = function(){
      console.info("servicioLogin is authenticate",$auth.isAuthenticated());
  		return $auth.isAuthenticated();
  	};

  	this.getToken= function(){
  		return $auth.getToken();
  	};

  	this.logout = function(){
  		return $auth.logout();
  	};

  	this.signup = function(user, [options]){
  		return $auth.signup(user, [options]);
  	};

  });