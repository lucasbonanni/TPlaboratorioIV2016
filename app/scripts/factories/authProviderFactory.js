angular
.module('tplaboratorioIv2016App')
.constant("authConst", {
        "baseUrl": "http://localhost",
        "port": "80",
        "loginUrl": "/personaSlim/ws1/login"
    })
.factory('authProviderFactory',function($compile,authConst){
	var colon = ':';
	var authProvider = {};
	authProvider.baseUrl = authConst.baseUrl + colon + port;
	authProvider.loginUrl = authConst.loginUrl;
	authProvider.tokenName = 'MiTokenGeneradoEnPHP';
    authProvider.tokenPrefix = 'Aplicacion';
    authProvider.tokenHeader = 'data';

    return authProvider;
});