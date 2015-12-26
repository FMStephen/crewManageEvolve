angular.module('app',['ui.router','ngCookies','ui.bootstrap']) 
    .config(['$httpProvider',function($httpProvider){

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        var param = function(obj) {
          var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
            
          for(name in obj) {
            value = obj[name];
              
            if(value instanceof Array) {
              for(i=0; i<value.length; ++i) {
                subValue = value[i];
                fullSubName = name + '[' + i + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
              }
            }
            else if(value instanceof Object) {
              for(subName in value) {
                subValue = value[subName];
                fullSubName = name + '[' + subName + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
              }
            }
            else if(value !== undefined && value !== null)
              query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
          }
            
          return query.length ? query.substr(0, query.length - 1) : query;
        };
       
        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function(data) {
          return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
      }])

//var host = 'http://125.216.250.105/bbter/index.php/Home/' ;
//var host = 'http://192.168.1.120/bbter/index.php/Home/' ;
var host = 'http://222.201.132.27/bbter-all/index.php/Home/' ;

function encrypt(msg){

  return sodium.crypto_box_easy(msg,sodium.from_hex(nonce),sodium.from_hex(pk),sodium.from_hex(sk),'hex');

}  

var school = [  {"name": "请选择","value": ""},
                {"name": "C.材料科学与工程学院","value": "材料科学与工程学院"},
        		{"name": "D.电子与信息学院","value": "电子与信息学院"},
        		{"name": "D.电力学院","value": "电力学院"},
        		{"name": "F.法学院(知识产权学院)","value": "法学院(知识产权学院)"},
        		{"name": "G.国际教育学院","value": "国际教育学院"},
        		{"name": "G.工商管理学院(创业教育学院)","value": "工商管理学院(创业教育学院)"},
        		{"name": "G.公共管理学院","value": "公共管理学院"},
        		{"name": "H.环境与能源学院","value": "环境与能源学院"},
        		{"name": "H.化学与化工学院","value": "化学与化工学院"},
        		{"name": "J.机械与汽车工程学院","value": "机械与汽车工程学院"},
        		{"name": "J.计算机科学与工程学院","value": "计算机科学与工程学院"},
       		    {"name": "J.建筑学院","value": "建筑学院"},
    			{"name": "J.经济与贸易学院","value": "经济与贸易学院"},
        		{"name": "L.理学院(数学系 物理系)","value": "理学院(数学系 物理系)"},
        		{"name": "Q.轻工与食品学院","value": "轻工与食品学院"},
        		{"name": "R.软件学院","value": "软件学院"},
        		{"name": "S.生物科学与工程学院","value": "生物科学与工程学院"},
        		{"name": "S.思想政治学院","value": "思想政治学院"},
        		{"name": "S.设计学院","value": "设计学院"},
        		{"name": "T.土木与交通学院","value": "土木与交通学院"},
        		{"name": "T.体育学院","value": "体育学院"},
        		{"name": "W.外国语学院","value": "外国语学院"},
        		{"name": "X.新闻与传播学院","value": "新闻与传播学院"},
        		{"name": "Y.艺术学院","value": "艺术学院"},
        		{"name": "Y.医学院","value": "医学院"},
        		{"name": "Z.自动化科学与工程学院","value": "自动化科学与工程学院"},
  			];

var gender = [  {"name": "请选择","value": ""},
                {"name": "男","value": "男"},
                {"name": "女","value": "女"}
                 ];

var dprt = [    {"name": "所有部门","value": ""},
                {"name": "编辑部","value": "编辑部"},
                {"name": "策划推广部","value": "策划推广部"},
                {"name": "技术部","value": "技术部"},
                {"name": "节目部","value": "节目部"},
                {"name": "人力资源部","value": "人力资源部"},
                {"name": "视觉设计部","value": "视觉设计部"},
                {"name": "视频部","value": "视频部"}, 
                {"name": "外联部","value": "外联部"},
                {"name": "综合管理部","value": "综合管理部"},
                {"name": "综合新闻部","value": "综合新闻部"}
            ];

var position = [    {"name": "所有职位","value": ""},
                    {"name": "干事","value": "干事"},
                    {"name": "主管","value": "主管"},
                    {"name": "部长","value": "部长"},
                    {"name": "常委","value": "常委"}
                ];

var superposition = [    {"name": "干事","value": "干事"},
                    {"name": "主管","value": "主管"},
                    {"name": "部长","value": "部长"},
                    {"name": "常委","value": "常委"},
                    {"name": "超级管理员","value": "超级管理员"}
                ];
function footer(){	
	var x = window.innerWidth;
	if(x >= 1600){
		document.getElementById('body').style.minHeight = window.innerHeight - 272 + 'px';
	} else {
		document.getElementById('body').style.minHeight = window.innerHeight - 240 + 'px';
	}
}
function naviSecondery(num) {
	var naviSecondery = document.getElementsByClassName('naviSeconderyBtn');
	for(var x = 0;x < naviSecondery.length;x++){
		if(x != num){
			naviSecondery[x].setAttribute('class','naviSeconderyBtn fontNormal');
		} else {
			naviSecondery[x].setAttribute('class','naviSeconderyBtn fontNormal naviSeconderyBtnActive');
		}
	}
}
function moreMenu(){
	var menu = document.getElementById('moreMenu');
	var moreBtn = document.getElementById('moreBtn');
	document.addEventListener('click',function(e){
		if(moreBtn == e.target && menu.style.display == 'none'){
			menu.style.display = 'block';
			setTimeout(function(){				
				menu.style.opacity = '1';
			},0)
		}
		if(moreBtn != e.target && menu.style.display == 'block'){
			menu.style.opacity = '0';
			setTimeout(function(){
				menu.style.display = 'none';
			},200)
		}
	})
}
function optionMenu(){
	var optionMenu = document.getElementById('optionMenu');
	var optionBtn = document.getElementById('optionBtn');
	var cfrm = document.getElementsByClassName('txtBtn');
	document.addEventListener('mousedown',function(e){
		if(optionBtn == e.target && optionMenu.style.display == 'none'){
			setTimeout(function(){				
				optionMenu.style.display = 'block';
			},1)
			setTimeout(function(){				
				optionMenu.style.opacity = '1';
			},2)
		}
		if(((optionMenu != e.target && optionMenu != e.target.parentNode && optionMenu != e.target.parentNode.parentNode) || cfrm[0] == e.target || cfrm[1] == e.target) && optionMenu.style.display == 'block'){
			console.log(e.target)
			optionMenu.style.opacity = '0';
			setTimeout(function(){
				optionMenu.style.display = 'none';
			},201)
		}
	})
}
function listCheck(o){
	if(o.checked){
		o.parentNode.style.backgroundImage = 'url(img/checked.png)';
	} else {
		o.parentNode.style.backgroundImage = 'url(img/unchecked.png)';
	}
}
angular.module('app')
	.config(function($stateProvider,$urlRouterProvider){

		$urlRouterProvider.when('','/login')
						  .when('/user','/user/info')
						  .when('/list','/list/all/&&/1')
						  .when('/dprt','/dprt/all')

		$stateProvider
			.state('user',{
				abstract: true,
				url: '/user',
				templateUrl: 'templates/navi/navi-user.html'
			})
			.state('list',{
				url: '/list',
				abstract: true,
				templateUrl: 'templates/navi/navi-list.html'
			})
			.state('dprt',{
				url: '/dprt',
				abstract: true,
				templateUrl: 'templates/navi/navi-dprt.html'
			})
			.state('login',{
				url: '/login',
				templateUrl: 'templates/login.html',
				controller: function($scope,$cookies,userService){

			        $scope.alerts = [];

			        function alertbox(type,msg){

			        	if($scope.alerts != []){

			        		$scope.alerts.splice(0,1);

			        	}

			        	$scope.alerts.push({type : type ,msg : msg});

			        };

			        $scope.closeAlert = function(index){

			            $scope.alerts.splice(index,1);

			        };					

					$scope.update = function(){

						$scope.flag = true;

						var user = {};

						user.studentNo = $scope.studentNo;
						user.password = $scope.password;

						userService.login(user)
							.then(function(response){	

								userService.cookieset(response.data.token);

								if(userService.result(response.data.code)||response.data.code==201){

									location.href = '#/user';

								} else {

									alertbox('danger',userService.hint(response.data.code));

								}	

								$scope.flag = false;

							});


					};
				}
			});

		


	});
angular.module('app')
	.config(function($stateProvider){

		$stateProvider

			.state('dprt.all',{
				url: '/all',
				templateUrl: 'templates/department/department-all.html',
				controller: function($scope,userService,dprtall){
					moreMenu();
			        $scope.alerts = [];

			        function alertbox(type,msg){

			        	if($scope.alerts != []){

			        		$scope.alerts.splice(0,1);

			        	}

			        	$scope.alerts.push({type : type ,msg : msg});

			        };

			        $scope.closeAlert = function(index){

			            $scope.alerts.splice(index,1);

			        };

					function show(){

						dprtall.show()
							.then(function(response){

								userService.cookieset(response.data.token);
								
								if(userService.result(response.data.code)){

									$scope.dprts = response.data.data.dprt;
									$scope.editor = response.data.data.editor;

								} else {

									alertbox('danger',userService.hint(response.data.code));

								}

							});
					};

					show();

					$scope.radio = {};

					$scope.edit = function(){

					 	if($scope.radio.dprt != undefined){

					 		location.href = '#/dprt/edit/' + $scope.radio.dprt ;

					 	} else {

					 		alertbox('danger','请选择操作对象');

					 	}


					 };

					$scope.isEdit = function(value){

						if(value){

							return true;

						} else {

							return false;

						}

					};

					// $scope.del = function(){

					// 	var editmsg = {};

					// 	editmsg.id = $scope.radio.dprt;

					// 	if(editmsg.id != undefined){

					// 		dprtall.del(editmsg)
					// 			.then(function(response){

					// 			userService.cookieset(response.data.token);

					// 			if(userService.result(response.data.code)){

					// 				alert("success");
					// 				show();
									
					// 			};
					// 		});

					// 	} else {

					// 		alert("请选择对象");

					// 	}
		

					// };


					

				}
			});


	});
angular.module('app')
	.config(function($stateProvider){

		$stateProvider

			.state('dprt.add',{
				url: '/add',
				templateUrl: 'templates/department/department-add.html',
				controller: function($scope,userService,dprtall){
					moreMenu();
					$scope.add = function(){

						$scope.flag = true;

						var editmsg = {};

						editmsg.dprtname = $scope.dprtname;
						editmsg.dprtnote = $scope.dprtnote;

						dprtall.add(editmsg)
							.then(function(response){

								userService.cookieset(response.data.token);
								
								if(userService.result(response.data.code)){

									alert("success");
									location.href = '#/dprt/all';

								};

								$scope.flag = true;

					});

				};

				}
			});


	});
angular.module('app')
	.config(function($stateProvider){

		$stateProvider

			.state('dprt.edit',{
				url: '/edit/:id',
				templateUrl: 'templates/department/department-edit.html',
				controller: function($scope,$stateParams,userService,dprtall){
					moreMenu();
			        $scope.alerts = [];

			        function alertbox(type,msg){

			        	if($scope.alerts != []){

			        		$scope.alerts.splice(0,1);

			        	}

			        	$scope.alerts.push({type : type ,msg : msg});

			        };

			        $scope.closeAlert = function(index){

			            $scope.alerts.splice(index,1);

			        };

					var request = {};

					request.id = $stateParams.id;

					dprtall.editshow(request)
						.then(function(response){

							userService.cookieset(response.data.token);
							
							if(userService.result(response.data.code)){

								$scope.content = response.data.data;

								$scope.dprtname = $scope.content.dprtname;
								$scope.dprtnote = $scope.content.dprtnote;

							} else {

										alertbox('danger',userService.hint(response.data.code));


									}
						});

					$scope.edit = function(){

						$scope.flag = true;

						var editmsg = {};

						editmsg.id = request.id;
						editmsg.dprtname = $scope.dprtname;
						editmsg.dprtnote = $scope.dprtnote;

						dprtall.edit(editmsg)
							.then(function(response){

								userService.cookieset(response.data.token);
								
								if(userService.result(response.data.code)){

									alertbox('success','部门资料修改成功');

									setTimeout(function(){ location.href = '#/dprt/all' }, 1500);

								} else {

										alertbox('danger',userService.hint(response.data.code));

									}

								$scope.flag = true;

						});

				};
			}


	});
});
angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('user.pw',{
				url: '/pwedit',
				templateUrl: 'templates/user/password-edit.html',
				controller: function($scope,userinfo,userService){
					moreMenu();
					naviSecondery(2);

			        $scope.alerts = [];

			        function alertbox(type,msg){

			        	if($scope.alerts != []){

			        		$scope.alerts.splice(0,1);

			        	}

			        	$scope.alerts.push({type : type ,msg : msg});

			        };

			        $scope.closeAlert = function(index){

			            $scope.alerts.splice(index,1);

			        };

					$scope.pwedit = function(){

						if($scope.newpw == $scope.cfrmpw && $scope.oldpw != $scope.newpw){

							if(window.confirm("确认修改密码吗?")){

								$scope.flag = true;

								var editmsg = {};

								editmsg.old = $scope.oldpw;
								editmsg.new = $scope.newpw;
								editmsg.cfrm = $scope.cfrmpw;

								userinfo.password(editmsg)
									.then(function(response){

									userService.cookieset(response.data.token);
									
									if(userService.result(response.data.code)){
										
											alertbox('success','密码修改成功,请重新登录');

											setTimeout(function(){
												userService.logout();
												location.href = '#/login';
											},1500);

										} else {

											alertbox('danger',userService.hint(response.data.code));

										}

										$scope.flag = false;
										
									});

							}

						} else {

							if($scope.oldpw == $scope.newpw){
								
								alertbox('danger','新旧密码相同');


							}
							if($scope.newpw != $scope.cfrmpw){

								alertbox('danger','确认密码不一致');

							}

						}

					};

				}
			});


	});
angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			
			.state('user.edit',{
				url: '/infoedit',
				templateUrl: 'templates/user/info-edit.html',
				controller: function($scope,userinfo,userService){
					moreMenu();
					naviSecondery(1);

			        $scope.alerts = [];

			        function alertbox(type,msg){

			        	if($scope.alerts != []){

			        		$scope.alerts.splice(0,1);

			        	}

			        	$scope.alerts.push({type : type ,msg : msg});

			        };

			        $scope.closeAlert = function(index){

			            $scope.alerts.splice(index,1);

			        };

					userinfo.show()
						.then(function(response){

						    $scope.genderopt = gender;
  							$scope.schoolopt = school;	

							userService.cookieset(response.data.token);
							
							if(response.data.code == 200){

								$scope.content = response.data.data;
						 
								$scope.username = $scope.content.username;
								$scope.room = $scope.content.room;
								$scope.telLong = $scope.content.telLong;
								$scope.telShort = $scope.content.telShort;
								$scope.email = $scope.content.email;
								
  								$scope.gender = $scope.content.gender;
  								$scope.school = $scope.content.school;

							} else {

								if(response.data.code == 201){

									alertbox('',userService.hint(response.data.code));

	  								$scope.gender = '';
	  								$scope.school = '';

								}

							}
						});

					$scope.infoedit = function(){

						$scope.flag = true;

						var editmsg = {};

						editmsg.username = $scope.username;
						editmsg.gender = $scope.gender;
						editmsg.school = $scope.school;
						editmsg.room = $scope.room;
						editmsg.telLong = $scope.telLong;
						editmsg.telShort = $scope.telShort;
						editmsg.email = $scope.email;

						userinfo.edit(editmsg)
							.then(function(response){

							userService.cookieset(response.data.token);
							
							if(userService.result(response.data.code)){

									alertbox('success','个人资料修改成功');

									setTimeout(function(){ location.href = '#/user/info' }, 1500);

								} else {

									alertbox('danger',userService.hint(response.data.code));

								}

							$scope.flag = false;

							});
						
					};

					

				}
			});


	});
