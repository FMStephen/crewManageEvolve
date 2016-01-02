angular.module('app')
	.config(function($stateProvider){

		$stateProvider

			.state('dprt.add',{
				url: '/add',
				templateUrl: 'templates/department/department-add.html',
				controller: function($scope,userService,dprtall){

					if(userService.logincheck()==null){
						location.href = '#/login';
					}

					moreMenu();
					$scope.add = function(){

						$scope.flag = true;

						var editmsg = {};

						editmsg.dprtname = $scope.dprtname;
						editmsg.dprtnote = $scope.dprtnote;

						dprtall.add(editmsg)
							.then(function(response){

								userService.cookieset(response.data.token);
								
								if(userService.result(response.data.code)){

									alert("success");
									location.href = '#/dprt/all';

								};

								$scope.flag = true;

					});

				};

				}
			});


	});