angular.module('app')
  .config($stateProvider => {
    $stateProvider

      .state('user.edit', {
        url: '/infoedit',
        templateUrl: 'templates/user/info-edit.html',
        controller($scope, $state, userService) {

          moreMenu()
          naviSecondery(1)

          $scope.genderopt = gender
          $scope.schoolopt = school  

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

          userService.show()

            .then(function ({ data }) {
              $scope.content = data

              $scope.username = data.username
              $scope.room = data.room
              $scope.telLong = data.telLong
              $scope.telShort = data.telShort
              $scope.email = data.email

              $scope.gender = data.gender
              $scope.school = data.school
            })

            .catch(({ message, code }) => {
              let type = 'danger'
              if (code === 201) {
                type = ''
                $scope.gender = $scope.school = ''
              }
              alertbox(type, message)
            })

          $scope.infoedit = function () {
            $scope.flag = true

            userService.edit({
              username: $scope.username,
              gender: $scope.gender,
              school: $scope.school,
              room: $scope.room,
              telLong: $scope.telLong,
              telShort: $scope.telShort,
              email: $scope.email,
            })

              .then(() => {
                alertbox('success', '个人资料修改成功')
                setTimeout(() => { $state.go('user.info') }, 1500)
              })

              .catch(({ message }) => {
                alertbox('danger', message)
              })

              .then(() => {
                $scope.flag = false
              })
          }
        }
      })
  })
