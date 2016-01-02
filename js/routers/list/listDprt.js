angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('list.dprt',{
				url: '/dprt',
				templateUrl: 'templates/list/list-department.html',
				controller: function($scope,listdprt,userService){

					if(userService.logincheck()==null){
						location.href = '#/login';
					}


					optionMenu();
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

					$scope.content = {};

					function showdprt(){

					listdprt.show()
						.then(function(response){

							userService.cookieset(response.data.token);

							if(userService.result(response.data.code)){

								$scope.members = response.data.data.members;
								$scope.editor = response.data.data.editor;
							};

						});
					};

					showdprt();

					$scope.isEdit = function(value){

						if(value){

							return true;

						} else {

							return false;

						}

					};
					
					$scope.checkbox = [];
					$scope.rcl = "退休";
					$scope.position = "主管";

					function checkboxselect(){

						var id = '';

						for(x = 0;x < $scope.checkbox.length;x++){
					
							if($scope.checkbox[x] != null && $scope.checkbox[x].column != undefined){
					
								id = id + $scope.checkbox[x].column + ',';

								$scope.checkbox[x] = null;

							};
					
						};
									
						id = id.substring(0,id.length-1);

						return id;

					};

					$scope.checkbox = [];

					$scope.checkall = function(o){

						var check = document.getElementById('check')

						var cb = document.getElementsByName("cb");

						console.log(check)

						if(check.checked){

							for(x = 0;x < cb.length;x++){

								if(!cb[x].checked){

									cb[x].click();

								}

							}

						} else {

							for(x = 0;x < cb.length;x++){

								if(cb[x].checked){

									cb[x].click();

								}

							}

						}

					};


					

					$scope.recycle = function(){
					
						var editmsg = {};

						editmsg.id = checkboxselect();

						if(editmsg.id != ''){

							$scope.flag = true;

							editmsg.note = $scope.rcl;

							listdprt.rcl(editmsg)
								.then(function(response){

								userService.cookieset(response.data.token);

								if(userService.result(response.data.code)){

									alertbox('success','置入回收站成功');
									showdprt();
									
								} else {

									alertbox('danger',userService.hint(response.data.code));

								}

								$scope.flag = false;

							});

							var check = document.getElementById('check')

								if(check.checked){

									check.click();

								}	

						} else {

							alertbox('danger','请选择操作对象');

						}

					};

					$scope.changeposition = function(){
					
						var editmsg = {};

						editmsg.id = checkboxselect();

						if(editmsg.id != ''){

							if(window.confirm("确认修改职位吗?")){

								$scope.flag = true;

								editmsg.position = $scope.position;

								listdprt.position(editmsg)
									.then(function(response){

									userService.cookieset(response.data.token);

									if(userService.result(response.data.code)){

										alertbox('success','修改职位成功');
										showdprt();
										
									} else {

										alertbox('danger',userService.hint(response.data.code));

									}

									$scope.flag = false;

								});
							} else {

								var cb = document.getElementsByName("cb");

									for(x = 0;x < cb.length;x++){

										if(cb[x].checked){

											cb[x].click();

										}

									}

							}

							var check = document.getElementById('check')

								if(check.checked){

									check.click();

								}	
								
						} else {

							alertbox('danger','请选择操作对象');

						}

					};

					$scope.reset = function(){
					
						var resetid = checkboxselect();

						if(resetid != ''){

							location.href = '#/list/reset/' + resetid;

						} else {

							alertbox('danger','请选择操作对象');

						}

					};

				}
			});

});