angular.module('app')
	
	.service('userService',function($http,$cookies) {

		return{

			login: function(editmsg){

				return $http.post('test/get/login.json',editmsg);

				},

			logout: function(user){

				var timestamp = new Date().getTime();
				var token = $cookies.get("token");
				var auth = token + '.' + timestamp + '.' + GibberishAES.enc(token + ':' + timestamp, boyslove);

				$http.post('test/get/result.json',auth);

				$cookies.remove("token");
				
			},

			auth: function(){

				var timestamp = new Date().getTime();
				var token = $cookies.get("token");
				var auth = token + '.' + timestamp + '.' + GibberishAES.enc(token + ':' + timestamp, boyslove);
				
				return auth;

			},

			cookieset: function(editmsg){

				var date = new Date();
				date.setDate(date.getDate() + 7);
				var expire = date;

				$cookies.put("token",editmsg,{ 'expires': expire});

				return true;

			},

			result: function(editmsg){

				switch(editmsg){

					case 100:
						alert("账号密码错误");
						location.href = '#/login';
						return false;
						break;

					case 200:
						return true;
						break;

					case 300:
						alert("你不具有该权限");
						history.back();
						return false;
						break;

					case 400:
						alert("账号异常，请重新登录");
						location.href = '#/login';
						return false;
						break;

					case 500:
						alert("未知错误");
						return false;
						break;
				};

				

			}

			};
		});