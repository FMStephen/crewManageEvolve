angular.module('app')
	.config(function($stateProvider,$urlRouterProvider){

		$urlRouterProvider.when('','/login')
						  .when('/user','/user/info')
						  .when('/list','/list/all/&&/1')
						  .when('/dprt','/dprt/all');

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

					var user = {};

					$scope.update = function(){

						user.studentNo = $scope.studentNo;
						user.password = $scope.password;

						userService.login(user)
							.then(function(response){

								if(response.data.code==200){

									currentUser = response.data.data;
									currentUser.token = response.data.token;

									var date = new Date();
									date.setDate(date.getDate() + 7);
									var expire = date;

									$cookies.put("token",currentUser.token,{ 'expires': expire});

									location.href = '#/user';

								}
								else{

								}

							});


					};
				}
			});

		


	});