angular.module('app')
	.config(function($stateProvider){

		$stateProvider

			.state('user.info',{
				url: '/info',
				templateUrl: 'templates/user/info-detail.html',
				controller:  function($scope,userinfo,userService){

					moreMenu();
					naviSecondery(0);

					userinfo.show()
						.then(function(response){

							userService.cookieset(response.data.token);

							if(userService.result(response.data.code)){

								$scope.content = response.data.data;

							}
						});

				}
			});
			


	});
angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('list.all',{
				url: '/all/:dprt&:position&:keyword/:current',
				templateUrl: 'templates/list/list-all.html',
				controller: function($scope,$stateParams,listall,userService){
					moreMenu();
					naviSecondery(0);
					
			        $scope.alerts = [];

			        function alertbox(type,msg){

			        	if($scope.alerts != []){

			        		$scope.alerts.splice(0,1);

			        	}

			        	$scope.alerts.push({type : type ,msg : msg});

			        };

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
								$scope.editor = response.data.data.editor;

							};

						});

					document.getElementById('search').focus();

					$scope.isEdit = function(value){

						if(value){

							return true;

						} else {

							return false;

						}

					};


					$scope.filter = function(){

						location.href = '#list/all/' + $scope.dprt + '&' + $scope.position + '&' + $scope.keyword + '/1'

					};

					$scope.reset = function(){

						location.href = '#list/all/&&/1'

					};

					$scope.pagenext = function(){

						if((x + 1)<=$scope.total){
							location.href = '#list/all/' + $scope.dprt + '&' + $scope.position + '&' + $scope.keyword + '/' + ( x + 1 )
						}
						else{
							alertbox('danger','已经是最后一页');
						}
						
					};

					$scope.pageprev = function(){

						if((x - 1)>=1){
							location.href = '#list/all/' + $scope.dprt + '&' + $scope.position + '&' + $scope.keyword + '/' + ( x - 1 )
						}
						else{
							alertbox('danger','已经是第一页');
						}
						
					};
					
				}
			});
}); 
angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('list.detail',{
				url: '/detail/:id',
				templateUrl: 'templates/list/list-detail.html',
				controller: function($scope,$stateParams,listall,listdprt,userService){
					moreMenu();
					naviSecondery(0);
					
			        $scope.alerts = [];

			        function alertbox(type,msg){

			        	if($scope.alerts != []){

			        		$scope.alerts.splice(0,1);

			        	}

			        	$scope.alerts.push({type : type ,msg : msg});

			        };

			        $scope.closeAlert = function(index){

			            $scope.alerts.splice(index,1);

			        };

					$scope.positionopt = superposition;

					function showdetail(){
					
						listall.detail($stateParams)
							.then(function(response){
					
								userService.cookieset(response.data.token);
					
									if(userService.result(response.data.code)){
					
										$scope.content = response.data.data.content;
										$scope.editor = response.data.data.editor;
				
										$scope.position = $scope.content.position;
													
									} else {

										alertbox('danger',userService.hint(response.data.code));

									}
							});
					}

					showdetail();

					$scope.isEdit = function(value){

						if(value){

							return true;

						} else {

							return false;

						}

					};

					$scope.changeposition = function(){

						$scope.flag = true;
					
						var editmsg = {};

						editmsg.id = $stateParams.id;

						editmsg.position = $scope.position;

						listdprt.position(editmsg)
							.then(function(response){

							userService.cookieset(response.data.token);

							if(userService.result(response.data.code)){

								alertbox('success','修改职位成功');
								showdetail();
								setTimeout(function(){ history.back(); }, 1500);

							} else {

								alertbox('danger',userService.hint(response.data.code));
								
							}

							$scope.flag = false;

						});

					};
				}
			});

});
angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('list.dprt',{
				url: '/dprt',
				templateUrl: 'templates/list/list-department.html',
				controller: function($scope,listdprt,userService){

					optionMenu();
					moreMenu();
					naviSecondery(1);

			        $scope.alerts = [];

			        function alertbox(type,msg){

			        	if($scope.alerts != []){

			        		$scope.alerts.splice(0,1);

			        	}

			        	$scope.alerts.push({type : type ,msg : msg});

			        };

			        $scope.closeAlert = function(index){

			            $scope.alerts.splice(index,1);

			        };

					$scope.content = {};

					function showdprt(){

					listdprt.show()
						.then(function(response){

							userService.cookieset(response.data.token);

							if(userService.result(response.data.code)){

								$scope.members = response.data.data.members;
								$scope.editor = response.data.data.editor;
							};

						});
					};

					showdprt();

					$scope.isEdit = function(value){

						if(value){

							return true;

						} else {

							return false;

						}

					};
					
					$scope.checkbox = [];
					$scope.rcl = "退休";
					$scope.position = "主管";

					function checkboxselect(){

						var id = '';

						for(x = 0;x < $scope.checkbox.length;x++){
					
							if($scope.checkbox[x] != null && $scope.checkbox[x].column != undefined){
					
								id = id + $scope.checkbox[x].column + ',';

								$scope.checkbox[x] = null;

							};
					
						};
									
						id = id.substring(0,id.length-1);

						return id;

					};

					$scope.checkbox = [];

					$scope.checkall = function(o){

						var check = document.getElementById('check')

						var cb = document.getElementsByName("cb");

						console.log(check)

						if(check.checked){

							for(x = 0;x < cb.length;x++){

								if(!cb[x].checked){

									cb[x].click();

								}

							}

						} else {

							for(x = 0;x < cb.length;x++){

								if(cb[x].checked){

									cb[x].click();

								}

							}

						}

					};


					

					$scope.recycle = function(){
					
						var editmsg = {};

						editmsg.id = checkboxselect();

						if(editmsg.id != ''){

							$scope.flag = true;

							editmsg.note = $scope.rcl;

							listdprt.rcl(editmsg)
								.then(function(response){

								userService.cookieset(response.data.token);

								if(userService.result(response.data.code)){

									alertbox('success','置入回收站成功');
									showdprt();
									
								} else {

									alertbox('danger',userService.hint(response.data.code));

								}

								$scope.flag = false;

							});

							var check = document.getElementById('check')

								if(check.checked){

									check.click();

								}	

						} else {

							alertbox('danger','请选择操作对象');

						}

					};

					$scope.changeposition = function(){
					
						var editmsg = {};

						editmsg.id = checkboxselect();

						if(editmsg.id != ''){

							if(window.confirm("确认修改职位吗?")){

								$scope.flag = true;

								editmsg.position = $scope.position;

								listdprt.position(editmsg)
									.then(function(response){

									userService.cookieset(response.data.token);

									if(userService.result(response.data.code)){

										alertbox('success','修改职位成功');
										showdprt();
										
									} else {

										alertbox('danger',userService.hint(response.data.code));

									}

									$scope.flag = false;

								});
							} else {

								var cb = document.getElementsByName("cb");

									for(x = 0;x < cb.length;x++){

										if(cb[x].checked){

											cb[x].click();

										}

									}

							}

							var check = document.getElementById('check')

								if(check.checked){

									check.click();

								}	
								
						} else {

							alertbox('danger','请选择操作对象');

						}

					};

					$scope.reset = function(){
					
						var resetid = checkboxselect();

						if(resetid != ''){

							location.href = '#/list/reset/' + resetid;

						} else {

							alertbox('danger','请选择操作对象');

						}

					};

				}
			});

});
angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('list.add',{
				url: '/add',
				templateUrl: 'templates/list/list-add.html',
				controller: function($scope,listdprt,userService){
					moreMenu();
					naviSecondery(1);

			        $scope.alerts = [];

			        function alertbox(type,msg){

			        	if($scope.alerts != []){

			        		$scope.alerts.splice(0,1);

			        	}

			        	$scope.alerts.push({type : type ,msg : msg});

			        };

			        $scope.closeAlert = function(index){

			            $scope.alerts.splice(index,1);

			        };

					$scope.position = "干事";

					function showuncompleted(){

						listdprt.addshow()
							.then(function(response){

								userService.cookieset(response.data.token);

								if(userService.result(response.data.code)){

									$scope.uncompleteds = response.data.data.uncompleteds;

								} else {

								alertbox('danger',userService.hint(response.data.code));

								}
							});

					};

					showuncompleted();

					$scope.add = function(){

						$scope.flag = true;

						var editmsg = {};

						editmsg.studentno = $scope.studentno;
						editmsg.position = $scope.position;

						listdprt.add(editmsg)
							.then(function(response){

							userService.cookieset(response.data.token);

							if(userService.result(response.data.code)){

								alertbox('success','添加新成员成功，请在部门列表查看');

								setTimeout(function(){ location.href = '#/list/dprt'; }, 1500);
								
							} else {

								alertbox('danger',userService.hint(response.data.code));

								var fail = response.data.data.failed;

								function failedno(fail){

									var sn = '';

									for(x = 0;x < response.data.data.failed.length;x++){

										sn += response.data.data.failed[x] + '\r';

									}

									return sn;

								};

								$scope.studentno = failedno();

								showuncompleted();

							}

							$scope.flag = false;
						});

							$scope.flag = false;
					}

				}
			});

});
angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('list.reset',{
				url: '/reset/:id',
				templateUrl: 'templates/list/list-resetpw.html',
				controller: function($scope,$stateParams,listdprt,userService){
					moreMenu();
					naviSecondery(1);
					
			        $scope.alerts = [];

			        function alertbox(type,msg){

			        	if($scope.alerts != []){

			        		$scope.alerts.splice(0,1);

			        	}

			        	$scope.alerts.push({type : type ,msg : msg});

			        };

			        $scope.closeAlert = function(index){

			            $scope.alerts.splice(index,1);

			        };

					var idrequest = {};
					idrequest.id = $stateParams.id

					listdprt.resetshow(idrequest)
						.then(function(response){

							userService.cookieset(response.data.token);
							
							if(userService.result(response.data.code)){

								alertbox('','此操作将修改对象的密码，无法撤销');
								
							} else {

								if(response.data.code == 108){

									setTimeout(function(){ history.back(); }, 1500);

								}
							
								alertbox('danger',userService.hint(response.data.code));

							}

						});
					
					$scope.reset = function(){

						if($scope.newpw == $scope.cfrmpw){

							if(window.confirm("确认强制修改密码吗?")){

								$scope.flag = true;

								var editmsg = {};

								editmsg.id = idrequest.id;
								editmsg.pw = $scope.newpw;
								editmsg.pwcfrm = $scope.cfrmpw;

								listdprt.reset(editmsg)
									.then(function(response){

										userService.cookieset(response.data.token);
										
										if(userService.result(response.data.code)){

											alertbox('success','强制修改密码成功');

											setTimeout(function(){ location.href = '#/list/dprt'; },1500);
											
										} else {

											alertbox('danger',userService.hint(response.data.code));

										}

										$scope.flag = false;

									});}

						} else {

							alertbox('danger','确认密码不一致');

						}	

						}}
					
			});

});
angular.module('app')
	.config(function($stateProvider){

		$stateProvider
			.state('list.recycle',{
				url: '/recycle/:current',
				templateUrl: 'templates/list/list-recycle.html',
				controller: function($scope,$stateParams,listrcl,userService){
					moreMenu();
					naviSecondery(2);

			        $scope.alerts = [];

			        function alertbox(type,msg){

			        	if($scope.alerts != []){

			        		$scope.alerts.splice(0,1);

			        	}

			        	$scope.alerts.push({type : type ,msg : msg});

			        };

			        $scope.closeAlert = function(index){

			            $scope.alerts.splice(index,1);

			        };

					var p = parseInt($stateParams.current);

					$scope.current = $stateParams.current;

					var editmsg = {};

					editmsg.current = p;
					editmsg.count = 15;

					function rclshow(){
						listrcl.show(editmsg)
							.then(function(response){
								
								userService.cookieset(response.data.token);
								
								if(userService.result(response.data.code)){

									$scope.members = response.data.data.members;
									$scope.total = response.data.data.total;

								} else {

									alertbox('danger',userService.hint(response.data.code));
								}

							});
					};

					rclshow();

					var cb = document.getElementsByName("cb");

					$scope.checkall = function(o){

						var check = document.getElementById('check')

						var cb = document.getElementsByName("cb");

						if(check.checked){

							for(x = 0;x < cb.length;x++){

								if(!cb[x].checked){

									cb[x].click();

								}

							}

						} else {

							for(x = 0;x < cb.length;x++){

								if(cb[x].checked){

									cb[x].click();

								}

							}

						}

					};

					$scope.pagenext = function(){

						if((p + 1)<=$scope.total){
							location.href = '#list/recycle/' + ( p + 1 ) ;
						}
						else{
							alertbox('danger','已经是最后一页');
						}
						
					};

					$scope.pageprev = function(){

						if((p - 1)>=1){
							location.href = '#list/recycle/' + ( p - 1 ) ;
						}
						else{
							alertbox('danger','已经是第一页');
						}
						
					};

					$scope.checkbox = [];

					function checkboxselect(){

						var id = '';

						for(x = 0;x < $scope.checkbox.length;x++){
					
							if($scope.checkbox[x] != null && $scope.checkbox[x].column != undefined){
					
								id = id + $scope.checkbox[x].column + ',';

								$scope.checkbox[x] = null;

							};
					
						};
									
						id = id.substring(0,id.length-1);

						return id;

					}

					$scope.recover = function(){

						$scope.flag = true;

						var editmsg = {};

						editmsg.id = checkboxselect();

						if(editmsg.id != ''){

							editmsg.position = $scope.position;

							listrcl.recover(editmsg)
								.then(function(response){

								userService.cookieset(response.data.token);

								if(userService.result(response.data.code)){

									alertbox('success','恢复成功。对象被还原至部门列表');
									rclshow();
									
								} else {

									alertbox('danger',userService.hint(response.data.code));

								}

								$scope.flag = false;
							});

								var check = document.getElementById('check')

								if(check.checked){

									check.click();

								}	

						} else {

							alertbox('danger','请选择要操作的对象');

							$scope.flag = false;

						}

					};

					$scope.del = function(){

						

							var editmsg = {};

							editmsg.id = checkboxselect();

							if(editmsg.id != ''){

								if(window.confirm("此操作将无法撤销,确认彻底删除吗?")){

									$scope.flag = true;

									editmsg.position = $scope.position;

									listrcl.del(editmsg)
										.then(function(response){

										userService.cookieset(response.data.token);

										if(userService.result(response.data.code)){

											alertbox('success','彻底删除对象成功');
											rclshow();
										
										} else {

											alertbox('danger',userService.hint(response.data.code));

								 		}

									$scope.flag = false;

									});
								} else {

									var cb = document.getElementsByName("cb");

									for(x = 0;x < cb.length;x++){

										if(cb[x].checked){

											cb[x].click();

										}

									}

								} 

								var check = document.getElementById('check')

								if(check.checked){

									check.click();

								}

						}  else {

						alertbox('danger','请选择要操作的对象');

						}

							

					};

				}
			});

});
angular.module('app')
	
	.service('userService',function($http,$cookies) {

		return{

			login: function(editmsg){

				var user = {};

				user.studentno = editmsg.studentNo;
				user.password = md5(editmsg.password);

				return $http.post(host + 'Login',user);
				//return $http.post('http://localhost/angular/crewManageEvolve/test.php',user);

				},

			logout: function(user){

				var timestamp = new Date().getTime();
				var token = $cookies.get("token");
				var auth = token + '.' + timestamp + '.' + encrypt(token + ':' + timestamp);

				$http.post(host + 'User/logout',auth);

				$cookies.remove("token");
				
			},

			auth: function(){

				var timestamp = new Date().getTime();
				var token = $cookies.get("token");
				var auth = token + '.' + timestamp + '.' + encrypt(token + ':' + timestamp);
				
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
						// alert("存在未输入项");
						return false;
						break;

					case 102:
						// alert("账号错误");
						return false;
						break;

					case 103:
						// alert("密码错误");、
						return false;
						break;

					case 104:
						// alert("宿舍号有误");
						return false;
						break;	

					case 105:
						// alert("新旧密码相同");
						return false;
						break;

					case 106:
						// alert("确认密码不一致");
						return false;
						break;

					case 107:
						// alert("旧密码错误");
						return false;
						break;

					case 108:
						// alert("操作对象不能包含自己");
						return false;
						break;

					case 200:
						return true;
						break;

					case 201:
						//alert("请先完善个人资料");
						location.href = '#/user/infoedit';
						return false;
						break;

					case 202:
						// alert("部分添加成功,未成功条目已在学号框中呈现,请检查输入");
						return false;
						break;

					case 302:
						alert("账号异常，请重新登录");
						location.href = '#/login';
						return false;
						break;

					case 403:
						// alert("你不具有操作权限");
						return false;
						break;

					case 404:
						// alert("你不具有查看权限");
					//	history.back();
						return false;
						break;

					case 500:
						// alert("未知错误");
						return false;
						break;
				};

				

			},

			hint: function(editmsg){

				switch(editmsg){
					case 101:
						// alert("存在未输入项");
						return '存在未输入项';
						break;

					case 102:
						return '账号或密码错误';
						break;

					case 103:
						//location.href = '#/login';
						return '账号或密码错误';
						break;

					case 104:
						// alert("宿舍号有误");
						return '宿舍号有误';
						break;	

					case 105:
						// alert("新旧密码相同");
						return '新旧密码相同';
						break;

					case 106:
						// alert("确认密码不一致");
						return '确认密码不一致';
						break;

					case 107:
						// alert("旧密码错误");
						return '旧密码错误';
						break;

					case 108:
						// alert("操作对象不能包含自己");
						return '操作对象不能包含自己';
						break;

					case 201:
						// alert("用户资料未完善");
						return '请先完善个人资料';
						break;

					case 202:
						// alert("部分添加成功,未成功条目已在学号框中呈现,请检查输入");
						return '部分添加成功，未成功条目已在输入框中列出，请检查';
						break;

					case 302:
						//alert("账号异常，请重新登录");
						return '';
						break;

					case 403:
						// alert("你不具有操作权限");
						return '你不具有该操作权限';
						break;

					case 404:
						// alert("你不具有查看权限");
					//	history.back();
						return '你不具有该查看权限';
						break;

					case 500:
						// alert("未知错误");
						return '未知错误';
						break;
				};

				

			}

			};
		});
