'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tplaboratorioIv2016App
 */

angular.module('tplaboratorioIv2016App')
    .controller('LoginCtrl', function ($scope, $state, servicioLogin) {
        $scope.email = '';
        $scope.usuario = {};
        $scope.loguarse = loguarse;
        this.goHome = goHome;
        $scope.cliente = cliente;
        $scope.empleado = empleado;
        $scope.encargado = encargado;
        $scope.administrador = administrador;
        $scope.registrar = function () {
            if ($scope.email !== '') {
                $state.go('shop.register', {
                    mail: $scope.email
                });
            }
        };


        function loguarse() {
            servicioLogin.doLogin($scope.usuario).then(function (rta) {
                goHome();
            }, function (error) {
                servicioLogin.doLogin($scope.usuario).then(function (rta) {
                    goHome();
                }, function (error) {
                    alert(error);
                });
            });
        }

        function goHome() {
          $state.go('shop.home');
        }
        
        function cliente() {
            $scope.usuario.email = 'amerigot1@bravesites.com';
            $scope.usuario.password = '53507';
        }

        function empleado() {
            $scope.usuario.email = 'amerigot1@bravesites.com';
            $scope.usuario.password = '53507';
        }

        function encargado() {
            $scope.usuario.email = 'amerigot1@bravesites.com';
            $scope.usuario.password = '53507';
        }

        function administrador() {
            $scope.usuario.email = 'amerigot1@bravesites.com';
            $scope.usuario.password = '53507';
        }



        // if ($stateParams.error !== undefined && !$stateParams.error !== '') {
        //   $scope.email = $stateParams.mail;
        //   console.info($stateParams.mail);
        // }
    });
