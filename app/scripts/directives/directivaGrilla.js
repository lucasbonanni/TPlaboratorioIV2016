
angular
.module('tplaboratorioIv2016App')
.directive('directivaCabecera',function($compile){
	
	return {/* 
			scope:{
				cabecera: '@cabecera'
			},*/
			template:'<th>{{columna}}</th>'
			};
});

angular
.module('tplaboratorioIv2016App')
.directive('directivaFila',function(){
	
	return {/*
			scope:{
					elemento: '=elementofila'
			},*/
			/*replace:true, 
			restrict:"EA", 
			templateUrl:'templates/templateRow.html'*/
			template: '<td ng-bind="row.nombre"></td><td ng-bind="row.apellido"></td><td ng-bind="row.mail"></td><td><button class="btn btn-default" type="submit" ng-click="borrar(row.id)">Borrar</button></td>'

	};
});

angular
.module('tplaboratorioIv2016App')
.directive('directivaGrilla',function(){
	
	return { replace:true, restrict:"E" , templateUrl:'templates/templateGrilla.html'};
});