angular.module('app')
	
	.service('dprtall',function($http,userService) {

		return{

			show: function(){

				var postdata = {};

				postdata.auth = userService.auth();

				return $http.post(host + 'Department/listAll',postdata);

				},

			editshow: function(editmsg){

				var postdata = {};

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post(host + 'Department/detail',postdata);

				},

			edit: function(editmsg){

				var postdata = {};

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post(host + 'Department/edit',postdata);

				}//,

			// add: function(editmsg){

			// 	var postdata = {};

			// 	postdata.auth = userService.auth();
			// 	postdata.data = editmsg;

			// 	return $http.post(host + 'Department/add',postdata)

			// 	},

			// del: function(editmsg){

			// 	var postdata = {};

			// 	postdata.auth = userService.auth();
			// 	postdata.data = editmsg;

			// 	return $http.post(host + 'Department/del',postdata);

			// 	}

			};
		}
	);
angular.module('app')
	
	.service('listall',function($http,userService) {

		return{

			show: function(editmsg){

				var postdata = {};

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post(host + 'User/listall',postdata);

				},

			detail: function(editmsg){

				var postdata = {};

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post(host + 'User/othersinfo',postdata);

				}

			

			};
		});
angular.module('app')
	
	.service('listdprt',function($http,userService) {

		return{

			show: function(){

				var postdata = {};

				postdata.auth = userService.auth();

				return $http.post(host + 'User/dprtall',postdata);

				},

			addshow: function(){

				var postdata = {};

				postdata.auth = userService.auth();

				return $http.post(host + 'User/getUnCompleted',postdata);

			},

			resetshow: function(editmsg){

				var postdata = {};

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post(host + 'User/pwApply',postdata);

				},

			add: function(editmsg){

				var postdata = {};
				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post(host + 'User/batchAdd',postdata);

				},

			rcl: function(editmsg){

				var postdata = {};
				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post(host + 'User/rcl',postdata);

				},

			position: function(editmsg){

				var postdata = {};
				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post(host + 'User/groupChange',postdata);

				},

			reset: function(editmsg){

				var postdata = {};
				postdata.data = {};

				postdata.auth = userService.auth();
				postdata.data.id = editmsg.id;
				postdata.data.pw = md5(editmsg.pw);
				postdata.data.pwcfrm = md5(editmsg.pwcfrm);

				return $http.post(host + 'User/pwReset',postdata);

				}

			};
		});
angular.module('app')
	
	.service('listrcl',function($http,userService) {

		return{

			show: function(editmsg){

				var postdata = {};

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post(host + 'User/listRcl',postdata);

				},

			del: function(editmsg){

				var postdata = {};
				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post(host + 'User/del',postdata);		
			},

			recover: function(editmsg){

				var postdata = {};
				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post(host + 'User/recover',postdata);
			}

			};
		}
	);
angular.module('app')
	
	.service('userinfo',function($http,userService) {

		return{

			show: function(){

				var postdata = {};

				postdata.auth = userService.auth();
				
				return $http.post(host + 'User/info',postdata);


				},

			edit: function(editmsg){

				var postdata = {};

				postdata.auth = userService.auth();
				postdata.data = editmsg;

				return $http.post(host + 'User/infoEdit',postdata);
		
			},

			password: function(editmsg){

				var postdata = {};
				postdata.data = {};

				postdata.auth = userService.auth();
				postdata.data.old = md5(editmsg.old);
				postdata.data.new = md5(editmsg.new);
				postdata.data.cfrm = md5(editmsg.cfrm);

				return $http.post(host + 'User/pwEdit',postdata);

			}

			};
		}
	);
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
		 
	});
//# sourceMappingURL=bundle.js.map
