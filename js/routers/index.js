angular.module('app')
	.config(function($stateProvider,$urlRouterProvider){

		$urlRouterProvider.when('','/login')
						  .when('/user','/user/info')
						  .when('/list','/list/all/&&/1')
						  .when('/dprt','/dprt/all')

		$stateProvider
			.state('user',{
				abstract: true,
				url: '/user',
				templateUrl: 'templates/navi/navi-user.html'
			})
			.state('list',{
				url: '/list',
				abstract: true,
				templateUrl: 'templates/navi/navi-list.html'
			})
			.state('dprt',{
				url: '/dprt',
				abstract: true,
				templateUrl: 'templates/navi/navi-dprt.html'
			})
			.state('login',{
				url: '/login',
				templateUrl: 'templates/login.html',
				controller: function($scope,$cookies,userService){					

					$scope.update = function(){

						var user = {};

						user.studentNo = $scope.studentNo;
						user.password = $scope.password;

						userService.login(user)
							.then(function(response){	

								userService.cookieset(response.data.token);

								if(userService.result(response.data.code)){

									location.href = '#/user';

								}

							});


					};
				}
			});

		


	});