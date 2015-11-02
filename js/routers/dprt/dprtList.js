angular.module('app')
	.config(function($stateProvider){

		$stateProvider

			.state('dprt.all',{
				url: '/all',
				templateUrl: 'templates/department/department-all.html',
				controller: function($scope,userService,dprtall){

					dprtall.show()
						.then(function(response){

							userService.cookieset(response.data.token);
							
							if(userService.result(response.data.code)){

								$scope.dprts = response.data.data.dprt;

							};

					$scope.radio = {};

					$scope.edit = function(){

						location.href = '#/dprt/edit/' + $scope.radio.dprt ;

					};

					$scope.del = function(){

						var editmsg = {};

						editmsg.id = $scope.radio.dprt;

						dprtall.del(editmsg)
							.then(function(response){

							userService.cookieset(response.data.token);

							if(userService.result(response.data.code)){

								alert("success");
								
							};
						});

					};


					});

				}
			});


	});