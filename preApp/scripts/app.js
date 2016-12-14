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
  .config(function($authProvider, $stateProvider, $urlRouterProvider) {
    $authProvider.baseUrl = 'http://localhost'
    $authProvider.loginUrl = '/personaSlim/ws1/login';
    $authProvider.tokenName = 'MiTokenGeneradoEnPHP';
    $authProvider.tokenPrefix = 'Aplicacion';
    $authProvider.tokenHeader = 'data';
    $authProvider.storageType = 'localStorage';
    $authProvider.withCredentials = false;

    $stateProvider
    // .state('main', {
    //   url: '/',
    //   templateUrl: 'views/shop/home.html',
    //   controller: 'HomeCtrl'
    // })
      .state('shop', {
        // url:'/shop',
        abstract: true,
        templateUrl: 'shop/index.html',
      })
      .state('shop.home', {
        url: '/',
        views: {
          contenido: {
            templateUrl: 'shop/views/home.html',
            controller: 'HomeCtrl'
          }
        }
      })
      .state('shop.product', {
        url: '/product_detail?id',
        views: {
          contenido: {
            templateUrl: 'shop/views/product.html',
            controller: 'ProductCtrl'
          }
        }
      })
      .state('shop.productSummary', {
        url: '/product_summary',
        views: {
          contenido: {
            templateUrl: 'shop/views/product_summary.html',
            controller: 'ProductSummaryCtrl'
          }
        }
      })
      .state('shop.login', {
        url: '/login',
        views: {
          contenido: {
            templateUrl: 'shop/views/login.html',
            controller: 'LoginCtrl'
          }
        }
      })
      .state('shop.register', {
        url: '/register?mail',
        views: {
          contenido: {
            templateUrl: 'shop/views/register.html',
            controller: 'RegisterCtrl'
          }
        }
      })
      .state('shop.contact', {
        url: '/contact',
        views: {
          contenido: {
            templateUrl: 'shop/views/contact.html',
            controller: 'ContactCtrl'
          }
        }
      })
      .state('admin', {
        // url: '/admin',
        abstract: true,
        templateUrl: 'admin/index.html',
      })
      .state('admin.dashboard', {
        url: '/admin/dashboard',
        views: {
          contenido: {
            templateUrl: 'admin/views/dashboard.html',
            controller: 'principalCtrl'
          }
        }
      })
      .state('usuarios', {
        url: '/usuarios',
        templateUrl: 'views/usuarios.html',
        controller: 'UsuariosCtrl'
      })
      .state('altaProducto', {
        url: '/altaProducto?id',
        templateUrl: 'views/altaproducto.html',
        controller: 'AltaproductoCtrl'
      })
      .state('altaUsuario', {
        url: '/altaUsuario?id',
        templateUrl: 'views/altausuario.html',
        controller: 'AltausuarioCtrl'
      })
    $urlRouterProvider.otherwise('/');
  })
  .run(function($rootScope, $location /*, servicioLogin,permisosFactory*/ , $auth) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams, options) {
      var hash = $location.hash();
      if (hash) {
        toParams['#'] = hash;
      }
      /*permisosFactory.getPayload();
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
      }*/
    });
  });
