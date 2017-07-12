'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tplaboratorioIv2016App
 */

 angular.module('tplaboratorioIv2016App')
   .controller('usersCtrl', function ($scope,$location, $anchorScroll,users,shop,$state,servicioLogin){

        //Methods
        this.columnDefinition = columnDefinition;
        this.editarElemento = $scope.editarElemento = editarElemento;
        this.eliminarElemento = $scope.eliminarElemento = eliminarElemento;
        $scope.CancelAndClean = CancelAndClean;

        //Variables
        $scope.storeList = [];
        $scope.profile = 'administrador';
        $scope.isUpdate = false;
        $scope.producto = {};
        $scope.enableState = [{id:1,text:'Hablitado'},{id:0,text:'Deshabilitado'}];

        //build
        if('administrador' === $scope.profile){
            $scope.profileList = [
                {id:'cliente',text:'Cliente'},
                {id:'empleado',text:'Empleado'},
                {id:'encargado',text:'Encargado'},
                {id:'administrador',text:'Administrador'}
            ];

            shop.obtenerTodos().then(function(rta){
                console.log('sucursales',rta.data);
                $scope.storeList = rta.data;
            },function(error){
                console.log(error);
            });

            users.obtenerTodos().then(function(rta){
                console.log('todos',rta);
                 $scope.gridOptions.data = rta.data;
            },function(error){
                console.error(error);
            })


        }else if('encargado' === $scope.profile){
            $scope.profileList = [
                {id:'cliente',text:'Cliente'},
                {id:'empleado',text:'Empleado'},
            ];
            users.BuscarPorPerfil('cliente').then(function(rta){
                console.log(rta);
                $scope.gridOptions.data = rta.data;
            }, function(error){
                console.error(error);
            });

            users.BuscarPorPerfilSucursal('empleado',1).then(function(rta){
                console.log('empleados',rta.data);
                // $scope.gridOptions.data = rta.data;
            }, function(error){
                console.error(error);
            });


        } else if('empleado' === $scope.profile){
            $scope.profileList = [
                {id:'cliente',text:'Cliente'},
                {id:'empleado',text:'Empleado'},
            ];
            users.BuscarPorPerfil('cliente').then(function(rta){
                console.log(rta);
                $scope.gridOptions.data = rta.data;
            }, function(error){
                console.error(error);
            });


        }

        $scope.createOrUpdate = function () {
            if ($scope.isUpdate) {
                console.info($scope.producto);
                users.Modificar($scope.producto,$scope.producto.id).then(function (respuesta) {
                    $state.reload();
                });
            } else {
                console.info($scope.producto);
                users.Agregar($scope.producto).then(function (respuesta) {
                    $state.reload();
                });
            }
        };


        function CancelAndClean() {
            $scope.producto = {};
        }


        $scope.gridOptions =  {
            // Configuracion para exportar datos.
            exporterCsvFilename: 'misdatos.csv',
            exporterCsvColumnSeparator: ';',
            exporterPdfDefaultStyle: {fontSize: 9},
            exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
            exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
            exporterPdfHeader: { text: "My Header", style: 'headerStyle' },
            exporterPdfFooter: function ( currentPage, pageCount ) {
                return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
            },
            exporterPdfCustomFormatter: function ( docDefinition ) {
                docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
                docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
                return docDefinition;
            },
            exporterPdfOrientation: 'portrait',
            exporterPdfPageSize: 'LETTER',
            exporterPdfMaxGridWidth: 500,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            onRegisterApi: function(gridApi){
                $scope.gridApi = gridApi;
            }
        };
        $scope.gridOptions.enableGridMenu = true;
        $scope.gridOptions.enableColumnMenus = false;
        $scope.gridOptions.columnDefs = columnDefinition();




        function editarElemento(row){
            $scope.isUpdate = true;
            $scope.producto = row.entity;
            $location.hash('top');
            // call $anchorScroll()
            $anchorScroll();
        }

        function eliminarElemento(row){
            //something
            var index = $scope.gridOptions.data.indexOf(row.entity);
            users.BorrarPorId(row.entity.id).then(function(rta){
                if(index > -1){
                    $scope.gridOptions.data.splice(index, 1);
                    // console.info("elements",$scope.gridOptions.data);
                }
            }, function(error){
                console.error(error);
            })
            // console.info("info",row,index);
        }


       function columnDefinition() {
            return [
                { field: 'id', name: '#',width: 35,enableHiding: false, enableColumnMenu: false},
                { field: 'name', name: 'nombre',enableHiding: false},
                { field: 'email', name: 'email',enableHiding: false},
                { field: 'password', name: 'clave',enableHiding: false},
                { field: 'profile', name: 'perfil',enableHiding: false},
                { field: 'enabled', name: 'habilitado',enableHiding: false},
                { field: 'shopId', name: 'sucursal',enableHiding: false},
                // { field: 'descuento', name: 'descuento', width: 90 ,enableHiding: false},
                { field: 'edit', name: '..',minWidth: 35, 
                    cellEditableCondition: false, enableSorting: false, width: 35,enableHiding: false,
                    cellTemplate: '<center><button ng-click="grid.appScope.editarElemento(row)" class="btn btn-primary btn-xs" >'
                    +'<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> </button></center>' 
                },
                { field: 'delete', name: '...',minWidth: 35, 
                    cellEditableCondition: false, enableSorting: false, width: 35,enableHiding: false,
                    cellTemplate: '<center><button ng-click="grid.appScope.eliminarElemento(row,rowIndex)" class="btn btn-danger btn-xs" >'
                    +'<span class="glyphicon glyphicon-remove" aria-hidden="true"></span> </button></center>' 
                }

            ];
        }
        


        $scope.change = function (value) {
            console.info("element", value);
        };

   });
