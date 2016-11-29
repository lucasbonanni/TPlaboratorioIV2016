'use strict';

/**
 * @ngdoc overview
 * @name tplaboratorioIv2016App
 * @description
 * # tplaboratorioIv2016App
 *
 * Main module of the application.
 */
angular
  .module('tplaboratorioIv2016App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'satellizer',
    'ui.router'
  ])
.config(function ($authProvider,$stateProvider,$urlRouterProvider) {
    $authProvider.baseUrl = 'http://localhost'
    $authProvider.loginUrl = '/personaSlim/ws1/login';
    $authProvider.tokenName = 'MiTokenGeneradoEnPHP';
    $authProvider.tokenPrefix = 'Aplicacion';
    $authProvider.tokenHeader = 'data';
    $authProvider.storageType = 'localStorage';
    $authProvider.withCredentials = false;

    $stateProvider
    .state('main', {
      url:'/',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .state('productos', {
      url:'/productos',
      templateUrl: 'views/productos.html',
      controller: 'ProductosCtrl' 
    })
    .state('login', {
        url:'/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
    })
    .state('usuarios',{
        url:'/usuarios',
        templateUrl: 'views/usuarios.html',
        controller: 'UsuariosCtrl'
    })
    .state('altaProducto', {
        url:'/altaProducto',
        templateUrl: 'views/altaproducto.html',
        controller: 'AltaproductoCtrl'
      })
    .state('altaUsuario', {
        url:'/altaUsuario',
        templateUrl: 'views/altausuario.html',
        controller: 'AltausuarioCtrl'
    })
    $urlRouterProvider.otherwise('/');
  })
  .run(function ($rootScope, $location, servicioLogin,permisosFactory,$auth) {
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams, options) {
            permisosFactory.getPayload();
            $rootScope.isAdministrator = permisosFactory.isAdministrator();
            $rootScope.isUser = permisosFactory.isUser();
            console.info("state change isAdmin",permisosFactory.isAdministrator());
            console.info("state change isAuthenticated",$auth.isAuthenticated());

            if(servicioLogin.isAuthenticated()){
              
              //get payload of authFactory
              //if is authenticated do nothing
            } else
            {
              //if not autenticated redirecte to home
            }
        });
    });
