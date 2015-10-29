angular.module('app')
	.config(function($stateProvider){

		$stateProvider

			.state('dprt.edit',{
				url: '/edit/:id',
				templateUrl: 'templates/department/department-add.html'
			})


	})