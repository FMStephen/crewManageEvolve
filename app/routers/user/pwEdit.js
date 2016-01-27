angular.module('app')
  .config($stateProvider => {
    $stateProvider

      .state('user.pw', {
        url: '/pwedit',
        templateUrl: 'templates/user/password-edit.html',
        controller($scope, userinfo, userService) {

          moreMenu()
          naviSecondery(2)

          $scope.alerts = []

          function alertbox (type, msg) {
            if ($scope.alerts != []) {
              $scope.alerts.shift()
            }
            $scope.alerts.push({type: type, msg: msg})
          }

          $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1)
          }

          $scope.pwedit = function () {

            if ($scope.newpw != $scope.cfrmpw || $scope.oldpw == $scope.newpw) {
              if ($scope.oldpw == $scope.newpw) {
                alertbox('danger', '新旧密码相同')
              } else if ($scope.newpw != $scope.cfrmpw) {
                alertbox('danger', '确认密码不一致')
              }
              return
            }

            if (!window.confirm('确认修改密码吗?')) {
              return
            }

            $scope.flag = true

            userinfo.password({
              old: $scope.oldpw,
              cfrm: $scope.cfrmpw,
              'new': $scope.newpw,
            })

              .then(response => {
                alertbox('success', '密码修改成功,请重新登录')

                setTimeout(() => {
                  userService.logout()
                  $state.go('login')
                }, 1500)
              })

              .catch(({ message }) => {
                alertbox('danger', userService.hint(response.data.code))
              })

              .then(() => {
                $scope.flag = false
              })
          }
        }
      })
  })
