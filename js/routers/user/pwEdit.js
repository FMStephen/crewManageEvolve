angular.module('app')
	.config(function($stateProvider){

		$stateProvider

			.state('user.pw',{
				url: '/pwedit',
				templateUrl: 'templates/user/password-edit.html'
			})


	})