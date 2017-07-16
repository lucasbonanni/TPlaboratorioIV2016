'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tplaboratorioIv2016App
 */

 angular.module('tplaboratorioIv2016App')
   .controller('storesCtrl', function ($scope,FileUploader,$location, $anchorScroll, shop,$state){
        this.columnDefinition = columnDefinition;
        this.editarElemento = $scope.editarElemento = editarElemento;
        this.eliminarElemento = $scope.eliminarElemento = eliminarElemento;
        this.updateImages = updateImages;
        this.addSlide = addSlide;
        this.getProcecedObjects = getProcecedObjects;
        $scope.CancelAndClean = CancelAndClean;
        $scope.isUpdate = false;
        $scope.producto = {};
        var slides = $scope.slides = [];
        var currIndex = 0;

        $scope.imagesUploaded = false;
        $scope.showAlert = false;
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

        $scope.noWrapSlides = false;
        $scope.active = 0;


        shop.obtenerTodos().then(function (response) {
            $scope.gridOptions.data = response.data;
        }, function (error) {
            shop.obtenerTodos().then(function (response) {
                $scope.gridOptions.data = response.data;
            }, function (error) {
                alert('hubo un error al cargar los datos' + error);
            });
        });

        $scope.createOrUpdate = function () {
            if ( uploader.queue.length > 0 && !$scope.imagesUploaded) {
                $scope.showAlert = true;
            } else {
                if ($scope.isUpdate) {
                    updateImages($scope.producto);
                    shop.Modificar($scope.producto).then(function (respuesta) {
                        $state.reload();
                    });
                } else {
                    updateImages($scope.producto);
                    // console.info($scope.producto);
                    shop.Agregar($scope.producto).then(function (respuesta) {
                        $state.reload();
                    });
                }
            }
        };

        function updateImages(producto) {
            if ($scope.slides.length === 1) {
                producto.image1 = $scope.slides[0].image;
            } else if ($scope.slides.length === 2) {
                producto.image1 = $scope.slides[0].image;
                producto.image2 = $scope.slides[1].image;

            } else if ($scope.slides.length === 3 || $scope.slides.length >= 3) {
                producto.image1 = $scope.slides[0].image;
                producto.image2 = $scope.slides[1].image;
                producto.image3 = $scope.slides[2].image;
            }
        }


        function CancelAndClean() {
            uploader.clearQueue();
            $scope.producto = {};
            $scope.slides = [];
            currIndex = 0;
        }

        function editarElemento(row) {
            $scope.slides = [];
            currIndex = 0;
            // console.info(row);
            // processElement(row.entity);
            $scope.producto = row.entity;
            // $scope.slides = row.entity.images;
            addSlide(row.entity.image1);
            addSlide(row.entity.image2);
            addSlide(row.entity.image3);
            currIndex = 0;
            $location.hash('top');
            // call $anchorScroll()
            $anchorScroll();
            $scope.isUpdate = true;
        }

        function eliminarElemento(row) {
            //something
            var index = $scope.gridOptions.data.indexOf(row.entity);
            console.info("info", row, index);
            if (index > -1) {
                $scope.gridOptions.data.splice(index, 1);
                console.info("elements", $scope.gridOptions.data);
                console.info('rown entity', row.entity.id, row.entity);
                // shop.BorrarPorId(row.entity.id);
            }
        }


        function columnDefinition() {
            return [{
                    field: 'id',
                    name: '#',
                    width: 35,
                    enableHiding: false,
                    enableColumnMenu: false
                },
                {
                    field: 'name',
                    name: 'Nombre',
                    enableHiding: false
                },
                {
                    field: 'street',
                    name: 'Calle',
                    enableHiding: false
                },
                {
                    field: 'city',
                    name: 'Ciudad',
                    enableHiding: false
                },
                {
                    field: 'phone',
                    name: 'Telefono',
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

        /* --- Image  Upload  ---- */
        var uploader = $scope.uploader = new FileUploader({
            url: 'http://localhost/personaSlim/ws1/images'
        });
        // FILTERS
        uploader.filters.push({
            name: 'imageFilter',
            fn: function (item /*{File|FileLikeObject}*/ , options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });


        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            $scope.slides[currIndex] = {
                image: response,
                text: '',
                id: currIndex
            };
            currIndex++;
        };
        uploader.onCompleteAll = function (response, status, headers) {
            $scope.showAlert = false;
            currIndex = 0;
            // console.info('onCompleteAll', response);
            uploader.clearQueue();
            $scope.imagesUploaded = true;
        };



        function addSlide(url) {
            $scope.slides.push({
                image: url,
                text: 'a',
                id: currIndex++
            });
        };




        function getProcecedObjects(array) {
            var proceced = {};
            if (array !== undefined && array !== null) {
                array.forEach(function (element) {
                    processElement(element);
                });
            }
            return array;
        }


   });
