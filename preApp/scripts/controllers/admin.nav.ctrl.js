'use strict';

angular.module('tplaboratorioIv2016App')
    .controller('adminNavCtrl', function ($scope) {
        // $scope.sideNavItems = [{text: 'Products', state: 'admin.products',iconClass: 'fa fa-chevron-right'}];

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

        var perfil = "admin"; // get the profile

        if (perfil === 'admin') {
            $scope.sideNavItems = adminMenu;
        } else if (perfil === 'enc') {
            $scope.sideNavItems = encargadoMenu;
        } else if (perfil === 'emp') {
            $scope.sideNavItems = empleadoMneu;
        }


        $scope.userName = 'Lucas Bonanni';

        /*
        administrador: empleados y locales
        Encargado: empleados, productos, ofertas
        Empleado: pedidos, clientes, productos, ofertas        
         */
    });
