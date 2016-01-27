angular.module('app')
  .config($stateProvider => {
    $stateProvider
      .state('user.pw', {
        url: '/pwedit',
        templateUrl: 'templates/user/password-edit.html',
        controller($scope, userinfo, userService) {
          if (userService.logincheck() == null) {
            location.href = '#/login'
          }

          moreMenu()
          naviSecondery(2)

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

          $scope.pwedit = async function () {
            if ($scope.newpw != $scope.cfrmpw || $scope.oldpw == $scope.newpw) {
              if ($scope.oldpw == $scope.newpw) {
                alertbox('danger', '新旧密码相同')
              }
              if ($scope.newpw != $scope.cfrmpw) {
                alertbox('danger', '确认密码不一致')
              }
              return
            }

            if (!window.confirm('确认修改密码吗?')) {
              return
            }
            $scope.flag = true

            var editmsg = {
              old: $scope.oldpw,
              cfrm: $scope.cfrmpw,
              'new': $scope.newpw,
            }


            const response = await userinfo.password(editmsg)

            userService.cookieset(response.data.token)

            if (userService.result(response.data.code)) {
              alertbox('success', '密码修改成功,请重新登录')

              setTimeout(function () {
                userService.logout()
                location.href = '#/login'
              }, 1500)
            } else {
              alertbox('danger', userService.hint(response.data.code))
            }
            $scope.flag = false
          }
        }
      })
  })
