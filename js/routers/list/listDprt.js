angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('list.dprt',{
				url: '/dprt',
				templateUrl: 'templates/list/list-department.html',
				controller: function($scope,listdprt,userService){

					listdprt.show()
						.then(function(response){

							userService.cookieset(response.data.token);
							
							if(userService.result(response.data.code)){

								$scope.members = response.data.data.members;
								
							};

						});
					
					$scope.checkbox = [];
					$scope.rcl = "退休";
					$scope.position = "主管";

					function checkboxselect(){

						var id = '';

						for(x = 0;x < $scope.checkbox.length;x++){
					
							if($scope.checkbox[x] != null){
					
								id = id + $scope.checkbox[x].column + ',';
							};
					
						};
									
						id = id.substring(0,id.length-1);

						return id;

					}

					$scope.recycle = function(){
					
						var editmsg = {};

						editmsg.id = checkboxselect();

						if(editmsg.id != ''){

							editmsg.note = $scope.rcl;

							listdprt.rcl(editmsg)
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

					$scope.changeposition = function(){
					
						var editmsg = {};

						editmsg.id = checkboxselect();

						if(editmsg.id != ''){

							editmsg.position = $scope.position;

							listdprt.position(editmsg)
								.then(function(response){

								userService.cookieset(response.data.token);

								if(userService.result(response.data.code)){

									alert("success")
									
								}
							});
						} else {

							alert("请选择对象");

						}

					};

					$scope.reset = function(){
					
						var id = checkboxselect();

						if(id != ''){

							location.href = '#/list/reset/' + id ;

						} else {

							alert("请选择对象");

						}

					};

				}
			});

});