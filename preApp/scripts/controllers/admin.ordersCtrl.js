'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tplaboratorioIv2016App
 */

angular.module('tplaboratorioIv2016App')
    .controller('ordersCtrl', function ($scope, FileUploader, $location, $anchorScroll, orders, orderDetail,$state) {
        this.columnDefinition = columnDefinition;
        this.editarElemento = $scope.editarElemento = editarElemento;
        this.eliminarElemento = $scope.eliminarElemento = eliminarElemento;
        this.agregarElemento = $scope.agregarElemento = agregarElemento;
        this.CancelAndClean = $scope.CancelAndClean = CancelAndClean;
        // this.processElement = processElement;
        // this.getProcecedObjects = getProcecedObjects;
        this.buildOrder = buildOrder;

        $scope.isUpdate = false;
        $scope.newProduct = {};
        $scope.totalPriceOrder = 0;
        $scope.carrito = [];
        $scope.tax = 21;
        $scope.producto = {};
        $scope.gridOptions = {
            // Configuracion para exportar datos.
            exporterCsvFilename: 'misdatos.csv',
            exporterCsvColumnSeparator: ';',
            exporterPdfDefaultStyle: {
                fontSize: 9
            },
            exporterPdfTableStyle: {
                margin: [30, 30, 30, 30]
            },
            exporterPdfTableHeaderStyle: {
                fontSize: 10,
                bold: true,
                italics: true,
                color: 'red'
            },
            exporterPdfHeader: {
                text: "My Header",
                style: 'headerStyle'
            },
            exporterPdfFooter: function (currentPage, pageCount) {
                return {
                    text: currentPage.toString() + ' of ' + pageCount.toString(),
                    style: 'footerStyle'
                };
            },
            exporterPdfCustomFormatter: function (docDefinition) {
                docDefinition.styles.headerStyle = {
                    fontSize: 22,
                    bold: true
                };
                docDefinition.styles.footerStyle = {
                    fontSize: 10,
                    bold: true
                };
                return docDefinition;
            },
            exporterPdfOrientation: 'portrait',
            exporterPdfPageSize: 'LETTER',
            exporterPdfMaxGridWidth: 500,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            }
        };
        $scope.gridOptions.enableGridMenu = true;
        $scope.gridOptions.enableColumnMenus = false;
        $scope.gridOptions.columnDefs = columnDefinition();





        orders.obtenerTodos().then(function (respuesta) {
            $scope.gridOptions.data = respuesta.data;
        });


        $scope.createOrUpdate = function () {
            if ($scope.isUpdate) {
                orders.Modificar($scope.producto).then(function (respuesta) {
                    $scope.carrito.forEach(function(element) {
                        if(element.id){
                            orderDetail.Modificar(element).then(function(rst){
                                // continue;
                            },
                            function(error){
                                orderDetail.Modificar(element).then(function(rta){
                                    // continue;
                                    console.log(error);
                                },
                                function(error){
                                    console.log(error);
                                });
                            });
                        }
                        else{
                            orderDetail.Agregar(element).then(function(rst){
                                // continue;
                            },
                            function(error){
                                orderDetail.Agregar(element).then(function(rta){
                                    // continue;
                                    console.log(error);
                                },
                                function(error){
                                    console.log(error);
                                });
                            });
                        }
                    });
                    $state.reload();
                });
                console.info('is updating....');
            } else {
                orders.Agregar($scope.producto).then(function (respuesta) {
                    $scope.carrito.forEach(function(element) {
                        orderDetail.Agregar(element).then(function(rst){
                            // continue;
                        },
                        function(error){
                            orderDetail.Agregar(element).then(function(rta){
                                // continue;
                            },
                            function(error){

                            });
                        });
                    });
                    $state.reload();
                });
                console.info('is creating....');
            }
        };

        function CancelAndClean() {
            $scope.producto = {};
            $scope.carrito = {};
            $scope.isUpdate = false;
        }

        function agregarElemento() {
            var newElment = $scope.newProduct;
            if($scope.producto.id){
                newElment.orderId = $scope.producto.id;
            }
            $scope.carrito.push(newElment);
            $scope.carrito = buildOrder($scope.carrito);
            $scope.newProduct = {};
            $scope.producto.totalPrice = $scope.totalPriceOrder;
        }

        function editarElemento(row) {
            // processElement(row.entity);
            $scope.producto = row.entity;
            orderDetail.BuscarPorOrdenId(row.entity.id).then(function (response) {
                $scope.carrito = buildOrder(response.data);
                console.info("carrito", $scope.carrito);
                console.info("reponse", response.data);
                $scope.isUpdate = true && response.data.state !== 'entregado';
            }, function (error) {
                console.info(error);
            });
            $location.hash('top');
            // call $anchorScroll()
            $anchorScroll();
        }

        function eliminarElemento(row) {
            //something
            var index = $scope.gridOptions.data.indexOf(row.entity);
            console.info("info", row, index);
            if (index > -1) {
                $scope.gridOptions.data.splice(index, 1);
                console.info("elements", $scope.gridOptions.data);
            }
        }


        function columnDefinition() {
            return [{
                    field: 'id',
                    name: '#',
                    width: 35,
                    enableHiding: false,
                    enableColumnMenu: false,
                    enableCellEdit: false
                },
                {
                    field: 'userName',
                    name: 'nombre',
                    enableHiding: false
                },
                {
                    field: 'totalPrice',
                    name: 'monto total',
                    enableHiding: false
                },
                {
                    field: 'userName',
                    name: 'cliente',
                    enableHiding: false
                },
                {
                    field: 'date',
                    name: 'Cantidad',
                    enableHiding: false,
                    cellFilter: 'date:"dd-MM-yyyy"'
                },
                {
                    field: 'state',
                    name: 'precio',
                    enableHiding: false
                },
                {
                    field: 'edit',
                    name: '..',
                    minWidth: 35,
                    cellEditableCondition: false,
                    enableSorting: false,
                    width: 35,
                    enableHiding: false,
                    cellTemplate: '<center><button ng-click="grid.appScope.editarElemento(row)" class="btn btn-primary btn-xs" >' +
                        '<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> </button></center>'
                },
                {
                    field: 'delete',
                    name: '...',
                    minWidth: 35,
                    cellEditableCondition: false,
                    enableSorting: false,
                    width: 35,
                    enableHiding: false,
                    cellTemplate: '<center><button ng-click="grid.appScope.eliminarElemento(row,rowIndex)" class="btn btn-danger btn-xs" >' +
                        '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span> </button></center>'
                }

            ];
        }




        $scope.increase = function (element) {
            $scope.carrito.push(element);
            var expireDate = new Date();
            $scope.carrito = buildOrder($scope.carrito);
        };

        $scope.decrease = function (id) {
            var index;
            for (var i = $scope.carrito.length - 1; i >= 0; i--) {
                if ($scope.carrito[i].id == id) {
                    index = i;
                    break;
                }
            }
            $scope.carrito.splice(index, 1);
            $scope.carrito = buildOrder($scope.carrito);
        };


        $scope.delete = function (id) {
            var newArray = [];
            for (var i = 0; i < $scope.carrito.length; i++) {
                if (!($scope.carrito[i].id == id)) {
                    newArray.push($scope.carrito[i]);
                }
            }
            $scope.carrito = newArray;
            $scope.carrito = buildOrder($scope.carrito);
        };

        //build order with the cookie information
        function buildOrder(array) {
            var arrayOrdenado = [];
            $scope.totalPriceOrder = 0;
            $scope.totalPrice = 0;
            $scope.totalDiscount = 0;
            $scope.totalTax = 0;
            if (array.length > 0) {
                for (var i = 0; i < array.length; i++) {
                    var totalqty = array[i].price * array[i].quantity
                    $scope.totalDiscount = 0;
                    $scope.totalTax += (parseInt(totalqty) * ($scope.tax / 100));
                    $scope.totalPrice += totalqty + $scope.totalTax;
                    arrayOrdenado.push(array[i]);
                }
            }
            $scope.totalPriceOrder = $scope.totalPrice + $scope.totalTax - $scope.totalDiscount;
            return arrayOrdenado;

        };

    });
