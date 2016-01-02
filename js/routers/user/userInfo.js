angular.module('app')
	.config(function($stateProvider){

		$stateProvider

			.state('user.info',{
				url: '/info',
				templateUrl: 'templates/user/info-detail.html',
				controller:  function($scope,userinfo,userService){

					if(userService.logincheck()==null){
						location.href = '#/login';
					}

					moreMenu();
					naviSecondery(0);

					userinfo.show()
						.then(function(response){

							userService.cookieset(response.data.token);

							if(userService.result(response.data.code)){

								$scope.content = response.data.data;

							}
						});

				}
			});
			


	});