angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('list.recycle',{
				url: '/recycle',
				templateUrl: 'templates/list/list-recycle.html'
			})

})