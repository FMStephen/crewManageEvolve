angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('list.detail',{
				url: 'detail/:id',
				templateUrl: 'templates/list/list-detail.html'
			})

})