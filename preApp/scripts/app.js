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
        'ui.router',
        'ui.grid',
        'ui.grid.exporter',
        'ui.bootstrap',
        'angularFileUpload',
        'ngMap'
    ])
    .config(function ($authProvider, $stateProvider, $urlRouterProvider) {
        $authProvider.baseUrl = 'http://localhost';
        $authProvider.loginUrl = '/personaSlim/ws1/login';
        $authProvider.tokenName = 'MiTokenGeneradoEnPHP';
        $authProvider.tokenPrefix = 'Aplicacion';
        $authProvider.tokenHeader = 'data';
        $authProvider.storageType = 'localStorage';
        $authProvider.withCredentials = false;

        var shopHeader = {
            templateUrl: 'shop/views/shop.header.html',
            controller: 'shopHeaderCtrl'
        };

        var adminNav = {
            templateUrl: 'admin/views/admin.nav.html',
            controller: 'adminNavCtrl'
        };

        $stateProvider
            .state('shop', {
                abstract: true,
                templateUrl: 'shop/index.html'
            })
            .state('shop.home', {
                url: '/',
                views: {
                    contenido: {
                        templateUrl: 'shop/views/home.html',
                        controller: 'HomeCtrl'
                    },
                    header: shopHeader
                }
            })
            .state('shop.product', {
                url: '/product_detail?id',
                views: {
                    contenido: {
                        templateUrl: 'shop/views/product.html',
                        controller: 'ProductCtrl'
                    },
                    header: shopHeader
                }
            })
            .state('shop.productSummary', {
                url: '/product_summary',
                views: {
                    contenido: {
                        templateUrl: 'shop/views/product_summary.html',
                        controller: 'ProductSummaryCtrl'
                    },
                    header: shopHeader
                }
            })
            .state('shop.login', {
                url: '/login',
                views: {
                    contenido: {
                        templateUrl: 'shop/views/login.html',
                        controller: 'LoginCtrl'
                    },
                    header: shopHeader
                },
                data: { auth: "1951"} 
            })
            .state('shop.register', {
                url: '/register?mail',
                views: {
                    contenido: {
                        templateUrl: 'shop/views/register.html',
                        controller: 'RegisterCtrl'
                    },
                    header: shopHeader
                }
            })
            .state('shop.contact', {
                url: '/contact',
                views: {
                    contenido: {
                        templateUrl: 'shop/views/contact.html',
                        controller: 'ContactCtrl'
                    },
                    header: shopHeader
                }
            })
            .state('admin', {
                abstract: true,
                templateUrl: 'admin/index.html'
            })
            .state('admin.dashboard', {
                url: '/admin/dashboard',
                views: {
                    contenido: {
                        templateUrl: 'admin/views/dashboard.html',
                        controller: 'principalCtrl'
                    },
                    nav: adminNav
                },
                data: { auth: "EnterpriseAdmin"}  /// the auth data (could use resolve )
            })
            .state('admin.products', {
                url: '/admin/products',
                views: {
                    contenido: {
                        templateUrl: 'admin/views/products.html',
                        controller: 'productsCtrl'
                    },
                    nav: adminNav
                }
            })
            .state('admin.orders', {
                url: '/admin/orders',
                views: {
                    contenido: {
                        templateUrl: 'admin/views/orders.html',
                        controller: 'ordersCtrl'
                    },
                    nav: adminNav
                }
            })
            .state('admin.users', {
                url: '/admin/users',
                views: {
                    contenido: {
                        templateUrl: 'admin/views/users.html',
                        controller: 'usersCtrl'
                    },
                    nav: adminNav
                }
            })
            .state('admin.stores', {
                url: '/admin/stores',
                views: {
                    contenido: {
                        templateUrl: 'admin/views/stores.html',
                        controller: 'storesCtrl'
                    },
                    nav: adminNav
                }
            });

        $urlRouterProvider.otherwise('/');
    })
    .run(function ($rootScope, $location, $auth ,$state) {

        var profile = '';
        var defaultView = '';
        var payload = $auth.getPayload();
        profile = payload.profile;

        var isAdministrator = function () {
            if (profile == 'A' || profile == 'administrador') {
                return true;
            }
            return false;
        }

         var isClient = function () {
            if (profile == 'C' || profile == 'cliente') {
                return true;
            }
            return false;
        }

        var isManager = function () {
            if (profile == 'ENC' || profile == 'encargado') {
                return true;
            }
            return false;
        }

        var isEmployee = function () {
            if (profile == 'EMP' || profile == 'empleado') {
                return true;
            }
            return false;
        }


         function hasBackOfficeAccess() {
            return isAdministrator() || isManager() || isEmployee();
        }


        var isAdminRoute = function(route){
            var basePath = route.split('.')[0];
            // console.log('base path', basePath);
            if(basePath == 'admin'){
                return true;
            }
            return false;
        }

        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams, options) {
            var hash = $location.hash();
            if (hash) {
                toParams['#'] = hash;
            }

            // isAdminRoute(toState.name);
            // console.log('state name',toState.name, 'tostate', toState);

            // console.log('isadmin',isAdminRoute(toState.name),'hasBackOfficeAccess' ,permisosFactory.hasBackOfficeAccess(),'isAuthenticated ', permisosFactory.isAuthenticated());
            if (( isAdminRoute(toState.name) && !hasBackOfficeAccess()) || (isAdminRoute(toState.name) && !$auth.isAuthenticated())) {

                    ///event prevent default stop the transition
                    event.preventDefault();

                    // return trans.router.stateService.target('shop.login');
                    return $state.go('shop.login', {error:false}    );
            }

        });
    });
