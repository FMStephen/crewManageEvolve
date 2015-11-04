angular.module('app')
	
	.service('userService',function($http,$cookies) {

		return{

			login: function(editmsg){

				var user = {};

				user.studentno = editmsg.studentNo;
				user.password = md5(editmsg.password);

				return $http.post(host + 'Login',user);

				},

			logout: function(user){

				var timestamp = new Date().getTime();
				var token = $cookies.get("token");
				var auth = token + '.' + timestamp + '.' + GibberishAES.enc(token + ':' + timestamp, boyslove);

				$http.post(host + 'User/logout',auth);

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
					case 101:
						alert("存在未输入项");
						return false;
						break;

					case 103:
						alert("账号密码错误");
						location.href = '#/login';
						return false;
						break;

					case 105:
						alert("新旧密码相同");
						return false;
						break;

					case 106:
						alert("确认密码不一致");
						return false;
						break;

					case 107:
						alert("旧密码错误");
						return false;
						break;

					case 200:
						return true;
						break;

					case 201:
						location.href = '#/user/infoedit';
						return false;
						break;

					case 300:
						alert("你不具有该权限");
						history.back();
						return false;
						break;

					case 302:
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