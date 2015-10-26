angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('list.detail',{
				url: '/detail/:id',
				templateUrl: 'templates/list/list-detail.html',
				controller: function($scope,$stateParams,listall){

					listall.detail($stateParams)
						.then(function(response){
							if(response.data.code==200){

								$scope.content = response.data.data;
								
							};
						});

				}
			});

});