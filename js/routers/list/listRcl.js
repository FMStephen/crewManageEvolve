angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('list.recycle',{
				url: '/recycle/:current',
				templateUrl: 'templates/list/list-recycle.html',
				controller: function($scope,$stateParams,listrcl,userService){

					if(userService.logincheck()==null){
						location.href = '#/login';
					}

					moreMenu();
					naviSecondery(2);

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

					var p = parseInt($stateParams.current);

					$scope.current = $stateParams.current;

					var editmsg = {};

					editmsg.current = p;
					editmsg.count = 15;

					function rclshow(){
						listrcl.show(editmsg)
							.then(function(response){
								
								userService.cookieset(response.data.token);
								
								if(userService.result(response.data.code)){

									$scope.members = response.data.data.members;
									$scope.total = response.data.data.total;

								} else {

									alertbox('danger',userService.hint(response.data.code));
								}

							});
					};

					rclshow();

					var cb = document.getElementsByName("cb");

					$scope.checkall = function(o){

						var check = document.getElementById('check')

						var cb = document.getElementsByName("cb");

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

					$scope.pagenext = function(){

						if((p + 1)<=$scope.total){
							location.href = '#list/recycle/' + ( p + 1 ) ;
						}
						else{
							alertbox('danger','已经是最后一页');
						}
						
					};

					$scope.pageprev = function(){

						if((p - 1)>=1){
							location.href = '#list/recycle/' + ( p - 1 ) ;
						}
						else{
							alertbox('danger','已经是第一页');
						}
						
					};

					$scope.checkbox = [];

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

					}

					$scope.recover = function(){

						$scope.flag = true;

						var editmsg = {};

						editmsg.id = checkboxselect();

						if(editmsg.id != ''){

							editmsg.position = $scope.position;

							listrcl.recover(editmsg)
								.then(function(response){

								userService.cookieset(response.data.token);

								if(userService.result(response.data.code)){

									alertbox('success','恢复成功。对象被还原至部门列表');
									rclshow();
									
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

							alertbox('danger','请选择要操作的对象');

							$scope.flag = false;

						}

					};

					$scope.del = function(){

						

							var editmsg = {};

							editmsg.id = checkboxselect();

							if(editmsg.id != ''){

								if(window.confirm("此操作将无法撤销,确认彻底删除吗?")){

									$scope.flag = true;

									editmsg.position = $scope.position;

									listrcl.del(editmsg)
										.then(function(response){

										userService.cookieset(response.data.token);

										if(userService.result(response.data.code)){

											alertbox('success','彻底删除对象成功');
											rclshow();
										
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

						}  else {

						alertbox('danger','请选择要操作的对象');

						}

							

					};

				}
			});

});