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
    'satellizer'
  ])
  .config(function ($routeProvider,$authProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/productos', {
        templateUrl: 'views/productos.html',
        controller: 'ProductosCtrl',
        controllerAs: 'productos'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/usuarios', {
        templateUrl: 'views/usuarios.html',
        controller: 'UsuariosCtrl',
        controllerAs: 'usuarios'
      })
      .when('/altaProducto', {
        templateUrl: 'views/altaproducto.html',
        controller: 'AltaproductoCtrl',
        controllerAs: 'altaProducto'
      })
      .when('/altaUsuario', {
        templateUrl: 'views/altausuario.html',
        controller: 'AltausuarioCtrl',
        controllerAs: 'altaUsuario'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
