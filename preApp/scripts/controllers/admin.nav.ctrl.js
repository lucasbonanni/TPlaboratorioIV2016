'use strict';

angular.module('tplaboratorioIv2016App')
    .controller('adminNavCtrl', function ($scope, permisosFactory,$state,servicioLogin) {
        // $scope.sideNavItems = [{text: 'Products', state: 'admin.products',iconClass: 'fa fa-chevron-right'}];

        $scope.isLogin = permisosFactory.isAuthenticated();
        $scope.userName = '';
        if($scope.isLogin){
            var payload = servicioLogin.getPayload();
            $scope.userName = payload.name;
        }
        $scope.logout = logout;


        
        var adminMenu = [{
                text: 'Principal',
                state: 'admin.dashboard',
                iconClass: 'fa fa-tachometer'
            },
            {
                text: 'Productos',
                state: 'admin.products',
                iconClass: 'fa fa-chevron-right'
            },
            {
                text: 'Locales',
                state: 'admin.stores',
                iconClass: 'fa fa-building'
            },
            {
                text: 'Usuarios',
                state: 'admin.users',
                iconClass: 'fa fa-users'
            },
            {
                text: 'Pedidos',
                state: 'admin.orders',
                iconClass: 'fa fa-truck'
            }
        ];


        var encargadoMenu = [{
                text: 'Principal',
                state: 'admin.dashboard',
                iconClass: 'fa fa-tachometer'
            },
            {
                text: 'Productos',
                state: 'admin.products',
                iconClass: 'fa fa-chevron-right'
            },
            {
                text: 'Empleados',
                state: 'admin.users',
                iconClass: 'fa fa-users'
            },
            {
                text: 'Pedidos',
                state: 'admin.orders',
                iconClass: 'fa fa-truck'
            }
        ];

        var empleadoMneu = [{
                text: 'Principal',
                state: 'admin.dashboard',
                iconClass: 'fa fa-tachometer'
            },
            {
                text: 'Productos',
                state: 'admin.products',
                iconClass: 'fa fa-chevron-right'
            },
            {
                text: 'Clientes',
                state: 'admin.users',
                iconClass: 'fa fa-users'
            },
            {
                text: 'Pedidos',
                state: 'admin.orders',
                iconClass: 'fa fa-truck'
            }
        ];

       
        if(permisosFactory.isAdministrator()){
            $scope.sideNavItems = adminMenu;
        }else if(permisosFactory.isManager()){
            $scope.sideNavItems = encargadoMenu;
        }else if(permisosFactory.isEmployee()){
            $scope.sideNavItems = empleadoMneu;
        }


        function logout(){
            console.log('logout');
            permisosFactory.logout();
            $state.go('shop.home');
        }

    });
