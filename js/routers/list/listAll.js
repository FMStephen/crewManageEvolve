angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('list.all',{
				url: '/all',
				templateUrl: 'templates/list/list-all.html'
			})

})