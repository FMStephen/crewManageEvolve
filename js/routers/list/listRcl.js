angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('list.recycle',{
				url: '/recycle/:current',
				templateUrl: 'templates/list/list-recycle.html',
				controller: function($scope,$stateParams,listrcl,userService){

					var x = parseInt($stateParams.current);

					$scope.current = $stateParams.current;

					var editmsg = {};

					editmsg.current = x;
					editmsg.count = 15;


					listrcl.show(editmsg)
						.then(function(response){
							
							userService.cookieset(response.data.token);
							
							if(userService.result(response.data.code)){

								$scope.members = response.data.data.members;
								$scope.total = response.data.data.total;

							};

						});

					$scope.pagenext = function(){

						if((x + 1)<=$scope.total){
							location.href = '#list/recycle/' + ( x + 1 ) ;
						}
						else{
							alert("last")
						}
						
					};

					$scope.pageprev = function(){

						if((x - 1)>=1){
							location.href = '#list/recycle/' + ( x - 1 ) ;
						}
						else{
							alert("first")
						}
						
					};

					$scope.checkbox = [];

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

					$scope.recover = function(){

						var editmsg = {};

						editmsg.id = checkboxselect();

						if(editmsg.id != ''){

							editmsg.position = $scope.position;

							listrcl.recover(editmsg)
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

					$scope.del = function(){


						var editmsg = {};

						editmsg.id = checkboxselect();

						if(editmsg.id != ''){

							editmsg.position = $scope.position;

							listrcl.del(editmsg)
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

				}
			});

});