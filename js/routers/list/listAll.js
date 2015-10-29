angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('list.all',{
				url: '/all/:dprt&:position&:keyword/:current',
				templateUrl: 'templates/list/list-all.html',
				controller: function($scope,$stateParams,listall,userService){

					var x = parseInt($stateParams.current);

					$scope.dprtopt = dprt;
					$scope.positionopt = position;

					$scope.dprt = $stateParams.dprt;
					$scope.position = $stateParams.position;
					$scope.keyword = $stateParams.keyword;
					$scope.current = $stateParams.current;

					var editmsg = {};
					editmsg.filter = {};

					editmsg.current = x;
					editmsg.count = 15;
					editmsg.filter.dprt = $stateParams.dprt;
					editmsg.filter.position = $stateParams.position;
					editmsg.filter.keyword = $stateParams.keyword;

					listall.show(editmsg)
						.then(function(response){
							
							userService.cookieset(response.data.token);
							
							if(userService.result(response.data.code)){

								$scope.members = response.data.data.members;
								$scope.total = response.data.data.total;

							};

						});


					$scope.filter = function(){

						location.href = '#list/all/' + $scope.dprt + '&' + $scope.position + '&' + $scope.keyword + '/1'

					};

					$scope.pagenext = function(){

						if((x + 1)<=$scope.total){
							location.href = '#list/all/' + $scope.dprt + '&' + $scope.position + '&' + $scope.keyword + '/' + ( x + 1 )
						}
						else{
							alert("last")
						}
						
					};

					$scope.pageprev = function(){

						if((x - 1)>=1){
							location.href = '#list/all/' + $scope.dprt + '&' + $scope.position + '&' + $scope.keyword + '/' + ( x - 1 )
						}
						else{
							alert("first")
						}
						
					};
					
				}
			});
}); 