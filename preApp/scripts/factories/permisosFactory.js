angular
  .module('tplaboratorioIv2016App')
  .factory('permisosFactory', function ($http, servicioLogin) {

  	var profile = {};
  	var defaultView;

  	function isAuthenticated(){
  		getPayload();
  		return servicioLogin.isAuthenticated();
  	};

  	function getPayload(){
  		var payload = {};
        payload = servicioLogin.getPayload();
  		if(payload){
  			profile = payload['perfil'];
  		
      		if(payload['defaultView']){
      			defaultView = payload['defaultView'];
      		}
        }
        else
        {
            profile = '';
        }
  	};

  	function isAdministrator(){
        if(profile == 'A' || profile == 'administrador')
        {
            return true;
        }
        return false;
  	};

  	function isUser(){
        if(profile == 'C' || profile == 'user')
        {
            return true;
        }
        return false;
  	};

    function getDefaultView() {
        return defaultView;
    };

    var objecto = {};

    objecto.isAuthenticated = isAuthenticated;
    objecto.getPayload = getPayload;
    objecto.isAdministrator = isAdministrator;
    objecto.isUser = isUser;
    return objecto;

  });