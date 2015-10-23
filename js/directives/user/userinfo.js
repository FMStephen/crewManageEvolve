angular.module('app')
	.directive('loginBtn',function(userService){

		return{
			restrict: "A",
			link: function(scope,element,attrs){

				element.bind("click",function(){
					
					

				})
			}
		}
		
	})