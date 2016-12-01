
angular
.module('tplaboratorioIv2016App')
.directive('cabeceraProducto',function($compile){
	
	return {/* 
			scope:{
				cabecera: '@cabecera'
			},*/
			template:'<th>{{columna}}</th>'
			};
});

angular
.module('tplaboratorioIv2016App')
.directive('filaProducto',function(){
	
	return {/*
			scope:{
					elemento: '=elementofila'
			},*/
			/*replace:true, 
			restrict:"EA", 
			templateUrl:'templates/templateRow.html'*/
			template: '<td ng-bind="row.id"></td><td ng-bind="row.nombre"></td><td ng-bind="row.descripcion"></td><td ng-bind="row.precio"></td><td ng-if="isAdministrator || isUser"><button class="btn btn-default" type="submit" ng-click="borrar($index)">Borrar</button></td><td ng-if="isAdministrator || isUser"><button class="btn btn-default" type="submit" ng-click="editarProducto(row)">editar</button></td>'

	};
});

angular
.module('tplaboratorioIv2016App')
.directive('grillaProductos',function(){
	
	return { replace:true, restrict:"E" , templateUrl:'templates/templateProductos.html'};
});