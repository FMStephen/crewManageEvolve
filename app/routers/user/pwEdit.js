angular.module('app')
  .config(function ($stateProvider) {
    $stateProvider
      .state('user.pw', {
        url: '/pwedit',
        templateUrl: 'templates/user/password-edit.html',
        controller: function ($scope, userinfo, userService) {
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

          $scope.pwedit = function () {
            if ($scope.newpw == $scope.cfrmpw && $scope.oldpw != $scope.newpw) {
              if (window.confirm('确认修改密码吗?')) {
                $scope.flag = true

                var editmsg = {}

                editmsg.old = $scope.oldpw
                editmsg.new = $scope.newpw
                editmsg.cfrm = $scope.cfrmpw

                userinfo.password(editmsg)
                  .then(function (response) {
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

                  })

              }

            } else {
              if ($scope.oldpw == $scope.newpw) {
                alertbox('danger', '新旧密码相同')

              }
              if ($scope.newpw != $scope.cfrmpw) {
                alertbox('danger', '确认密码不一致')

              }

            }

          }

        }
      })

  })
