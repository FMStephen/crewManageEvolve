angular.module('app')
	.config(function($stateProvider){

		$stateProvider

			.state('user.info',{
				url: '/info',
				templateUrl: 'templates/user/info-detail.html',
				controller: function($scope,userinfo){

					userinfo.show()
						.then(function(response){

							if(response.data.code==200){

								$scope.content = response.data.data;

							}
						});

				}
			});
			


	});