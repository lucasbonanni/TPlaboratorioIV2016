'use strict';

angular.module('tplaboratorioIv2016App')
    .controller('shopHeaderCtrl', function ($scope, permisosFactory,$state,servicioLogin) {
        $scope.items = 10;
        $scope.totalprice = 100;
        $scope.navMenuItems = [];
        $scope.isLogin = permisosFactory.isAuthenticated();
        $scope.userName = '';
        if($scope.isLogin){
            var payload = servicioLogin.getPayload();
            $scope.userName = payload.name;
        }
        $scope.logout = logout;

        var invitedMenu = [{
                text: 'Principal',
                state: 'shop.home',
                iconClass: 'fa fa-tachometer'
            },
            {
                text: 'Resumen',
                state: 'shop.productSummary',
                iconClass: 'fa fa-building'
            },
            {
                text: 'Login',
                state: 'shop.login',
                iconClass: 'fa fa-building'
            },
            {
                text: 'Encuesta',
                state: 'shop.contact',
                iconClass: 'fa fa-truck'
            }
        ];

        var clientMenu = [{
                text: 'Principal',
                state: 'shop.home',
                iconClass: 'fa fa-tachometer'
            },
            {
                text: 'Resumen',
                state: 'shop.productSummary',
                iconClass: 'fa fa-building'
            }, {
                text: 'Cuenta',
                state: 'shop.register',
                iconClass: 'fa fa-truck'
            },

            {
                text: 'Encuesta',
                state: 'shop.contact',
                iconClass: 'fa fa-truck'
            }
        ];

        var adminMenu = [{
                text: 'Principal',
                state: 'shop.home',
                iconClass: 'fa fa-tachometer'
            },
            {
                text: 'Encuesta',
                state: 'shop.contact',
                iconClass: 'fa fa-truck'
            },
            {
                text: 'Administración',
                state: 'admin.dashboard',
                iconClass: 'fa fa-users'
            }
        ];

        if (permisosFactory.isAuthenticated()) {
            if(permisosFactory.isAdministrator()){
                $scope.navMenuItems = adminMenu;
                $scope.isLogin = true;
            }else if(permisosFactory.hasBackOfficeAccess())
            {
                $scope.navMenuItems = adminMenu;
                $scope.isLogin = true;
            }else if(permisosFactory.isClient()){ 
                $scope.navMenuItems = clientMenu;
                $scope.isLogin = true;
            }
            else{
                $scope.navMenuItems = invitedMenu;
            }

        } else {
            $scope.navMenuItems = invitedMenu;
        }

        function logout(){
            console.log('logout');
            permisosFactory.logout();
            $state.reload();
        }


    });
