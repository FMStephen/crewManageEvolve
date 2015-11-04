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

						if($scope.radio.dprt != undefined){

							location.href = '#/dprt/edit/' + $scope.radio.dprt ;

						} else {

							alert("请选择对象");

						}


					};

					$scope.del = function(){

						var editmsg = {};

						editmsg.id = $scope.radio.dprt;

						if(editmsg.id != undefined){

							dprtall.del(editmsg)
								.then(function(response){

								userService.cookieset(response.data.token);

								if(userService.result(response.data.code)){

									alert("success");
									
								};
							});

						} else {

							alert("请选择对象");

						}
		

					};


					});

				}
			});


	});