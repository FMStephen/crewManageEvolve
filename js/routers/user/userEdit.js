angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			
			.state('user.edit',{
				url: '/infoedit',
				templateUrl: 'templates/user/info-edit.html',
				controller: function($scope,userinfo,userService){

					userinfo.show()
						.then(function(response){
								
							userService.cookieset(response.data.token);
							
							if(userService.result(response.data.code)){

								$scope.content = response.data.data;
						 
								$scope.username = $scope.content.username;
								$scope.room = $scope.content.room;
								$scope.telLong = $scope.content.telLong;
								$scope.telShort = $scope.content.telShort;
								$scope.email = $scope.content.email;
								$scope.genderopt = gender;
  								$scope.gender = $scope.content.gender;
  								$scope.schoolopt = school;
  								$scope.school = $scope.content.school;

							}
						});

					$scope.infoedit = function(){

						var editmsg = {};

						editmsg.username = $scope.username;
						editmsg.gender = $scope.gender;
						editmsg.school = $scope.school;
						editmsg.room = $scope.room;
						editmsg.telLong = $scope.telLong;
						editmsg.telShort = $scope.telShort;
						editmsg.email = $scope.email;

						userinfo.edit(editmsg)
							.then(function(response){

							userService.cookieset(response.data.token);
							
							if(userService.result(response.data.code)){

									alert("success");
									location.href = '#/user/info';

								};
							});
						
					};

					

				}
			});


	});