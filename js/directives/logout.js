angular.module('app')
	.directive('logoutBtn',function(userService){
		return{
			restrict: "A",
			link: function(scope,element,attrs){
				element.bind("click",function(){
					
					scope.flag = true;

                	userService.logout();

					location.href = '#/login';

				})
			}
		}
		 
	})