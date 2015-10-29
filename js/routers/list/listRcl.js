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
							location.href = '#list/recycle/' + ( x + 1 )
						}
						else{
							alert("last")
						}
						
					};

					$scope.pageprev = function(){

						if((x - 1)>=1){
							location.href = '#list/recycle/' + ( x + 1 )
						}
						else{
							alert("first")
						}
						
					};
				}
			});

});