angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('list.reset',{
				url: '/reset/:id',
				templateUrl: 'templates/list/list-resetpw.html',
				controller: function($scope,$stateParams,listdprt,userService){

					var idrequest = {};
					idrequest.id = $stateParams.id

					listdprt.resetshow(idrequest)
						.then(function(response){

							userService.cookieset(response.data.token);
							
							if(userService.result(response.data.code)){

								$scope.members = response.data.data.members;
								
							};

						});
					
					$scope.reset = function(){

						var editmsg = {};

						editmsg.id = idrequest.id;
						editmsg.pw = $scope.pw;
						editmsg.pwcfrm = $scope.pwcfrm;

						listdprt.reset(editmsg)
							.then(function(response){

								userService.cookieset(response.data.token);
								
								if(userService.result(response.data.code)){

									alert("success");

									location.href = '#/list/dprt';
									
								};

							});

					};					

				}
			});

});