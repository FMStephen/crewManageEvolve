angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('list.add',{
				url: '/add',
				templateUrl: 'templates/list/list-add.html',
				controller: function($scope,listdprt,userService){
					moreMenu();
					naviSecondery(1);

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

					$scope.position = "干事";

					function showuncompleted(){

						listdprt.addshow()
							.then(function(response){

								userService.cookieset(response.data.token);

								if(userService.result(response.data.code)){

									$scope.uncompleteds = response.data.data.uncompleteds;

								} else {

								alertbox('danger',userService.hint(response.data.code));

								}
							});

					};

					showuncompleted();

					$scope.add = function(){

						$scope.flag = true;

						var editmsg = {};

						editmsg.studentno = $scope.studentno;
						editmsg.position = $scope.position;

						listdprt.add(editmsg)
							.then(function(response){

							userService.cookieset(response.data.token);

							if(userService.result(response.data.code)){

								alertbox('success','添加新成员成功，请在部门列表查看');

								setTimeout(function(){ location.href = '#/list/dprt'; }, 1500);
								
							} else {

								alertbox('danger',userService.hint(response.data.code));

								var fail = response.data.data.failed;

								function failedno(fail){

									var sn = '';

									for(x = 0;x < response.data.data.failed.length;x++){

										sn += response.data.data.failed[x] + '\r';

									}

									return sn;

								};

								$scope.studentno = failedno();

								showuncompleted();

							}

							$scope.flag = false;
						});

							$scope.flag = false;
					}

				}
			});

});