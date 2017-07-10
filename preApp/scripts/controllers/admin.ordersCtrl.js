'use strict';

/**
 * @ngdoc function
 * @name tplaboratorioIv2016App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tplaboratorioIv2016App
 */

 angular.module('tplaboratorioIv2016App')
   .controller('ordersCtrl', function ($scope,FileUploader,$location, $anchorScroll,orders,orderDetail){
      this.columnDefinition = columnDefinition;
        this.editarElemento = $scope.editarElemento = editarElemento;
        this.eliminarElemento = $scope.eliminarElemento = eliminarElemento;
        this.processElement = processElement;
        this.getProcecedObjects = getProcecedObjects;
        this.buildOrder = buildOrder;

        $scope.totalPriceOrder = 0;
        $scope.carrito = [];
        $scope.tax = 21;
        $scope.producto = {};
        var imagesToUpload = [];
        $scope.showAlert = false;
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
 

        $scope.noWrapSlides = false;
        $scope.active = 0;
        var slides = $scope.slides = [];
        var imagesMock = [];
        var currIndex = 0;

        $scope.saveRow = function( rowEntity ) {
            // create a fake promise - normally you'd use the promise returned by $http or $resource
            var promise = $q.defer();
            $scope.gridApi.rowEdit.setSavePromise( rowEntity, promise.promise );
        
            // fake a delay of 3 seconds whilst the save occurs, return error if gender is "male"
            $interval( function() {
            if (rowEntity.gender === 'male' ){
                promise.reject();
            } else {
                promise.resolve();
            }
            }, 3000, 1);
        };
 


        orders.obtenerTodos().then(function(respuesta){ 
            $scope.gridOptions.data = respuesta.data;
        })

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
            processElement(row.entity);
            $scope.producto = row.entity;
            orderDetail.BuscarPorOrdenId(row.entity.id).then(function(response){
                $scope.carrito = buildOrder(response.data);
                console.info("carrito",$scope.carrito);
                console.info("reponse",response.data);
            },function(error){
                console.info(error);
            });
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
                { field: 'id', name: '#',width: 35,enableHiding: false, enableColumnMenu: false,enableCellEdit: false },
                { field: 'userName', name: 'nombre',enableHiding: false},
                { field: 'totalPrice', name: 'monto total',enableHiding: false},
                { field: 'userName', name: 'cliente',enableHiding: false},
                { field: 'date', name: 'Cantidad',enableHiding: false,cellFilter: 'date:"dd-MM-yyyy"'},
                { field: 'state', name: 'precio',enableHiding: false},
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



            $scope.increase = function(element) {
      $scope.storedValues.push(element);
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 1);
      // Setting a cookie
      $cookies.putObject('carrito', $scope.storedValues, {
        'expires': expireDate
      });
      $scope.carrito = buildOrder($scope.storedValues);
    };

    $scope.decrease = function(id) {
      var index;
      for (var i = $scope.storedValues.length -1; i >= 0; i--) {
        if ($scope.storedValues[i].id == id) {
          index = i;
          break;
        }
      }
      $scope.storedValues.splice(index, 1);
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 1);
      // Setting a cookie
      $cookies.putObject('carrito', $scope.storedValues, {
        'expires': expireDate
      });
      $scope.carrito = buildOrder($scope.storedValues);
    };


    $scope.delete = function(id) {
      var newArray = [];
      for (var i = 0; i < $scope.storedValues.length; i++) {
        if (!($scope.storedValues[i].id == id)) {
          newArray.push($scope.storedValues[i]);
        }
      }
      $scope.storedValues = newArray;
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 1);
      // Setting a cookie
      $cookies.putObject('carrito', $scope.storedValues, {
        'expires': expireDate
      });
      $scope.carrito = buildOrder($scope.storedValues);
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
        //   $scope.totalPrice += parseInt(totalqty);
          // $scope.totalDiscount += parseInt(array[i].discount);
          $scope.totalDiscount = 0;
          $scope.totalTax += (parseInt(totalqty) * ($scope.tax/100)) ;
          $scope.totalPrice += totalqty + $scope.totalTax;
          arrayOrdenado.push(array[i]);
          }
        }
        $scope.totalPriceOrder = $scope.totalPrice + $scope.totalTax -$scope.totalDiscount;
        return arrayOrdenado;

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
        


        $scope.addSlide = function () {
            var newWidth = 600 + imagesMock.length + 1;

            imagesMock.push({
                image: '//unsplash.it/' + newWidth + '/300',
                //text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][slides.length % 4],
                //id: currIndex++
            });
        };

        $scope.addSlide();
        $scope.addSlide();
        $scope.addSlide();

        var imagesJson = JSON.stringify(imagesMock);
        var oneImage = [{
            image: '//unsplash.it/' + 600 + '/300'
        }];
        var oneImageJson = JSON.stringify(oneImage);

        // var productResponse = [{
        //     "id":1,
        //     "nombre": "Cox",
        //     "descripcion": "Carney",
        //     "banda":"banda",
        //     "cantidad":"",
        //     "precio": "10",
        //     "tipo": "Enormo",
        //     "descuento": true,
        //     "data": imagesJson
        // }, {
        //     "id":1,
        //     "nombre": "Lorraine",
        //     "descripcion": "Wise",
        //     "banda":"banda",
        //     "cantidad":"",
        //     "precio": "124",
        //     "tipo": "Comveyer",
        //     "descuento": false,
        //     "data": oneImageJson
        // }, {
        //     "id":1,
        //     "nombre": "Nancy",
        //     "descripcion": "Waters",
        //     "banda":"banda",
        //     "cantidad":"",
        //     "precio": "75",
        //     "tipo": "Comveyer",
        //     "descuento": false,
        //     "data": imagesJson
        // }];

        // $scope.gridOptions.data = productResponse;


        function getProcecedObjects(array){
            var proceced = {};
            if(array !== undefined && array !== null){
                array.forEach(function(element) {
                    processElement(element);
                });
            }
            return array;
        }

        function processElement(obj){
            if(obj.data !== undefined && obj.data !== null){
                var images = JSON.parse(obj.data);
                console.info("images:",images,"data:",obj.data);
                if(images !== undefined && images !== null){
                    var i = 0;
                    obj.images = [];
                    images.forEach(function(element) {
                        console.log("element",element);
                        obj.images.push({
                            image: element.image,
                            text: '',
                            id: i++
                        });
                    });
                    obj.firstImage = images[0];
                }
            }
        }
   });
