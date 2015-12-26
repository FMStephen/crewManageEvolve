angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('list.detail',{
				url: '/detail/:id',
				templateUrl: 'templates/list/list-detail.html',
				controller: function($scope,$stateParams,listall,listdprt,userService){
					moreMenu();
					naviSecondery(0);
					
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

					$scope.positionopt = superposition;

					function showdetail(){
					
						listall.detail($stateParams)
							.then(function(response){
					
								userService.cookieset(response.data.token);
					
									if(userService.result(response.data.code)){
					
										$scope.content = response.data.data.content;
										$scope.editor = response.data.data.editor;
				
										$scope.position = $scope.content.position;
													
									} else {

										alertbox('danger',userService.hint(response.data.code));

									}
							});
					}

					showdetail();

					$scope.isEdit = function(value){

						if(value){

							return true;

						} else {

							return false;

						}

					};

					$scope.changeposition = function(){

						$scope.flag = true;
					
						var editmsg = {};

						editmsg.id = $stateParams.id;

						editmsg.position = $scope.position;

						listdprt.position(editmsg)
							.then(function(response){

							userService.cookieset(response.data.token);

							if(userService.result(response.data.code)){

								alertbox('success','修改职位成功');
								showdetail();
								setTimeout(function(){ history.back(); }, 1500);

							} else {

								alertbox('danger',userService.hint(response.data.code));
								
							}

							$scope.flag = false;

						});

					};
				}
			});

});