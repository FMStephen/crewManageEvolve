angular.module('app')
	.config(function($stateProvider){

		$stateProvider

			.state('user.pw',{
				url: '/pwedit',
				templateUrl: 'templates/user/password-edit.html',
				controller: function($scope,userinfo){

					$scope.pwedit = function(){

						var editmsg = {}

						editmsg.oldpw = $scope.oldpw
						editmsg.newpw = $scope.newpw
						editmsg.cfrmpw = $scope.cfrmpw

						userinfo.password(editmsg)
							.then(function(data){
								if(data.data.error==0){

									alert("success")

								}
							})

					}

				}
			})


	})