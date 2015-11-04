angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('user.pw',{
				url: '/pwedit',
				templateUrl: 'templates/user/password-edit.html',
				controller: function($scope,userinfo,userService){

					$scope.pwedit = function(){

						if($scope.newpw == $scope.cfrmpw){

							var editmsg = {};

								editmsg.old = $scope.oldpw;
								editmsg.new = $scope.newpw;
								editmsg.cfrm = $scope.cfrmpw;

								userinfo.password(editmsg)
									.then(function(response){

									userService.cookieset(response.data.token);
									
									if(userService.result(response.data.code)){
										
											alert("success,请重新登录");

											userService.logout();
											location.href = '#/login';

										}
									});}
						else{

							alert("确认密码不一致");

						}

					};

				}
			});


	});