'use strict';

angular
    .module('tplaboratorioIv2016App')
    .constant('actionPath', 'users')
    .constant('profilePath', 'profile')
    .service('users', function ($http, routeFactory, actionPath, profilePath) {

        this.obtenerTodos = function () {
            var url = routeFactory.getApiRoute(actionPath + '/profile/all');
            //console.info("url",url);
            return $http.get(url);
        };


        this.BuscarPorId = function (id) {
            var url = routeFactory.getApiRoute(actionPath, id);
            return $http.get(url);
        };

        this.BuscarPorPerfil = function (perfil) {
            var url = routeFactory.getApiRoute(actionPath + '/' + profilePath, perfil);
                return $http.get(url);
        };
        
					
		this.BuscarPorPerfilSucursal = function (perfil,sucursal) {
            var url = routeFactory.getApiRoute(actionPath + '/' + perfil, sucursal);
            return $http.get(url);
        };

        this.BorrarPorId = function (id) {
            var url = routeFactory.getApiRoute(actionPath, id);
            return $http.delete(url);
        };

        this.Modificar = function (usuario,id) {
            var url = routeFactory.getApiRoute(actionPath,id);
            return $http.put(url, usuario);
        };

        this.Agregar = function (usuario) {
            var url = routeFactory.getApiRoute(actionPath);
            return $http.post(url, usuario);
        };

        this.login = function (usuario) {
            var url = routeFactory.getApiRoute('login/');
            return $http.post(url, usuario);
        };




    });
