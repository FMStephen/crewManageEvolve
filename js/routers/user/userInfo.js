angular.module('app')
	.config(function($stateProvider){

		$stateProvider

			.state('user.info',{
				url: '/info',
				templateUrl: 'templates/user/info-detail.html',
				controller: function($scope,userinfo){

					userinfo.show()
						.then(function(data){
							console.log(data)
							if(data.data.error==0){

								$scope.content = data.data.content

							}
						})

				}
			})
			


	})