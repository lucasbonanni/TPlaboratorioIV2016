'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:productsCtrl
 * @description
 * # MainCtrl
 * Controller of the tplaboratorioIv2016App
 */

angular.module('tplaboratorioIv2016App')
    .controller('productsCtrl', function ($scope, FileUploader,$location, $anchorScroll) {
        this.columnDefinition = columnDefinition;
        this.editarElemento = $scope.editarElemento = editarElemento;
        this.eliminarElemento = $scope.eliminarElemento = eliminarElemento;
        $scope.producto = {};
        var imagesToUpload = [];
        $scope.showAlert = false;
        $scope.gridOptions = {};
        $scope.gridOptions.enableColumnMenus = false;
        $scope.gridOptions.columnDefs = columnDefinition();

        $scope.noWrapSlides = false;
        $scope.active = 0;
        var slides = $scope.slides = [];
        var currIndex = 0;

        // to use when it load the page
        var oneSlide = {
                image: 'http://via.placeholder.com/300x200?text=Sin+imagen',
                text: 'no image',
                id: 1
            };
        $scope.slides.push(oneSlide);

        $scope.createOrUpdate = function(){
            if(imagesToUpload.length > 0 ) {
                $scope.showAlert = true;
            } else {

            }
                
        }



        function editarElemento(row){
            $scope.producto = row.entity;
            $location.hash('top');
            // call $anchorScroll()
            $anchorScroll();
        }

        function eliminarElemento(row){
            //something
            var index = $scope.gridOptions.data.indexOf(row.entity);
            console.info("info",row,index);
            if(index > -1){
                $scope.gridOptions.data.splice(index, 1);
                console.info("elements",$scope.gridOptions.data);
            }
        }


       function columnDefinition() {
            return [
                { field: 'id', name: '#',width: 35},
                { field: 'nombre', name: 'nombre'},
                { field: 'descripcion', name: 'descripcion'},
                { field: 'banda', name: 'banda'},
                { field: 'cantidad', name: 'Cantidad'},
                { field: 'precio', name: 'precio'},
                { field: 'tipo', name: 'tipo'},
                { field: 'descuento', name: 'descuento', width: 90},
                { field: 'edit', name: '..',minWidth: 35, 
                    cellEditableCondition: false, enableSorting: false, width: 35,
                    cellTemplate: '<center><button ng-click="grid.appScope.editarElemento(row)" class="btn btn-primary btn-xs" >'
                    +'<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> </button></center>' 
                },
                { field: 'delete', name: '...',minWidth: 35, 
                    cellEditableCondition: false, enableSorting: false, width: 35,
                    cellTemplate: '<center><button ng-click="grid.appScope.eliminarElemento(row,rowIndex)" class="btn btn-danger btn-xs" >'
                    +'<span class="glyphicon glyphicon-remove" aria-hidden="true"></span> </button></center>' 
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
                imagesToUpload.push(item);
                console.info("array",imagesToUpload);
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });


        $scope.change = function (value) {
            console.info("element", value);
        };

        $scope.buttonClick = function(){
            var objectPr = JSON.stringify(slides);
            console.info("stringigy",objectPr);
        };


        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            imagesToUpload = [];
            $scope.slides.push({
                image: response,
                text: '',
                id: currIndex++
            });
            console.info('onCompleteItem',  response);
        };
        uploader.onCompleteAll = function(response, status, headers) {
            $scope.showAlert = false;
            imagesToUpload = [];
            console.info('onCompleteAll',response);
            uploader.clearQueue();
        };

         /* -----------------------TESTING ------------------------------------------*/ 



         // CALLBACKS

        /*        uploader.onWhenAddingFileFailed = function(item {File|FileLikeObject}, filter, options) {
                    console.info('onWhenAddingFileFailed', item, filter, options);
        };
                uploader.onAfterAddingFile = function(fileItem) {
                    console.info('onAfterAddingFile', fileItem);
                    $scope.showAlert = true;
                };
                uploader.onAfterAddingAll = function(addedFileItems) {
                    console.info('onAfterAddingAll', addedFileItems);
                };
                uploader.onBeforeUploadItem = function(item) {
                    console.info('onBeforeUploadItem', item);
                };
                uploader.onProgressItem = function(fileItem, progress) {
                    console.info('onProgressItem', fileItem, progress);
                };
                uploader.onProgressAll = function(progress) {
                    console.info('onProgressAll', progress);
                };
                uploader.onSuccessItem = function(fileItem, response, status, headers) {
                    console.info('onSuccessItem', fileItem, response, status, headers);
                };
                uploader.onErrorItem = function(fileItem, response, status, headers) {
                    console.info('onErrorItem', fileItem, response, status, headers);
                };
                uploader.onCancelItem = function(fileItem, response, status, headers) {
                    console.info('onCancelItem', fileItem, response, status, headers);
                };*/
        
        $scope.data = {
            model: null,
            list: [{
                "name": "nombre1",
                "id": "1"
            }, {
                "name": "nombre2",
                "id": "2"
            }, {
                "name": "nombre3",
                "id": "3"
            } ]
        };



        $scope.gridOptions.data = [{
            "id":1,
            "nombre": "Cox",
            "descripcion": "Carney",
            "banda":"banda",
            "cantidad":"",
            "precio": "10",
            "tipo": "Enormo",
            "descuento": true
        }, {
            "id":1,
            "nombre": "Lorraine",
            "descripcion": "Wise",
            "banda":"banda",
            "cantidad":"",
            "precio": "124",
            "tipo": "Comveyer",
            "descuento": false
        }, {
            "id":1,
            "nombre": "Nancy",
            "descripcion": "Waters",
            "banda":"banda",
            "cantidad":"",
            "precio": "75",
            "tipo": "Comveyer",
            "descuento": false
        }];
        
        /* -------     carousel       -------------  */

        $scope.addSlide = function () {
            var newWidth = 600 + slides.length + 1;
            slides.push({
                image: '//unsplash.it/' + newWidth + '/300',
                text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][slides.length % 4],
                id: currIndex++
            });
        };


        // for (var i = 0; i < 3; i++) {
        //     $scope.addSlide();
        // }


    });
