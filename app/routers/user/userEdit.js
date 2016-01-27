angular.module('app')
  .config($stateProvider => {
    $stateProvider

      .state('user.edit', {
        url: '/infoedit',
        templateUrl: 'templates/user/info-edit.html',
        controller($scope, userinfo, userService) {
          if (userService.logincheck() == null) {
            location.href = '#/login'
          }

          moreMenu()
          naviSecondery(1)

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

          userinfo.show()
            .then(function (response) {
              $scope.genderopt = gender
              $scope.schoolopt = school

              userService.cookieset(response.data.token)

              if (response.data.code == 200) {
                $scope.content = response.data.data

                $scope.username = $scope.content.username
                $scope.room = $scope.content.room
                $scope.telLong = $scope.content.telLong
                $scope.telShort = $scope.content.telShort
                $scope.email = $scope.content.email

                $scope.gender = $scope.content.gender
                $scope.school = $scope.content.school

              } else if (response.data.code == 201) {
                alertbox('', userService.hint(response.data.code))
                $scope.gender = ''
                $scope.school = ''
              }
            })

          $scope.infoedit = async function () {
            $scope.flag = true

            var editmsg = {
              username: $scope.username,
              gender: $scope.gender,
              school: $scope.school,
              room: $scope.room,
              telLong: $scope.telLong,
              telShort: $scope.telShort,
              email: $scope.email,
            }

            const response = await userinfo.edit(editmsg)

            userService.cookieset(response.data.token)

            if (userService.result(response.data.code)) {
              alertbox('success', '个人资料修改成功')
              setTimeout(function () { location.href = '#/user/info' }, 1500)
            } else {
              alertbox('danger', userService.hint(response.data.code))
            }
            $scope.flag = false
          }
        }
      })
  })
