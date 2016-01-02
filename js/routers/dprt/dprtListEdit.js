angular.module('app')
	.config(function($stateProvider){

		$stateProvider

			.state('dprt.edit',{
				url: '/edit/:id',
				templateUrl: 'templates/department/department-edit.html',
				controller: function($scope,$stateParams,userService,dprtall){

					if(userService.logincheck()==null){
						location.href = '#/login';
					}

					moreMenu();
			        $scope.alerts = [];

			        function alertbox(type,msg){

			        	if($scope.alerts != []){

			        		$scope.alerts.splice(0,1);

			        	}

			        	$scope.alerts.push({type : type ,msg : msg});

			        };

			        $scope.closeAlert = function(index){

			            $scope.alerts.splice(index,1);

			        };

					var request = {};

					request.id = $stateParams.id;

					dprtall.editshow(request)
						.then(function(response){

							userService.cookieset(response.data.token);
							
							if(userService.result(response.data.code)){

								$scope.content = response.data.data;

								$scope.dprtname = $scope.content.dprtname;
								$scope.dprtnote = $scope.content.dprtnote;

							} else {

										alertbox('danger',userService.hint(response.data.code));


									}
						});

					$scope.edit = function(){

						$scope.flag = true;

						var editmsg = {};

						editmsg.id = request.id;
						editmsg.dprtname = $scope.dprtname;
						editmsg.dprtnote = $scope.dprtnote;

						dprtall.edit(editmsg)
							.then(function(response){

								userService.cookieset(response.data.token);
								
								if(userService.result(response.data.code)){

									alertbox('success','部门资料修改成功');

									setTimeout(function(){ location.href = '#/dprt/all' }, 1500);

								} else {

										alertbox('danger',userService.hint(response.data.code));

									}

								$scope.flag = true;

						});

				};
			}


	});
});