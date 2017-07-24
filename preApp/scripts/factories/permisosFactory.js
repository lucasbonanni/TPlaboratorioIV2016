angular
    .module('tplaboratorioIv2016App')
    .factory('permisosFactory', function ($http, servicioLogin) {
        var profile = '';
        var defaultView = '';
        var payload = {};
        payload = servicioLogin.getPayload();
        // console.info('payload', payload);
        if (payload) {
            profile = payload.profile;

            if (payload['defaultView']) {
                defaultView = payload.defaultView;
            }
        } else {
            profile = '';
        }


        var objeto = {};



        objeto.isAuthenticated = function () {
            getPayload();
            return servicioLogin.isAuthenticated();
        }

        function getPayload() {
            var payload = {};
            payload = servicioLogin.getPayload();
            console.info('payload', payload);
            if (payload) {
                profile = payload.profile;

                if (payload['defaultView']) {
                    defaultView = payload.defaultView;
                }
            } else {
                profile = '';
            }
        }

        objeto.isAdministrator = function () {
            if (profile == 'A' || profile == 'administrador') {
                return true;
            }
            return false;
        }

        objeto.isClient = function () {
            if (profile == 'C' || profile == 'cliente') {
                return true;
            }
            return false;
        }

        objeto.isManager = function () {
            if (profile == 'ENC' || profile == 'encargado') {
                return true;
            }
            return false;
        }

        objeto.isEmployee = function () {
            if (profile == 'EMP' || profile == 'empleado') {
                return true;
            }
            return false;
        }


        objeto.hasBackOfficeAccess = function () {
            return objeto.isAdministrator() || objeto.isManager() || objeto.isEmployee();
        }

        objeto.getDefaultView = function () {
            return defaultView;
        }

        objeto.logout = function () {
            return servicioLogin.logout();
        }


        return objeto;
    });
