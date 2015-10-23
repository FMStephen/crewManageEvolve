angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('list.all',{
				url: '/all',
				templateUrl: 'templates/list/list-all.html'
			})
			.state('list.all.detail',{
				url: '/all/:userid',
				templateUrl: 'templates/list/list-detail.html'
			})

})