angular.module('app')
	.config(function($stateProvider){

		$stateProvider

			.state('dprt.edit',{
				url: '/edit/:id',
				templateUrl: 'templates/department/department-edit.html',
				controller: function($scope,$stateParams,userService,dprtall){

					var request = {};

					request.id = $stateParams.id;

					dprtall.editshow(request)
						.then(function(response){

							userService.cookieset(response.data.token);
							
							if(userService.result(response.data.code)){

								$scope.content = response.data.data;

								$scope.dprtname = $scope.content.dprtname;
								$scope.dprtnote = $scope.content.dprtnote;

							};
						});

					$scope.edit = function(){

						var editmsg = {};

						editmsg.id = request.id;
						editmsg.dprtname = $scope.dprtname;
						editmsg.dprtnote = $scope.dprtnote;

						dprtall.edit(editmsg)
							.then(function(response){

								userService.cookieset(response.data.token);
								
								if(userService.result(response.data.code)){

									alert("success");
									location.href = '#/dprt/all';

								};

					});

				};
			}


	});
});