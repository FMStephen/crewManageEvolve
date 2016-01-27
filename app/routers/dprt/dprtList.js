angular.module('app')
  .config($stateProvider => {
    $stateProvider

      .state('dprt.all', {
        url: '/all',
        templateUrl: 'templates/department/department-all.html',
        controller($scope, userService, dprtall) {
          if (userService.logincheck() == null) {
            location.href = '#/login'
          }

          moreMenu()
          $scope.alerts = []

          function alertbox (type, msg) {
            if ($scope.alerts != []) {
              $scope.alerts.splice(0, 1)
            }
            $scope.alerts.push({type: type, msg: msg})
          }

          $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1)
          }

          async function show () {
            const response = await dprtall.show()
            userService.cookieset(response.data.token)

            if (userService.result(response.data.code)) {
              $scope.dprts = response.data.data.dprt
              $scope.editor = response.data.data.editor
            } else {
              alertbox('danger', userService.hint(response.data.code))
            }
          }

          show()

          $scope.radio = {}

          $scope.edit = function () {
            if ($scope.radio.dprt != null) {
              location.href = `#/dprt/edit/${$scope.radio.dprt}`
            } else {
              alertbox('danger', '请选择操作对象')
            }
          }

          $scope.isEdit = function (value) {
            if (value) {
              return true
            } else {
              return false
            }
          }

          // $scope.del = function(){
          // 
          // 	var editmsg = {}
          //
          // 	editmsg.id = $scope.radio.dprt
          //
          // 	if(editmsg.id != undefined){
          //
          // 		dprtall.del(editmsg)
          // 			.then(function(response){
          //
          // 			userService.cookieset(response.data.token)
          //
          // 			if(userService.result(response.data.code)){
          // 				alert("success")
          // 				show()
          // 			}
          // 		})
          // 	} else {
          // 		alert("请选择对象")
          // 	}
          // }
        }
      })
  })
