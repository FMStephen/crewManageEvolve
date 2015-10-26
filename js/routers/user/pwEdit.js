angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('user.pw',{
				url: '/pwedit',
				templateUrl: 'templates/user/password-edit.html',
				controller: function($scope,userinfo){

					$scope.pwedit = function(){

						var editmsg = {};

						editmsg.old = $scope.oldpw;
						editmsg.new = $scope.newpw;
						editmsg.cfrm = $scope.cfrmpw;

						userinfo.password(editmsg)
							.then(function(response){
								if(response.data.code==200){

									alert("success");

								}
							});

					};

				}
			});


	});