angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			
			.state('user.edit',{
				url: '/infoedit',
				templateUrl: 'templates/user/info-edit.html',
				controller: function($scope,userinfo){

					userinfo.show()
						.then(function(data){
							
							if(data.data.error==0){

								$scope.content = data.data.content

								$scope.genderopt = gender

  								$scope.gender = $scope.content.gender

  								$scope.schoolopt = school

  								$scope.school = $scope.content.school

							}
						})

					$scope.infoedit = function(){

						var editmsg = {}

						editmsg.username = $scope.username
						editmsg.gender = $scope.gender
						editmsg.school = $scope.school
						editmsg.room = $scope.room
						editmsg.telLong = $scope.telLong
						editmsg.telShort = $scope.telShort

						userinfo.edit(editmsg)
							.then(function(data){
								if(data.data.error==0){

									alert("success")

								}
							})
						
					}

					

				}
			})


	})