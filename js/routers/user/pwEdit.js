angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('user.pw',{
				url: '/pwedit',
				templateUrl: 'templates/user/password-edit.html',
				controller: function($scope,userinfo,userService){

					$scope.pwedit = function(){

						var editmsg = {};

						editmsg.old = $scope.oldpw;
						editmsg.new = $scope.newpw;
						editmsg.cfrm = $scope.cfrmpw;

						userinfo.password(editmsg)
							.then(function(response){

							userService.cookieset(response.data.token);
							
							if(userService.result(response.data.code)){
								
									alert("success");

								}
							});

					};

				}
			});


	});